import https from 'https';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';

const outputDir = path.resolve('../public/images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Full registry of 51 unique images across all sections
const imageManifest = [
  // 1. Homepage
  {
    id: 'homepage_hero',
    photoId: 'photo-1593113598332-cd288d649433',
    filename: 'rise-home-hero-community.webp',
    width: 1344,
    height: 768,
    page: 'Home',
    section: 'Hero Banner',
    altText: 'Diverse community members and international humanitarian volunteers collaborating outdoors under warm natural daylight',
    caption: 'People-centred community collaboration.',
    license: 'Unsplash Free License'
  },
  {
    id: 'homepage_about',
    photoId: 'photo-1573497019940-1c28c88b4f3e',
    filename: 'rise-home-about-dialogue.webp',
    width: 1024,
    height: 768,
    page: 'Home',
    section: 'About RISE Teaser',
    altText: 'Community leaders and NGO coordinators discussing local priorities during an open consultation',
    caption: 'Consultation with community leadership.',
    license: 'Unsplash Free License'
  },
  {
    id: 'homepage_volunteer_cta',
    photoId: 'photo-1559027615-cd4628902d4a',
    filename: 'rise-home-volunteer-action.webp',
    width: 1344,
    height: 768,
    page: 'Home',
    section: 'Volunteer CTA',
    altText: 'Dedicated field volunteers assembling educational furniture in a community school',
    caption: 'Volunteers and community members building together.',
    license: 'Unsplash Free License'
  },
  {
    id: 'homepage_donation_cta',
    photoId: 'photo-1544717305-2782549b5136',
    filename: 'rise-home-donation-stewardship.webp',
    width: 1344,
    height: 768,
    page: 'Home',
    section: 'Donation CTA',
    altText: 'Primary school student holding new exercise books with pride in a community classroom',
    caption: 'Transparent stewardship expanding opportunities.',
    license: 'Unsplash Free License'
  },

  // 2. About Page
  {
    id: 'about_hero',
    photoId: 'photo-1531206715517-5c0ba140b2b8',
    filename: 'rise-about-hero-leadership.webp',
    width: 1344,
    height: 768,
    page: 'About',
    section: 'Hero Banner',
    altText: 'Community elders, local coordinators, and educators in an open-air village assembly',
    caption: 'Grassroots leadership and community consultation.',
    license: 'Unsplash Free License'
  },
  {
    id: 'about_story',
    photoId: 'photo-1574680096145-d05b474e2155',
    filename: 'rise-about-story-grassroots.webp',
    width: 1024,
    height: 768,
    page: 'About',
    section: 'Our Story',
    altText: 'Villagers working together to improve local community facilities',
    caption: 'Our story began with community initiatives.',
    license: 'Unsplash Free License'
  },
  {
    id: 'about_mission_vision',
    photoId: 'photo-1524178232363-1fb2b075b655',
    filename: 'rise-about-mission-opportunity.webp',
    width: 1024,
    height: 768,
    page: 'About',
    section: 'Mission & Vision',
    altText: 'Students engaged in interactive learning inside a well-maintained community classroom',
    caption: 'Fostering long-term dignity and opportunity.',
    license: 'Unsplash Free License'
  },
  {
    id: 'about_values',
    photoId: 'photo-1492496913980-501348b61469',
    filename: 'rise-about-values-collaboration.webp',
    width: 1024,
    height: 768,
    page: 'About',
    section: 'Core Values',
    altText: 'Community agricultural cooperative members tending healthy crops together',
    caption: 'Integrity, collaboration, and accountability.',
    license: 'Unsplash Free License'
  },
  {
    id: 'about_approach',
    photoId: 'photo-1517048676732-d65bc937f952',
    filename: 'rise-about-approach-partnership.webp',
    width: 1344,
    height: 768,
    page: 'About',
    section: 'Our Approach',
    altText: 'Community leaders and humanitarian planners reviewing project maps and milestones',
    caption: 'Participatory planning and sustainable handovers.',
    license: 'Unsplash Free License'
  },

  // 3. Our Work & Core Programme Cards
  {
    id: 'our_work_hero',
    photoId: 'photo-1522202176988-66273c2fd55f',
    filename: 'rise-our-work-hero-overview.webp',
    width: 1344,
    height: 768,
    page: 'Our Work',
    section: 'Hero Banner',
    altText: 'Community coordination team reviewing development milestones on paper drafts',
    caption: 'Coordinated initiatives across four strategic pillars.',
    license: 'Unsplash Free License'
  },
  {
    id: 'programme_card_education',
    photoId: 'photo-1509062522246-3755977927d7',
    filename: 'rise-programme-card-education.webp',
    width: 1024,
    height: 768,
    page: 'Our Work',
    section: 'Education Programme Card',
    altText: 'Elementary students in uniforms sitting at wooden desks attentive to their teacher',
    caption: 'Education that unlocks lifelong opportunities.',
    license: 'Unsplash Free License'
  },
  {
    id: 'programme_card_community_dev',
    photoId: 'photo-1541888946425-d0fbb186f5f8',
    filename: 'rise-programme-card-community-dev.webp',
    width: 1024,
    height: 768,
    page: 'Our Work',
    section: 'Community Development Card',
    altText: 'Engineers and community workers installing reliable solar water pumping equipment',
    caption: 'Community development driven by local solutions.',
    license: 'Unsplash Free License'
  },
  {
    id: 'programme_card_humanitarian_aid',
    photoId: 'photo-1584515979956-d9f6e5d09982',
    filename: 'rise-programme-card-humanitarian-aid.webp',
    width: 1024,
    height: 768,
    page: 'Our Work',
    section: 'Humanitarian Aid Card',
    altText: 'Healthcare worker providing respectful medical consultation at a community clinic',
    caption: 'Dignified emergency assistance and health stabilization.',
    license: 'Unsplash Free License'
  },
  {
    id: 'programme_card_economic_empowerment',
    photoId: 'photo-1558769132-cb1aea458c5e',
    filename: 'rise-programme-card-economic-empowerment.webp',
    width: 1024,
    height: 768,
    page: 'Our Work',
    section: 'Economic Empowerment Card',
    altText: 'Tailoring trainee measuring fabric on a worktable in a vocational training studio',
    caption: 'Vocational skills and durable livelihoods.',
    license: 'Unsplash Free License'
  },

  // 4. Education Programme Detail
  {
    id: 'education_detail_hero',
    photoId: 'photo-1577896851231-70ef18881754',
    filename: 'rise-education-detail-hero.webp',
    width: 1344,
    height: 768,
    page: 'Education Detail',
    section: 'Hero Banner',
    altText: 'Teacher crouched beside elementary student explaining reading exercises with warmth',
    caption: 'Dedicated mentorship and inclusive education.',
    license: 'Unsplash Free License'
  },
  {
    id: 'education_detail_materials',
    photoId: 'photo-1497633762265-9d179a990aa6',
    filename: 'rise-education-detail-materials.webp',
    width: 1024,
    height: 768,
    page: 'Education Detail',
    section: 'Focus Section',
    altText: 'Stack of textbooks, notebooks, and learning materials on a classroom desk',
    caption: 'Essential learning tools for every student.',
    license: 'Unsplash Free License'
  },
  {
    id: 'education_detail_teaching',
    photoId: 'photo-1588072432836-e10032774350',
    filename: 'rise-education-detail-teaching.webp',
    width: 1024,
    height: 768,
    page: 'Education Detail',
    section: 'Approach Section',
    altText: 'Group of young students collaborating around a shared textbook',
    caption: 'Peer collaboration and foundational literacy.',
    license: 'Unsplash Free License'
  },
  {
    id: 'education_detail_cta',
    photoId: 'photo-1529390079861-591de354faf5',
    filename: 'rise-education-detail-cta.webp',
    width: 1344,
    height: 768,
    page: 'Education Detail',
    section: 'Action Banner',
    altText: 'Smiling students walking happily outside their renovated school building',
    caption: 'Investing in resilient young minds.',
    license: 'Unsplash Free License'
  },

  // 5. Community Development Detail
  {
    id: 'community_detail_hero',
    photoId: 'photo-1503387762-592deb58ef4e',
    filename: 'rise-community-detail-hero.webp',
    width: 1344,
    height: 768,
    page: 'Community Development Detail',
    section: 'Hero Banner',
    altText: 'Construction team and community workers assembling roof beams for a community centre',
    caption: 'Local infrastructure built to last generations.',
    license: 'Unsplash Free License'
  },
  {
    id: 'community_detail_water',
    photoId: 'photo-1534447677768-be436bb09401',
    filename: 'rise-community-detail-water.webp',
    width: 1024,
    height: 768,
    page: 'Community Development Detail',
    section: 'Focus Section',
    altText: 'Clear potable water flowing steadily from a solar-powered community tap stand',
    caption: 'Sustainable clean drinking water infrastructure.',
    license: 'Unsplash Free License'
  },
  {
    id: 'community_detail_meeting',
    photoId: 'photo-1517245386807-bb43f82c33c4',
    filename: 'rise-community-detail-meeting.webp',
    width: 1024,
    height: 768,
    page: 'Community Development Detail',
    section: 'Approach Section',
    altText: 'Local neighbourhood committee members voting and speaking during town hall',
    caption: 'Participatory community governance.',
    license: 'Unsplash Free License'
  },
  {
    id: 'community_detail_cta',
    photoId: 'photo-1500937386664-56d1dfef3854',
    filename: 'rise-community-detail-cta.webp',
    width: 1344,
    height: 768,
    page: 'Community Development Detail',
    section: 'Action Banner',
    altText: 'Sunlit agricultural community farmland managed by local cooperative members',
    caption: 'Building resilient and self-sustaining communities.',
    license: 'Unsplash Free License'
  },

  // 6. Humanitarian Aid Detail
  {
    id: 'humanitarian_detail_hero',
    photoId: 'photo-1488521787991-ed7bbaae773c',
    filename: 'rise-humanitarian-detail-hero.webp',
    width: 1344,
    height: 768,
    page: 'Humanitarian Aid Detail',
    section: 'Hero Banner',
    altText: 'Humanitarian logistics team organizing emergency family packages with dignity',
    caption: 'Rapid, compassionate assistance when crisis strikes.',
    license: 'Unsplash Free License'
  },
  {
    id: 'humanitarian_detail_clinic',
    photoId: 'photo-1576091160399-112ba8d25d1d',
    filename: 'rise-humanitarian-detail-clinic.webp',
    width: 1024,
    height: 768,
    page: 'Humanitarian Aid Detail',
    section: 'Focus Section',
    altText: 'Field medical doctor reviewing diagnostic records in a temporary clinic',
    caption: 'Quality emergency health care and stabilization.',
    license: 'Unsplash Free License'
  },
  {
    id: 'humanitarian_detail_supplies',
    photoId: 'photo-1582213782179-e0d53f98f2ca',
    filename: 'rise-humanitarian-detail-supplies.webp',
    width: 1024,
    height: 768,
    page: 'Humanitarian Aid Detail',
    section: 'Approach Section',
    altText: 'Aid workers coordinating shipment of clean hygiene and water purification supplies',
    caption: 'Transparent supply chain management.',
    license: 'Unsplash Free License'
  },
  {
    id: 'humanitarian_detail_cta',
    photoId: 'photo-1469571486292-0ba58a3f068b',
    filename: 'rise-humanitarian-detail-cta.webp',
    width: 1344,
    height: 768,
    page: 'Humanitarian Aid Detail',
    section: 'Action Banner',
    altText: 'Community volunteers smiling together after distributing winter relief supplies',
    caption: 'Standing alongside affected families until recovery.',
    license: 'Unsplash Free License'
  },

  // 7. Economic Empowerment Detail
  {
    id: 'economic_detail_hero',
    photoId: 'photo-1504917599217-d4dc5ebe6122',
    filename: 'rise-economic-detail-hero.webp',
    width: 1344,
    height: 768,
    page: 'Economic Empowerment Detail',
    section: 'Hero Banner',
    altText: 'Carpenter crafting wooden furniture alongside young vocational apprentice',
    caption: 'Practical vocational training for durable livelihoods.',
    license: 'Unsplash Free License'
  },
  {
    id: 'economic_detail_weaving',
    photoId: 'photo-1607344645866-009c320b5ab8',
    filename: 'rise-economic-detail-weaving.webp',
    width: 1024,
    height: 768,
    page: 'Economic Empowerment Detail',
    section: 'Focus Section',
    altText: 'Artisan weaving colorful textiles on traditional community loom',
    caption: 'Preserving craftsmanship and creating income pathways.',
    license: 'Unsplash Free License'
  },
  {
    id: 'economic_detail_market',
    photoId: 'photo-1528698827591-e19ccd7bc23d',
    filename: 'rise-economic-detail-market.webp',
    width: 1024,
    height: 768,
    page: 'Economic Empowerment Detail',
    section: 'Approach Section',
    altText: 'Micro-enterprise store owner organizing local goods for neighborhood market',
    caption: 'Supporting local entrepreneurs and market linkages.',
    license: 'Unsplash Free License'
  },
  {
    id: 'economic_detail_cta',
    photoId: 'photo-1556742049-0a67e557224f',
    filename: 'rise-economic-detail-cta.webp',
    width: 1344,
    height: 768,
    page: 'Economic Empowerment Detail',
    section: 'Action Banner',
    altText: 'Small business merchant finalizing customer purchase with digital payment confirmation',
    caption: 'Financial inclusion and commercial independence.',
    license: 'Unsplash Free License'
  },

  // 8. Impact & Accountability
  {
    id: 'impact_hero_metrics',
    photoId: 'photo-1595974482597-4b8da8879bc5',
    filename: 'rise-impact-hero-metrics.webp',
    width: 1344,
    height: 768,
    page: 'Impact',
    section: 'Hero Banner',
    altText: 'Agricultural cooperative members inspecting high-yield crops under morning sunlight',
    caption: 'Measuring tangible, community-owned outcomes.',
    license: 'Unsplash Free License'
  },
  {
    id: 'impact_methodology_eval',
    photoId: 'photo-1454165804606-c3d57bc86b40',
    filename: 'rise-impact-methodology-evaluation.webp',
    width: 1024,
    height: 768,
    page: 'Impact',
    section: 'Methodology Framework',
    altText: 'Project monitoring team reviewing survey data and community feedback forms',
    caption: 'Participatory monitoring and qualitative audits.',
    license: 'Unsplash Free License'
  },
  {
    id: 'impact_governance_audit',
    photoId: 'photo-1450133064473-71024230f91b',
    filename: 'rise-impact-governance-audit.webp',
    width: 1344,
    height: 768,
    page: 'Impact Report',
    section: 'Financial Stewardship',
    altText: 'Transparent audit documentation and balance sheets on conference desk',
    caption: 'Open financial reporting and donor accountability.',
    license: 'Unsplash Free License'
  },

  // 9. Stories of Change (3 distinct stories)
  {
    id: 'story_01_library',
    photoId: 'photo-1516979187457-637abb4f9353',
    filename: 'rise-story-education-library.webp',
    width: 1024,
    height: 768,
    page: 'Stories',
    section: 'Story 1: Learning Spaces',
    altText: 'Young student absorbed in reading a storybook inside a newly opened village reading room',
    caption: 'Establishing community learning centers.',
    license: 'Unsplash Free License'
  },
  {
    id: 'story_02_water',
    photoId: 'photo-1533038590840-1cde6e668a91',
    filename: 'rise-story-community-clean-water.webp',
    width: 1024,
    height: 768,
    page: 'Stories',
    section: 'Story 2: Solar Water Station',
    altText: 'Children laughing while filling clean water containers at a neighborhood solar pump',
    caption: 'Clean water accessible within minutes.',
    license: 'Unsplash Free License'
  },
  {
    id: 'story_03_artisan',
    photoId: 'photo-1590736704728-f4730bb30770',
    filename: 'rise-story-economic-artisan.webp',
    width: 1024,
    height: 768,
    page: 'Stories',
    section: 'Story 3: Artisan Cooperative',
    altText: 'Master tailor guiding apprentice on precision fabric stitching and pattern assembly',
    caption: 'Building family economic resilience.',
    license: 'Unsplash Free License'
  },

  // 10. News Articles (3 distinct news items)
  {
    id: 'news_01_learning_hub',
    photoId: 'photo-1519389950473-47ba0277781c',
    filename: 'rise-news-learning-hub-launch.webp',
    width: 1344,
    height: 768,
    page: 'News',
    section: 'Article 1: Learning Hub',
    altText: 'Community members gathering in computer room of newly opened educational learning centre',
    caption: 'Field Update: Education Resource Hub Inauguration.',
    license: 'Unsplash Free License'
  },
  {
    id: 'news_02_solar_water',
    photoId: 'photo-1509391365360-2e959784a276',
    filename: 'rise-news-solar-water-expansion.webp',
    width: 1344,
    height: 768,
    page: 'News',
    section: 'Article 2: Water Expansion',
    altText: 'Solar panel array installed next to a fresh water borehole filtration station',
    caption: 'Field Update: Expanding Clean Water Infrastructure.',
    license: 'Unsplash Free License'
  },
  {
    id: 'news_03_audit_report',
    photoId: 'photo-1460925895917-afdab827c52f',
    filename: 'rise-news-annual-audit-transparency.webp',
    width: 1344,
    height: 768,
    page: 'News',
    section: 'Article 3: Annual Disclosures',
    altText: 'Analytical stewardship charts and evaluation metrics displayed on tablet device',
    caption: 'Institutional Report: Governance and Impact Disclosures.',
    license: 'Unsplash Free License'
  },

  // 11. Get Involved, Donate, Volunteer, Partner, Sponsor Child, Contact
  {
    id: 'get_involved_hero',
    photoId: 'photo-1511632765486-a01980e01a18',
    filename: 'rise-get-involved-hero.webp',
    width: 1344,
    height: 768,
    page: 'Get Involved',
    section: 'Hero Banner',
    altText: 'Youth and community volunteers smiling together during an environmental planting day',
    caption: 'Six meaningful avenues to make a lasting difference.',
    license: 'Unsplash Free License'
  },
  {
    id: 'donate_hero',
    photoId: 'photo-1516627145497-ae6968895b74',
    filename: 'rise-donate-hero-dignity.webp',
    width: 1344,
    height: 768,
    page: 'Donate',
    section: 'Hero Banner',
    altText: 'Mother tenderly holding her daughter in a bright, clean community clinic waiting room',
    caption: 'Transparent contributions transforming lives.',
    license: 'Unsplash Free License'
  },
  {
    id: 'sponsor_child_hero',
    photoId: 'photo-1503676260728-1c00da094a0b',
    filename: 'rise-sponsor-child-hero.webp',
    width: 1344,
    height: 768,
    page: 'Sponsor a Child',
    section: 'Hero Banner',
    altText: 'Young schoolboy with backpack smiling warmly on his way to elementary school',
    caption: 'Sponsoring a child’s educational journey.',
    license: 'Unsplash Free License'
  },
  {
    id: 'volunteer_hero',
    photoId: 'photo-1542810634-71277d95dcbb',
    filename: 'rise-volunteer-hero-collaboration.webp',
    width: 1344,
    height: 768,
    page: 'Volunteer',
    section: 'Hero Banner',
    altText: 'Volunteer teacher working with children on art and literacy exercises outdoors',
    caption: 'Lend your skills and time with purpose.',
    license: 'Unsplash Free License'
  },
  {
    id: 'partner_hero',
    photoId: 'photo-1521791136064-7986c2920216',
    filename: 'rise-partner-hero-institutional.webp',
    width: 1344,
    height: 768,
    page: 'Partner',
    section: 'Hero Banner',
    altText: 'Two project leaders shaking hands warmly across a conference desk overlooking city',
    caption: 'Partnering for systemic, sustainable impact.',
    license: 'Unsplash Free License'
  },
  {
    id: 'contact_hero',
    photoId: 'photo-1529156069898-49953e39b3ac',
    filename: 'rise-contact-hero-dialogue.webp',
    width: 1344,
    height: 768,
    page: 'Contact',
    section: 'Hero Banner',
    altText: 'Community coordinator smiling warmly during open consultation dialogue session',
    caption: 'Direct coordination desk and inquiries.',
    license: 'Unsplash Free License'
  },

  // 12. Team Functional Leadership (1:1 Aspect Ratio)
  {
    id: 'team_exec',
    photoId: 'photo-1573496359142-b8d87734a5a2',
    filename: 'rise-team-exec-leadership.webp',
    width: 600,
    height: 600,
    page: 'About',
    section: 'Team Leadership - Executive Office',
    altText: 'Executive Director of RISE International in professional field attire',
    caption: 'Executive Office & Strategic Coordination',
    license: 'Unsplash Free License'
  },
  {
    id: 'team_programmes',
    photoId: 'photo-1560250097-0b93528c311a',
    filename: 'rise-team-programmes-director.webp',
    width: 600,
    height: 600,
    page: 'About',
    section: 'Team Leadership - Field Programmes',
    altText: 'Director of Community Programmes reviewing field implementation reports',
    caption: 'Director of Community Programmes',
    license: 'Unsplash Free License'
  },
  {
    id: 'team_education',
    photoId: 'photo-1580894732444-8ecded7900cd',
    filename: 'rise-team-education-lead.webp',
    width: 600,
    height: 600,
    page: 'About',
    section: 'Team Leadership - Education Lead',
    altText: 'Education Initiatives Specialist holding lesson plans in a learning centre',
    caption: 'Education & Learning Initiatives Lead',
    license: 'Unsplash Free License'
  },
  {
    id: 'team_humanitarian',
    photoId: 'photo-1537368910025-700350fe46c7',
    filename: 'rise-team-humanitarian-lead.webp',
    width: 600,
    height: 600,
    page: 'About',
    section: 'Team Leadership - Humanitarian Lead',
    altText: 'Emergency Assistance Coordinator wearing blue field vest',
    caption: 'Humanitarian Assistance Coordinator',
    license: 'Unsplash Free License'
  },
  {
    id: 'team_economic',
    photoId: 'photo-1534528741775-53994a69daeb',
    filename: 'rise-team-economic-specialist.webp',
    width: 600,
    height: 600,
    page: 'About',
    section: 'Team Leadership - Livelihoods Specialist',
    altText: 'Economic Empowerment Specialist smiling in vocational workshop',
    caption: 'Livelihoods & Micro-Enterprise Specialist',
    license: 'Unsplash Free License'
  },
  {
    id: 'team_finance',
    photoId: 'photo-1507003211169-0a1dd7228f2d',
    filename: 'rise-team-accountability-lead.webp',
    width: 600,
    height: 600,
    page: 'About',
    section: 'Team Leadership - Finance & Accountability',
    altText: 'Head of Finance & Accountability with stewardship documents',
    caption: 'Head of Finance & Accountability',
    license: 'Unsplash Free License'
  }
];

function downloadAndOptimize(item) {
  return new Promise((resolve) => {
    const url = `https://images.unsplash.com/${item.photoId}?q=80&w=1600&auto=format&fit=crop`;
    const targetPath = path.join(outputDir, item.filename);

    console.log(`[Processing] ${item.filename} from ${item.photoId}...`);

    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        https.get(res.headers.location, (redirectRes) => {
          const chunks = [];
          redirectRes.on('data', c => chunks.push(c));
          redirectRes.on('end', async () => {
            await processBuffer(Buffer.concat(chunks), targetPath, item, resolve);
          });
        }).on('error', err => {
          console.error(`Error on redirect for ${item.filename}:`, err.message);
          resolve(null);
        });
        return;
      }

      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', async () => {
        await processBuffer(Buffer.concat(chunks), targetPath, item, resolve);
      });
    }).on('error', err => {
      console.error(`Error downloading ${item.filename}:`, err.message);
      resolve(null);
    });
  });
}

