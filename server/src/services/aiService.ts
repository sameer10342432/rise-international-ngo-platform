import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env.js';
import fs from 'fs';
import path from 'path';

// Initialize GoogleGenAI SDK strictly on server-side using server environment variable
const ai = new GoogleGenAI({
  apiKey: ENV.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '',
});

// Guardrails and tone instructions for RISE International
const NGO_SYSTEM_INSTRUCTION = `
You are the AI Assistant for RISE International, an international nonprofit organization dedicated to empowering communities and transforming lives through education, community development, humanitarian aid, and economic empowerment.

CRITICAL NON-NEGOTIABLE CONTENT RULES:
1. NEVER invent factual organizational information.
2. Do NOT fabricate numbers of countries, numbers of beneficiaries, numbers of projects, team members, partner organisations, offices, physical addresses, registration numbers, awards, certifications, government or donor relationships, testimonials, financial figures, or charity claims.
3. If a fact has not been provided or verified, use neutral, empathetic, human wording (e.g. "RISE International works to create meaningful opportunities for individuals and communities").
4. Tone: Professional, human, empathetic, trustworthy, action-oriented, clear, respectful, dignified.
5. All generated content and metadata are DRAFTS requiring human admin review before publication.
6. Use international English (e.g. "programme" unless specifically overridden).
`;

export interface GeneratePageContentParams {
  pageType: string;
  pageTitle: string;
  context?: string;
  currentContent?: string;
}

export interface GenerateSeoParams {
  pageTitle: string;
  pageContent?: string;
  targetTopic?: string;
  pageType?: string;
}

export interface GenerateArticleParams {
  topic: string;
  category: string;
  targetAudience?: string;
  keyPoints?: string[];
}

export interface GenerateProgrammeParams {
  programmeName: string;
  focusArea: string;
  communityContext?: string;
}

export interface GenerateFaqParams {
  topic: string;
  pageType?: string;
  count?: number;
}

export interface GenerateImageParams {
  pageTitle: string;
  topic: string;
  aspectRatio?: '16:9' | '1:1' | '4:3';
}

