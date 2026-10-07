import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { MediaAsset } from '../models/MediaAsset.js';
import { Programme } from '../models/Programme.js';
import { Story } from '../models/Story.js';
import { NewsArticle } from '../models/NewsArticle.js';
import { TeamMember } from '../models/TeamMember.js';
import { Partner } from '../models/Partner.js';
import { Page } from '../models/Page.js';
import { WebsiteSetting } from '../models/WebsiteSetting.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { processAndSaveImage } from '../middleware/upload.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { logAdminAction } from '../services/auditService.js';
import { ENV } from '../config/env.js';

export const mediaController = {
  // Sync WordPress manifest with DB
  async syncManifest(_req: Request, res: Response) {
    try {
      const manifestPath = path.resolve(process.cwd(), '../src/data/wordpressMediaManifest.json');
      if (!fs.existsSync(manifestPath)) {
        return sendError(res, 'Manifest file not found.', [], 404);
      }

      const manifestData = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));
      let inserted = 0;
      let updated = 0;

      for (const item of manifestData) {
        const ext = (item.extension || '').toLowerCase();
        let mime = 'application/octet-stream';
        if (['.jpg', '.jpeg'].includes(ext)) mime = 'image/jpeg';
        else if (ext === '.png') mime = 'image/png';
        else if (ext === '.webp') mime = 'image/webp';
        else if (ext === '.svg') mime = 'image/svg+xml';
        else if (ext === '.pdf') mime = 'application/pdf';
        else if (ext === '.zip') mime = 'application/zip';

        const cleanTitle = item.filename
          .replace(/[-_]/g, ' ')
          .replace(/\.[^/.]+$/, '')
          .replace(/\b\w/g, (c: string) => c.toUpperCase());

        const existing = await MediaAsset.findOne({ filename: item.filename });
        if (!existing) {
          await MediaAsset.create({
            filename: item.filename,
            originalName: item.filename,
            url: item.publicUrl,
            mimeType: mime,
            fileSize: item.sizeBytes || 0,
            width: item.width || undefined,
            height: item.height || undefined,
            altText: cleanTitle,
            caption: '',
            title: cleanTitle,
            source: 'wordpress',
            category: ext === '.pdf' ? 'document' : 'gallery',
          });
          inserted++;
        } else {
          updated++;
        }
      }

      const total = await MediaAsset.countDocuments();
      return sendSuccess(res, 'WordPress manifest synchronized successfully.', {
        total,
        inserted,
        updated,
      });
    } catch (err: any) {
      return sendError(res, err.message || 'Manifest sync failed.', [], 500);
    }
  },

  // Get list of media assets with search & filtering
  async getMedia(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 30;
      const search = (req.query.search as string) || '';
      const source = (req.query.source as string) || '';
      const type = (req.query.type as string) || '';

      const query: any = {};

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { originalName: { $regex: search, $options: 'i' } },
          { filename: { $regex: search, $options: 'i' } },
          { altText: { $regex: search, $options: 'i' } },
        ];
      }

      if (source && source !== 'all') {
        query.source = source;
      }

      if (type && type !== 'all') {
        if (type === 'image') {
          query.mimeType = { $regex: '^image/', $options: 'i' };
        } else if (type === 'document') {
          query.mimeType = { $in: ['application/pdf', 'application/zip', 'application/msword'] };
        } else {
          query.mimeType = type;
        }
      }

      const total = await MediaAsset.countDocuments(query);
      const items = await MediaAsset.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      return sendSuccess(res, 'Media retrieved successfully.', {
        items,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to fetch media.', [], 500);
    }
  },

  // Calculate references to a media URL across all collections
  async getMediaUsage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const asset = await MediaAsset.findById(id);
      if (!asset) {
        return sendError(res, 'Media asset not found.', [], 404);
      }

      const searchPattern = new RegExp(asset.filename, 'i');
      const urlPattern = new RegExp(asset.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

      const [programmes, stories, news, team, partners, pages] = await Promise.all([
        Programme.find({
          $or: [{ image: urlPattern }, { image: searchPattern }],
        }).select('title slug image'),
        Story.find({
          $or: [{ featuredImage: urlPattern }, { featuredImage: searchPattern }],
        }).select('title slug featuredImage'),
        NewsArticle.find({
          $or: [{ featuredImage: urlPattern }, { featuredImage: searchPattern }],
        }).select('title slug featuredImage'),
        TeamMember.find({
          $or: [{ photo: urlPattern }, { photo: searchPattern }],
        }).select('name position photo'),
        Partner.find({
          $or: [{ logo: urlPattern }, { logo: searchPattern }],
        }).select('name logo'),
        Page.find({
          $or: [{ featuredImage: urlPattern }, { content: searchPattern }],
        }).select('title slug'),
      ]);

      const usages = [
        ...programmes.map((p) => ({ type: 'Programme', title: p.title, url: `/programmes/${p.slug}` })),
        ...stories.map((s) => ({ type: 'Story', title: s.title, url: `/stories/${s.slug}` })),
        ...news.map((n) => ({ type: 'News Article', title: n.title, url: `/news/${n.slug}` })),
        ...team.map((t) => ({ type: 'Team Member', title: t.name, url: '/team' })),
        ...partners.map((p) => ({ type: 'Partner', title: p.name, url: '/partners' })),
        ...pages.map((p) => ({ type: 'Page', title: p.title, url: `/${p.slug}` })),
      ];

      return sendSuccess(res, 'Media usage checked.', {
        asset,
        usageCount: usages.length,
        usages,
      });
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to check media usage.', [], 500);
    }
  },

  // Update media metadata
  async updateMedia(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { title, altText, caption, category } = req.body;

      const asset = await MediaAsset.findById(id);
      if (!asset) {
        return sendError(res, 'Media asset not found.', [], 404);
      }

      if (title !== undefined) asset.title = title;
      if (altText !== undefined) asset.altText = altText;
      if (caption !== undefined) asset.caption = caption;
      if (category !== undefined) asset.category = category;

      await asset.save();

      if (req.admin) {
        await logAdminAction(
          req.admin,
          'UPDATE_MEDIA',
          'MediaAsset',
          asset.filename,
          { title, altText, caption },
          req.ip
        );
      }

      return sendSuccess(res, 'Media metadata updated.', asset);
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to update media.', [], 500);
    }
  },

  // Upload new image
  async uploadMedia(req: AuthenticatedRequest, res: Response) {
    if (!req.file) {
      return sendError(res, 'No image file uploaded.', [], 400);
    }

    try {
      const maxWidth = req.body.maxWidth ? parseInt(req.body.maxWidth) : 1920;
      const result = await processAndSaveImage(req.file.buffer, req.file.originalname, maxWidth);

      const cleanTitle = (req.body.title || req.file.originalname)
        .replace(/[-_]/g, ' ')
        .replace(/\.[^/.]+$/, '');

      const asset = await MediaAsset.create({
        filename: result.filename,
        originalName: req.file.originalname,
        url: result.url,
        mimeType: 'image/webp',
        fileSize: result.size,
        width: result.width,
        height: result.height,
        altText: req.body.altText || cleanTitle,
        caption: req.body.caption || '',
        title: cleanTitle,
        source: 'upload',
        category: req.body.category || 'upload',
      });

      if (req.admin) {
        await logAdminAction(
          req.admin,
          'UPLOAD_MEDIA',
          'MediaAsset',
          result.filename,
          { originalName: req.file.originalname, size: result.size },
          req.ip
        );
      }

      return sendSuccess(res, 'Media uploaded and processed successfully.', asset, 201);
    } catch (err: any) {
      return sendError(res, err.message || 'Media upload failed.', [], 500);
    }
  },

  // Delete media asset
  async deleteMedia(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { force } = req.query;

      const asset = await MediaAsset.findById(id);
      if (!asset) {
        return sendError(res, 'Media asset not found.', [], 404);
      }

      // If it is an original WordPress asset, protect it!
      if (asset.source === 'wordpress') {
        return sendError(
          res,
          'Protected Asset: Original WordPress media from /public_html cannot be deleted to maintain data integrity.',
          [],
          403
        );
      }

      // Check usage before deleting uploaded asset
      const searchPattern = new RegExp(asset.filename, 'i');
      const [pCount, sCount, nCount] = await Promise.all([
        Programme.countDocuments({ image: searchPattern }),
        Story.countDocuments({ featuredImage: searchPattern }),
        NewsArticle.countDocuments({ featuredImage: searchPattern }),
      ]);

      const totalUsage = pCount + sCount + nCount;
      if (totalUsage > 0 && force !== 'true') {
        return sendError(
          res,
          `Cannot delete: This media asset is actively in use across ${totalUsage} section(s). Remove references first or pass force=true.`,
          [],
          400
        );
      }

      // Remove file from uploads directory if it exists
      if (asset.url.startsWith('/uploads/')) {
        const filePath = path.join(ENV.UPLOAD_DIR, asset.filename);
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath).catch(() => {});
        }
      }

      await MediaAsset.findByIdAndDelete(id);

      if (req.admin) {
        await logAdminAction(
          req.admin,
          'DELETE_MEDIA',
          'MediaAsset',
          asset.filename,
          { filename: asset.filename },
          req.ip
        );
      }

      return sendSuccess(res, 'Media asset deleted successfully.', { id });
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to delete media asset.', [], 500);
    }
  },
};
