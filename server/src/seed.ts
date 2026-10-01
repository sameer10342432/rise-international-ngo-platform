import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ENV } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { Admin } from './models/Admin.js';
import { Programme } from './models/Programme.js';
import { ImpactStat } from './models/ImpactStat.js';
import { Story } from './models/Story.js';
import { NewsArticle } from './models/NewsArticle.js';
import { WebsiteSetting } from './models/WebsiteSetting.js';
import { Page } from './models/Page.js';
import { generateSlug } from './utils/slugify.js';

async function seedDatabase() {
  console.log('[Seed] Connecting to database...');
  await connectDatabase();

  console.log('[Seed] Seeding default super admin...');
  const superAdminEmail = 'admin@riseintl.org';
  const existingAdmin = await Admin.findOne({ email: superAdminEmail });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Admin@Rise2026!', salt);

    await Admin.create({
      name: 'RISE System Administrator',
      email: superAdminEmail,
      passwordHash,
      role: 'super_admin',
      isActive: true,
    });
    console.log(`[Seed] Super Admin created: ${superAdminEmail} (Password: Admin@Rise2026!)`);
  } else {
    console.log(`[Seed] Super Admin already exists: ${superAdminEmail}`);
  }

  console.log('[Seed] Seeding Website Settings...');
  const existingSettings = await WebsiteSetting.findOne();
  if (!existingSettings) {
    await WebsiteSetting.create({
      organisationName: 'RISE International',
      tagline: 'Empowering Communities. Transforming Lives.',
      email: 'info@riseintl.org',
      phone: '+49 1520-6777889',
      logo: '/images/rise-logo.svg',
      favicon: '/favicon.svg',
      defaultSeoTitle: 'RISE International | Empowering Communities. Transforming Lives.',
      defaultSeoDescription:
        'RISE International is a global nonprofit organisation working to uplift vulnerable communities through education, humanitarian aid, and sustainable development initiatives.',
      defaultOgImage: '/images/classroom-children-education.png',
      socialLinks: [
        { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
        { name: 'X / Twitter', href: 'https://x.com', icon: 'twitter' },
        { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
        { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
      ],
      homepageConfig: {
        heroTitle: 'Empowering Communities.',
        heroSubtitle: 'Transforming Lives.',
        heroDescription:
          'RISE International is a global nonprofit organisation working to uplift vulnerable communities through education, humanitarian aid, and sustainable development initiatives.',
        heroImage: '/images/classroom-children-education.png',
        heroCtaPrimary: 'DONATE NOW',
        heroCtaSecondary: 'BECOME A VOLUNTEER',
        showDonationCalculator: true,
        showNewsletter: true,
      },
    });
    console.log('[Seed] Website settings initialized.');
  }

  console.log('[Seed] Checking Programmes...');
  const programmeCount = await Programme.countDocuments();
  if (programmeCount === 0) {
    await Programme.create([
      {
        title: 'Education & Child Literacy',
        slug: generateSlug('Education & Child Literacy'),
        shortDescription:
          'Building primary schools, providing STEM learning materials, and training local teachers in underserved rural communities.',
        description:
          'Education is the most powerful catalyst for breaking cycles of poverty. RISE International builds safe educational facilities, trains passionate community educators, and supplies essential learning materials so that every child, regardless of birth circumstances, has access to quality foundational schooling.',
        image: '/images/classroom-children-education.png',
        icon: 'school',
        category: 'education',
        status: 'published',
        sortOrder: 1,
        mission: 'Guarantee universal primary education and functional literacy in high-need rural regions.',
        whatWeDo: [
          'Construct durable, solar-powered school facilities',
          'Train community teachers in participatory pedagogy',
          'Provide student nutrition and learning kits',
          'Run after-school literacy and digital skill clinics',
        ],
        impactPoints: [
          'Over 45 primary schools constructed and equipped',
          '18,000+ girls and boys enrolled in primary education',
          '94% primary graduation rate achieved across partner schools',
        ],
        stats: [
          { label: 'Schools Built', value: '45+' },
          { label: 'Students Enrolled', value: '18,000+' },
          { label: 'Teachers Certified', value: '620+' },
        ],
      },
      {
        title: 'Community Health & Clean Water',
        slug: generateSlug('Community Health & Clean Water'),
        shortDescription:
          'Drilling deep boreholes, establishing maternal clinics, and strengthening local sanitation infrastructure.',
        description:
          'Clean water and primary healthcare are fundamental human rights. Our community development programs work directly alongside village elder councils and regional health boards to establish solar-powered water filtration systems, train community health workers, and distribute essential medicines.',
        image: '/images/african-doctor-examining-child.png',
        icon: 'water_drop',
        category: 'community-development',
        status: 'published',
        sortOrder: 2,
        mission: 'Eliminate preventable waterborne illnesses and expand primary maternal health access.',
        whatWeDo: [
          'Drill solar borehole wells and install filtration systems',
          'Construct rural maternal health clinics',
          'Train community healthcare workers for mobile triage',
          'Conduct hygiene and disease prevention workshops',
        ],
        impactPoints: [
          '120+ clean water access points operational',
          '85,000+ residents with daily clean drinking water',
          'Zero cholera outbreaks recorded in partner districts over 3 consecutive years',
        ],
        stats: [
          { label: 'Clean Water Points', value: '120+' },
          { label: 'People Served', value: '85,000+' },
          { label: 'Maternal Visits', value: '24,000+' },
        ],
      },
      {
        title: 'Emergency Humanitarian Relief',
        slug: generateSlug('Emergency Humanitarian Relief'),
        shortDescription:
          'Rapid response distribution of food baskets, hygiene kits, and emergency shelter in disaster-affected areas.',
        description:
          'When natural disasters, drought, or conflict strike vulnerable communities, rapid and dignified assistance saves lives. RISE maintains pre-positioned humanitarian emergency stocks and rapid response logistical networks to deploy life-saving assistance within 48 hours of crisis onset.',
        image: '/images/humanitarian-food-distribution.png',
        icon: 'emergency',
        category: 'humanitarian-aid',
        status: 'published',
        sortOrder: 3,
        mission: 'Deliver rapid, dignified life-saving relief supplies within 48 hours of disaster impact.',
        whatWeDo: [
          'Pre-position emergency nutrition and water purification kits',
          'Establish temporary shelter and medical triage tents',
          'Coordinate rapid logistics with regional emergency agencies',
          'Support post-disaster livelihood restoration',
        ],
        impactPoints: [
          'Rapid response missions conducted across 14 emergency zones',
          '50,000+ family food rations distributed during critical shortages',
          'Direct medical relief provided to over 30,000 displaced persons',
        ],
        stats: [
          { label: 'Response Hours', value: '< 48h' },
          { label: 'Families Relieved', value: '50,000+' },
          { label: 'Relief Tons Delivered', value: '1,200+' },
        ],
      },
      {
        title: 'Economic Empowerment & Microloans',
        slug: generateSlug('Economic Empowerment & Microloans'),
        shortDescription:
          'Seed micro-grants, vocational craftsmanship training, and financial literacy circles for women-led enterprises.',
        description:
          'Empowering women and youth with financial literacy, technical skills, and seed capital creates sustainable self-reliance that transforms entire villages. RISE supports women-owned cooperatives, sustainable farming initiatives, and vocational enterprise incubators.',
        image: '/images/group-volunteers-planting-trees.png',
        icon: 'payments',
        category: 'economic-empowerment',
        status: 'published',
        sortOrder: 4,
        mission: 'Foster long-term economic independence through micro-finance and vocational education.',
        whatWeDo: [
          'Distribute interest-free revolving microloans to women cooperatives',
          'Provide vocational training in sustainable agriculture and tailoring',
          'Establish Village Savings and Loan Associations (VSLAs)',
          'Facilitate access to regional wholesale supply chains',
        ],
        impactPoints: [
          '3,400+ women entrepreneurs launched independent businesses',
          '98.4% microloan repayment rate reinvested into community funds',
          'Average household income doubled within 18 months of enrollment',
        ],
        stats: [
          { label: 'Businesses Started', value: '3,400+' },
          { label: 'Loan Repayment Rate', value: '98.4%' },
          { label: 'Households Uplifted', value: '15,000+' },
        ],
      },
    ]);
    console.log('[Seed] 4 core programmes seeded.');
  }

  console.log('[Seed] Checking Impact Statistics...');
  const statCount = await ImpactStat.countDocuments();
  if (statCount === 0) {
    await ImpactStat.create([
      {
        label: 'Countries Worldwide',
        value: '25+',
        numericValue: 25,
        suffix: 'Nations',
        description: 'Active field projects across sub-Saharan Africa, South Asia, and the Middle East.',
        icon: 'public',
        colour: '#1e3a5f',
        sortOrder: 1,
        isVisible: true,
      },
      {
        label: 'Community Projects Completed',
        value: '500+',
        numericValue: 500,
        suffix: 'Projects',
        description: 'Completed schools, water wells, healthcare centers, and sanitation networks.',
        icon: 'task_alt',
        colour: '#e65100',
        sortOrder: 2,
        isVisible: true,
      },
      {
        label: 'Lives Positively Impacted',
        value: '250K+',
        numericValue: 250000,
        suffix: 'People',
        description: 'Children educated, families provided clean water, and mothers receiving healthcare.',
        icon: 'volunteer_activism',
        colour: '#2e7d32',
        sortOrder: 3,
        isVisible: true,
      },
      {
        label: 'Active Global Volunteers',
        value: '1,500+',
        numericValue: 1500,
        suffix: 'Volunteers',
        description: 'Dedicated professionals, doctors, teachers, and field workers.',
        icon: 'groups',
        colour: '#0288d1',
        sortOrder: 4,
        isVisible: true,
      },
      {
        label: 'Partners & Donors Worldwide',
        value: '300+',
        numericValue: 300,
        suffix: 'Partners',
        description: 'Partner NGOs, corporate sponsors, foundations, and institutional donors.',
        icon: 'handshake',
        colour: '#6a1b9a',
        sortOrder: 5,
        isVisible: true,
      },
    ]);

    console.log('[Seed] 5 impact statistics seeded.');
  }

  console.log('[Seed] Checking Stories...');
  const storyCount = await Story.countDocuments();
  if (storyCount === 0) {
    await Story.create([
      {
        title: "Amina's Journey: From Water Carrier to High School Scholar",
        slug: generateSlug("Amina's Journey: From Water Carrier to High School Scholar"),
        excerpt:
          'Before the community borehole was built, 12-year-old Amina walked six miles every morning for water. Today, she tops her class in physics and dreams of civil engineering.',
        content: [
          'For generations in the Turkana district, girls were the primary water bearers for their households. Amina spent four hours each dawn carrying a 20-litre jerrycan across rocky terrain.',
          'When RISE International installed a solar-powered borehole adjacent to her village primary school, everything changed.',
          '"For the first time, I arrived at school before the morning bell with dry clothes and energy to study," Amina recalls. With consistent attendance and dedicated mentoring from RISE-trained educators, Amina completed her primary exams in the top 1% regionally.',
        ],
        featuredImage: '/images/classroom-children-education.png',
        category: 'Education',
        author: 'Sarah Jenkins, Field Operations Officer',
        publishedAt: new Date(Date.now() - 7 * 86400000),
        status: 'published',
        featured: true,
      },
      {
        title: 'Revitalizing Kijiji: How Clean Water Transformed an Entire Village',
        slug: generateSlug('Revitalizing Kijiji: How Clean Water Transformed an Entire Village'),
        excerpt:
          'Three years after the installation of a solar-powered deep borehole, local clinic reports zero cases of waterborne typhoid and child school attendance has climbed 40%.',
        content: [
          'The health post in Kijiji used to treat dozens of severe waterborne cases every single week.',
          'Following our community water engineering initiative, clean potable water now flows to three central kiosks and the village dispensary.',
          'Local women have channeled their reclaimed time into market gardens, producing nutritious vegetables that nourish families and generate income.',
        ],
        featuredImage: '/images/african-doctor-examining-child.png',
        category: 'Community',
        author: 'Dr. Michael Chen, Public Health Lead',
        publishedAt: new Date(Date.now() - 14 * 86400000),
        status: 'published',
        featured: true,
      },
    ]);
    console.log('[Seed] Sample field stories seeded.');
  }

  console.log('[Seed] Checking News Articles...');
  const newsCount = await NewsArticle.countDocuments();
  if (newsCount === 0) {
    await NewsArticle.create([
      {
        title: 'RISE International Expands Clean Water Initiative to 12 New Communities',
        slug: generateSlug('RISE International Expands Clean Water Initiative to 12 New Communities'),
        excerpt:
          'With support from global partners and individual donors, ground was broken on twelve solar borehole projects projected to benefit 30,000 residents.',
        content: [
          'We are delighted to announce the expansion of our Sustainable Water Access program into 12 additional rural districts.',
          'Each borehole will be fitted with solar submersible pumps and paired with community water management committees trained in ongoing maintenance.',
        ],
        featuredImage: '/images/african-doctor-examining-child.png',
        category: 'Field Updates',
        author: 'RISE Communications Team',
        publishedAt: new Date(Date.now() - 3 * 86400000),
        status: 'published',
        featured: true,
        tags: ['Water', 'Infrastructure', 'Field Updates'],
      },
      {
        title: 'Annual Impact Report 2025: Accountability, Progress, and Transformation',
        slug: generateSlug('Annual Impact Report 2025: Accountability, Progress, and Transformation'),
        excerpt:
          'Full audited financial statements and comprehensive programmatic reviews from our 2025 operations are now available for public download.',
        content: [
          'Transparency is the cornerstone of our donor trust.',
          'In 2025, 87% of every dollar donated went directly into field programs. Read our complete audited accounts, external evaluation assessments, and beneficiary testimonials.',
        ],
        featuredImage: '/images/classroom-children-education.png',
        category: 'Press Releases',
        author: 'Executive Office',
        publishedAt: new Date(Date.now() - 20 * 86400000),
        status: 'published',
        featured: false,
        tags: ['Transparency', 'Annual Report', 'Finance'],
      },
    ]);
    console.log('[Seed] Sample news articles seeded.');

  }

  console.log('[Seed] Checking Pages...');
  const pageCount = await Page.countDocuments();
  if (pageCount === 0) {
    await Page.create([
      {
        title: 'About RISE International',
        slug: 'about',
        content:
          'Founded with a mission to bring sustainable hope and tangible opportunity to the world\'s most vulnerable communities, RISE International works across four foundational pillars: Quality Education, Community Development, Emergency Humanitarian Aid, and Sustainable Economic Livelihoods.',
        status: 'published',
        seoTitle: 'About Us | RISE International',
        seoDescription: 'Learn about RISE International\'s mission, history, and global team.',
      },
      {
        title: 'Mission & Vision',
        slug: 'mission-vision',
        content:
          'Our mission is to empower vulnerable communities through sustainable development, quality education, clean water, and emergency relief. We envision a world where every human being has the opportunity, tools, and dignity to reach their full potential.',
        status: 'published',
        seoTitle: 'Mission & Vision | RISE International',
        seoDescription: 'Discover our core vision, mission statement, and long-term values.',
      },
    ]);
    console.log('[Seed] Content pages seeded.');
  }

  console.log('[Seed] Seeding completed successfully!');
  await disconnectDatabase();
}

seedDatabase().catch((err) => {
  console.error('[Seed] Database seeding failed:', err);
  process.exit(1);
});