export const aiService = {
  /**
   * 1. Generate Page Content with strict anti-fabrication rules
   */
  async generatePageContent(params: GeneratePageContentParams) {
    const prompt = `
${NGO_SYSTEM_INSTRUCTION}

TASK: Generate polished, human-written draft content for the following page:
- Page Title: ${params.pageTitle}
- Page Type: ${params.pageType}
- Specific Page Context: ${params.context || 'General overview'}
- Existing Content (if any): ${params.currentContent || 'None'}

Please return a JSON object with this exact structure:
{
  "status": "draft",
  "reviewRequired": true,
  "heroEyebrow": "string",
  "heroH1": "string",
  "heroSubtitle": "string",
  "overview": "string (2-3 paragraphs of human, empathetic copy)",
  "sections": [
    {
      "heading": "string",
      "body": "string",
      "bulletPoints": ["string", "string"],
      "ctaText": "string",
      "ctaLink": "string"
    }
  ],
  "faqSuggestions": [
    {
      "question": "string",
      "answer": "string (truthful, non-fabricated answer)"
    }
  ]
}
`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        parsed.status = 'draft';
        parsed.reviewRequired = true;
        return parsed;
      }
      return {
        status: 'draft',
        reviewRequired: true,
        rawContent: text,
      };
    } catch (err: any) {
      console.warn('[AI Service] Gemini fallback triggered for page content:', err.message);
      // Deterministic, high-quality fallback adhering strictly to guidelines
      return {
        status: 'draft',
        reviewRequired: true,
        heroEyebrow: 'RISE INTERNATIONAL',
        heroH1: params.pageTitle,
        heroSubtitle: 'Empowering Communities. Transforming Lives.',
        overview: `${params.pageTitle} is centered around sustainable, locally driven solutions that build autonomy and dignity. We partner closely with community leaders to ensure long-term impact.`,
        sections: [
          {
            heading: 'Our People-Centred Approach',
            body: 'We listen to local priorities and provide the resources and technical support needed for enduring community ownership.',
            bulletPoints: [
              'Grassroots co-development with local leaders',
              'Sustainable practices tailored to regional environments',
              'Continuous learning and transparent accountability',
            ],
            ctaText: 'Get Involved',
            ctaLink: '/get-involved',
          },
        ],
        faqSuggestions: [
          {
            question: `How does RISE International support ${params.pageTitle}?`,
            answer: 'We collaborate with community partners to identify needs, co-design programs, and provide ongoing guidance and resources.',
          },
        ],
      };
    }
  },

  /**
   * 2. Generate SEO Metadata
   */
  async generateSeoMetadata(params: GenerateSeoParams) {
    const prompt = `
${NGO_SYSTEM_INSTRUCTION}

TASK: Generate comprehensive SEO metadata for:
- Page Title: ${params.pageTitle}
- Target Topic: ${params.targetTopic || params.pageTitle}
- Page Type: ${params.pageType || 'general'}
- Page Content Excerpt: ${params.pageContent?.slice(0, 500) || 'None provided'}

Return a JSON object with this exact structure:
{
  "status": "draft",
  "reviewRequired": true,
  "primaryTopic": "string",
  "secondaryTopics": ["string", "string", "string"],
  "seoTitle": "string (Concise, descriptive, format: Topic | RISE International)",
  "metaDescription": "string (140-160 characters, natural, persuasive without manipulation)",
  "suggestedH1": "string (Only one primary H1)",
  "suggestedH2s": ["string", "string", "string"],
  "suggestedInternalLinks": [
    { "anchor": "string", "url": "string" }
  ],
  "imageAltText": "string (Descriptive visual alt text)",
  "faqSuggestions": [
    { "question": "string", "answer": "string" }
  ]
}
`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        parsed.status = 'draft';
        parsed.reviewRequired = true;
        return parsed;
      }
    } catch (err: any) {
      console.warn('[AI Service] Gemini fallback triggered for SEO metadata:', err.message);
    }

    // Default SEO metadata fallback adhering to rules
    const primaryTopic = params.targetTopic || params.pageTitle;
    return {
      status: 'draft',
      reviewRequired: true,
      primaryTopic,
      secondaryTopics: ['nonprofit organization', 'sustainable development', 'community empowerment', 'humanitarian aid'],
      seoTitle: `${params.pageTitle} | RISE International`,
      metaDescription: `Discover how RISE International supports ${primaryTopic.toLowerCase()} through community-driven initiatives, transparent action, and sustainable partnerships.`,
      suggestedH1: params.pageTitle,
      suggestedH2s: [
        'Our Community-Led Approach',
        'How We Measure Meaningful Change',
        'Ways to Support Our Work',
      ],
      suggestedInternalLinks: [
        { anchor: 'Explore Our Programmes', url: '/our-work' },
        { anchor: 'See Community Impact', url: '/impact' },
        { anchor: 'Become a Volunteer', url: '/volunteer' },
      ],
      imageAltText: `Community members collaborating with RISE International on ${primaryTopic.toLowerCase()}`,
      faqSuggestions: [
        {
          question: `What makes RISE International's approach to ${primaryTopic.toLowerCase()} unique?`,
          answer: 'We operate through direct community leadership, ensuring that every project is locally owned and sustainably maintained.',
        },
      ],
    };
  },

  /**
   * 3. Generate Article (marked DRAFT / DEMO)
   */
  async generateArticle(params: GenerateArticleParams) {
    const prompt = `
${NGO_SYSTEM_INSTRUCTION}

TASK: Generate a draft news article for the RISE International website.
- Topic: ${params.topic}
- Category: ${params.category}
- Audience: ${params.targetAudience || 'Supporters and general public'}

NOTE: Clearly label the article as DRAFT/DEMO and avoid fabricating specific events, people or claims.

Return JSON:
{
  "status": "draft",
  "reviewRequired": true,
  "isDraftDemo": true,
  "title": "string",
  "slug": "string",
  "category": "${params.category}",
  "publishedDate": "${new Date().toISOString()}",
  "readTime": "4 min read",
  "introduction": "string",
  "content": "string (Markdown formatted article)",
  "seoTitle": "string",
  "seoDescription": "string",
  "suggestedImagePrompt": "string"
}
`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        parsed.status = 'draft';
        parsed.reviewRequired = true;
        parsed.isDraftDemo = true;
        return parsed;
      }
    } catch (err: any) {
      console.warn('[AI Service] Gemini fallback triggered for article:', err.message);
    }

    return {
      status: 'draft',
      reviewRequired: true,
      isDraftDemo: true,
      title: `[Draft] Advancing ${params.topic} Through Community Partnership`,
      slug: params.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: params.category,
      publishedDate: new Date().toISOString(),
      readTime: '3 min read',
      introduction: `This draft update highlights our ongoing commitment to ${params.topic} through accountable, locally driven programs.`,
      content: `## Strengthening Community Capacity\n\nSustainable transformation begins when local leaders are equipped with the tools and resources they need. Through our collaborative approach, RISE International continues to explore innovative methods to support long-term resilience.\n\n### Prioritising Dignity & Respect\n\nEvery project is initiated upon invitation from local communities, ensuring complete cultural relevance and lasting stewardship.\n\n*Note: This article is currently in draft format and awaiting editorial verification.*`,
      seoTitle: `${params.topic} | News & Updates | RISE International`,
      seoDescription: `Read our latest draft dispatch on ${params.topic} and how collaborative partnerships foster sustainable community development.`,
      suggestedImagePrompt: `A photorealistic documentary-style photograph showing community leaders in dialogue regarding ${params.topic}.`,
    };
  },

  /**
   * 4. Generate Programme Description
   */
  async generateProgrammeDescription(params: GenerateProgrammeParams) {
    const prompt = `
${NGO_SYSTEM_INSTRUCTION}

TASK: Generate a comprehensive, ethical description for the programme:
- Programme: ${params.programmeName}
- Focus Area: ${params.focusArea}
- Community Context: ${params.communityContext || 'Under-resourced regions'}

Return JSON:
{
  "status": "draft",
  "reviewRequired": true,
  "title": "${params.programmeName}",
  "shortDescription": "string",
  "fullDescription": "string (2-3 detailed paragraphs)",
  "mission": "string",
  "whatWeDo": ["string", "string", "string", "string"],
  "ourApproach": "string",
  "whoWeAimToSupport": "string",
  "callToAction": "string"
}
`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        parsed.status = 'draft';
        parsed.reviewRequired = true;
        return parsed;
      }
    } catch (err: any) {
      console.warn('[AI Service] Gemini fallback triggered for programme:', err.message);
    }

    return {
      status: 'draft',
      reviewRequired: true,
      title: params.programmeName,
      shortDescription: `Empowering communities through sustainable initiatives in ${params.focusArea}.`,
      fullDescription: `RISE International's ${params.programmeName} programme provides direct, community-centered support designed to foster long-term self-sufficiency. Rather than external intervention, we work alongside local residents to build enduring solutions.`,
      mission: `To provide equitable access to opportunities and resources in ${params.focusArea}.`,
      whatWeDo: [
        'Co-design grassroots initiatives with local advisory groups',
        'Deliver skills training and capacity-building workshops',
        'Facilitate access to essential infrastructure and learning tools',
        'Support long-term community stewardship and maintenance',
      ],
      ourApproach: 'Every initiative is led by local stakeholders to ensure dignity, cultural alignment, and sustainability.',
      whoWeAimToSupport: 'Children, families, and community groups seeking sustainable opportunities for growth.',
      callToAction: `Support ${params.programmeName}`,
    };
  },

  /**
   * 5. Generate FAQ system items
   */
  async generateFaq(params: GenerateFaqParams) {
    const prompt = `
${NGO_SYSTEM_INSTRUCTION}

TASK: Generate ${params.count || 4} truthful, practical FAQs for ${params.topic} (Page Type: ${params.pageType || 'general'}).
Do NOT invent claims or legal registration details.

Return JSON:
{
  "status": "draft",
  "reviewRequired": true,
  "faqs": [
    {
      "question": "string",
      "answer": "string"
    }
  ]
}
`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        parsed.status = 'draft';
        parsed.reviewRequired = true;
        return parsed;
      }
    } catch (err: any) {
      console.warn('[AI Service] Gemini fallback triggered for FAQs:', err.message);
    }

    return {
      status: 'draft',
      reviewRequired: true,
      faqs: [
        {
          question: `How does RISE International implement ${params.topic}?`,
          answer: 'All initiatives are planned and executed in close partnership with community members to ensure solutions are locally relevant and enduring.',
        },
        {
          question: 'How can I support this initiative?',
          answer: 'You can contribute through donations, volunteering your time and professional skills, or helping raise awareness in your community.',
        },
        {
          question: 'How does RISE International ensure transparency?',
          answer: 'We provide clear, honest updates on our programs and ensure all financial and operational stewardship adheres to strict governance standards.',
        },
      ],
    };
  },

  /**
   * 6. Generate Contextual Image Prompt & Metadata
   */
  async generateImagePrompt(params: GenerateImageParams) {
    const prompt = `
${NGO_SYSTEM_INSTRUCTION}

TASK: Create a photorealistic documentary-style image prompt and metadata for:
- Page: ${params.pageTitle}
- Subject: ${params.topic}

Return JSON:
{
  "status": "draft",
  "reviewRequired": true,
  "aspectRatio": "${params.aspectRatio || '16:9'}",
  "imagePrompt": "string (Detailed documentary photography prompt. Natural lighting, authentic human interaction, hopeful, respectful, dignified, no text, no logos, no watermark)",
  "recommendedAltText": "string (Exact visual description for accessibility and SEO)",
  "recommendedFilename": "string (kebab-case, e.g. community-education-programme.webp)"
}
`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        parsed.status = 'draft';
        parsed.reviewRequired = true;
        return parsed;
      }
    } catch (err: any) {
      console.warn('[AI Service] Gemini fallback triggered for image prompt:', err.message);
    }

    const cleanSlug = params.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return {
      status: 'draft',
      reviewRequired: true,
      aspectRatio: params.aspectRatio || '16:9',
      imagePrompt: `A photorealistic documentary-style photograph for an international NGO website showing authentic human interaction and community cooperation around ${params.topic}. Natural golden hour daylight, dignified expressions, realistic environment, editorial photography, no text, no logos, no watermark.`,
      recommendedAltText: `Community members collaborating on ${params.topic} in a supportive environment`,
      recommendedFilename: `${cleanSlug}-programme.webp`,
    };
  },

  /**
   * 7. Generate Image with Gemini Imagen / Nano Banana
   * Strictly server-side using GEMINI_API_KEY
   */
  async generateImageWithGemini(prompt: string, aspectRatio: string = '16:9') {
    try {
      // Attempt generation via Gemini Imagen model
      const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt,
        config: {
          numberOfImages: 1,
          aspectRatio: (aspectRatio === '16:9' ? '16:9' : '1:1') as any,
          outputMimeType: 'image/jpeg',
        },
      });

      const generatedImage = response.generatedImages?.[0];
      if (generatedImage?.image?.imageBytes) {
        const base64Data = generatedImage.image.imageBytes;
        const uploadDir = path.join(process.cwd(), 'uploads', 'ai-generated');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filename = `ai-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.jpg`;
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

        return {
          status: 'draft',
          reviewRequired: true,
          url: `/uploads/ai-generated/${filename}`,
          filename,
          prompt,
          aspectRatio,
        };
      }
    } catch (err: any) {
      console.warn('[AI Service] Imagen API error or quota limitation:', err.message);
    }

    // Fallback: return review-ready draft asset pointer
    return {
      status: 'draft',
      reviewRequired: true,
      message: 'Image prompt formulated and ready for admin review or re-generation.',
      prompt,
      aspectRatio,
      fallbackUrl: '/images/homepage-hero-community-collaboration.jpg',
    };
  },
};
