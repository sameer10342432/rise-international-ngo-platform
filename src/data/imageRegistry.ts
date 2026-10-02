import registryData from './imageRegistry.json';

export interface ImageRegistryEntry {
  id: string;
  photoId?: string;
  filename: string;
  url: string;
  width: number;
  height: number;
  page: string;
  section: string;
  altText: string;
  caption?: string;
  license: string;
  sizeBytes?: number;
  fileHash?: string;
  isUsed?: boolean;
}

export const imageRegistry: Record<string, ImageRegistryEntry> = (
  registryData as ImageRegistryEntry[]
).reduce((acc, entry) => {
  acc[entry.id] = entry;
  return acc;
}, {} as Record<string, ImageRegistryEntry>);

export const allImages: ImageRegistryEntry[] = registryData as ImageRegistryEntry[];

/**
 * Lookup image by unique identifier.
 */
export function getImageById(id: string): ImageRegistryEntry | undefined {
  return imageRegistry[id];
}

/**
 * Returns safe image object with fallback.
 */
export function getImage(
  id: string,
  fallback = '/images/rise-home-hero-community.webp'
): { url: string; altText: string; width: number; height: number; caption?: string } {
  const item = imageRegistry[id];
  if (!item) {
    return {
      url: fallback,
      altText: 'RISE International community programme photograph',
      width: 1344,
      height: 768,
    };
  }
  return {
    url: item.url,
    altText: item.altText,
    width: item.width,
    height: item.height,
    caption: item.caption,
  };
}

/**
 * Automated Duplicate Detection
 * Verifies that every assigned image URL is unique across all major sections.
 */
export function findDuplicateImages(): { url: string; count: number; sections: string[] }[] {
  const urlMap = new Map<string, string[]>();

  for (const entry of allImages) {
    const existing = urlMap.get(entry.url) || [];
    existing.push(`${entry.page} > ${entry.section} (${entry.id})`);
    urlMap.set(entry.url, existing);
  }

  const duplicates: { url: string; count: number; sections: string[] }[] = [];
  for (const [url, sections] of urlMap.entries()) {
    if (sections.length > 1) {
      duplicates.push({ url, count: sections.length, sections });
    }
  }

  return duplicates;
}

/**
 * Checks if a given image URL is already in use by another section.
 * Useful for Admin CMS validation to show "Duplicate Image Warning".
 */
export function checkImageInUse(url: string, currentId?: string): { inUse: boolean; usedBy?: string } {
  const match = allImages.find((img) => img.url === url && img.id !== currentId);
  if (match) {
    return {
      inUse: true,
      usedBy: `${match.page} - ${match.section}`,
    };
  }
  return { inUse: false };
}