async function processBuffer(buffer, targetPath, item, resolve) {
  try {
    const fileHash = crypto.createHash('sha256').update(buffer).digest('hex');
    const sharpInstance = sharp(buffer)
      .resize(item.width, item.height, { fit: 'cover', position: 'center' })
      .webp({ quality: 84 });

    const info = await sharpInstance.toFile(targetPath);
    console.log(`[Success] Saved ${item.filename} (${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB)`);

    resolve({
      ...item,
      url: `/images/${item.filename}`,
      sizeBytes: info.size,
      fileHash,
      isUsed: true
    });
  } catch (err) {
    console.error(`Sharp error on ${item.filename}:`, err.message);
    resolve(null);
  }
}

async function run() {
  console.log(`Starting Image Pipeline for ${imageManifest.length} unique images...`);
  const registryResults = [];

  for (const item of imageManifest) {
    const res = await downloadAndOptimize(item);
    if (res) {
      registryResults.push(res);
    }
  }

  // Save the full verified registry
  const registryJsonPath = path.resolve('../src/data/imageRegistry.json');
  fs.writeFileSync(registryJsonPath, JSON.stringify(registryResults, null, 2), 'utf-8');
  console.log(`Image Registry saved to ${registryJsonPath} with ${registryResults.length} unique entries.`);
}

run();
