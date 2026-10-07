import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { ENV } from './config/env.js';
import { Admin } from './models/Admin.js';
import { WebsiteSetting } from './models/WebsiteSetting.js';
import { Programme } from './models/Programme.js';
import { ImpactStat } from './models/ImpactStat.js';
import { Story } from './models/Story.js';
import { NewsArticle } from './models/NewsArticle.js';
import { Page } from './models/Page.js';
import { TeamMember } from './models/TeamMember.js';
import { Partner } from './models/Partner.js';
import { MediaAsset } from './models/MediaAsset.js';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function seedDatabase(): Promise<void> {
  console.log('[Seed] Connecting to MongoDB...');
  await connectDatabase();

  console.log('[Seed] Checking Super Admin...');
  const superAdminEmail = ENV.SUPER_ADMIN_EMAIL.toLowerCase();
  const passwordHash = await bcrypt.hash(ENV.SUPER_ADMIN_PASSWORD, 10);
  const existingSuperAdmin = await Admin.findOne({ email: superAdminEmail });

  if (!existingSuperAdmin) {
    await Admin.create({
      name: 'RISE Administrator',
      email: superAdminEmail,
      passwordHash,
      role: 'super_admin',
      isActive: true,
    });
    console.log(`[Seed] Super Admin created: ${superAdminEmail}`);
  } else {
    existingSuperAdmin.passwordHash = passwordHash;
    await existingSuperAdmin.save();
    console.log(`[Seed] Super Admin passwordHash synchronized: ${superAdminEmail}`);
  }

  console.log('[Seed] Synchronizing Website Settings...');
  await WebsiteSetting.deleteMany({});
  await WebsiteSetting.create({
    organisationName: 'RISE International (Research Initiatives and Skill Enlightenment)',
    tagline: 'Translating Thoughts Into Actions',
    email: 'info@riseintl.org',
    phone: '+92-302-4044714',
    logo: '/images/logo/rise-logo.png',
    favicon: '/favicon.png',
    defaultSeoTitle: 'RISE International | Translating Thoughts Into Actions',
    defaultSeoDescription:
      'Research Initiatives and Skill Enlightenment (RISE International) — Empowering communities through education, St. Louis IT Institute, vocational skills, interfaith harmony, and sustainable grassroots development.',
    defaultOgImage: '/images/logo/rise-logo.png',
    socialLinks: [
      { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61567574883066', icon: 'facebook' },
      { name: 'X / Twitter', href: 'https://x.com/intlrise15460', icon: 'twitter' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rise-intl-284884334', icon: 'linkedin' },
      { name: 'Instagram', href: 'https://www.instagram.com/riseintl/', icon: 'instagram' },
    ],
    homepageConfig: {
      heroTitle: 'Translating Thoughts Into Actions',
      heroSubtitle: 'Research Initiatives and Skill Enlightenment',
      heroDescription:
        'Empowering communities through holistic education, cutting-edge technology education at St. Louis Institute, vocational women empowerment, interfaith harmony, and sustainable community resilience.',
      heroImage: '/images/wordpress/Leonardo_Phoenix_A_vibrant_and_dynamic_illustration_of_the_St_3.jpg',
      heroCtaPrimary: 'DONATE NOW',
      heroCtaSecondary: 'BECOME A VOLUNTEER',
      showDonationCalculator: true,
      showNewsletter: true,
    },
  });
  console.log('[Seed] Website settings initialized.');

  console.log('[Seed] Synchronizing Authentic Programmes...');
  await Programme.deleteMany({});
  await Programme.create([
    {
      title: 'St. Louis Institute (Higher IT Education & Tech Hub)',
      slug: 'st-louis-institute',
      shortDescription:
        'Constructing a cutting-edge Information Technology institute in rural Punjab to provide computer science, vocational training, and leadership for youth.',
      description:
        'RISE International has launched a visionary initiative to construct the St. Louis Institute in rural Punjab—a state-of-the-art technological and vocational hub. Integrating modern digital laboratories with creative teaching, this institution will develop next-generation IT talent and empower rural youth with computer science, software engineering, and digital skills. Target completion and grand opening is scheduled for 2026.',
      image: '/images/wordpress/Leonardo_Phoenix_A_vibrant_and_dynamic_illustration_of_the_St_3.jpg',
      icon: 'computer',
      category: 'education',
      status: 'published',
      sortOrder: 1,
      mission: 'Bridge the digital divide by delivering world-class computer science education, vocational training, and technological innovation to under-served rural youth.',
      whatWeDo: [
        'Construct and equip modern digital learning laboratories and collaborative spaces',
        'Deliver rigorous software development, web engineering, and digital literacy curricula',
        'Connect rural students with international tech mentors and academic opportunities',
        'Foster entrepreneurial incubation and real-world problem-solving workshops',
      ],
      impactPoints: [
        'Target opening in 2026 as Punjab premier rural technology institute',
        'State-of-the-art architectural design co-developed with international educators',
        'Over 1,000 students projected to receive advanced tech diplomas annually',
      ],
      stats: [
        { label: 'Target Launch', value: '2026' },
        { label: 'Facility Type', value: 'IT & Vocational' },
        { label: 'Focus', value: 'Youth Tech Skills' },
      ],
    },
    {
      title: 'Women Vocational Training & Skill Centers',
      slug: 'women-vocational-training',
      shortDescription:
        'Establishing sewing centers and vocational training in Mariamabad-Sheikhpura to foster financial self-reliance and eradicate child labor.',
      description:
        'In areas like Mariamabad and Sheikhpura, economic vulnerability frequently traps women and families in poverty. RISE International operates specialized sewing centers and practical tailoring workshops where rural women master sewing, stitching, embroidery, and enterprise management. By equipping women with sustainable livelihoods, families achieve financial independence, enabling children to attend school instead of laboring.',
      image: '/images/wordpress/1.jpg',
      icon: 'styler',
      category: 'economic-empowerment',
      status: 'published',
      sortOrder: 2,
      mission: 'Empower rural women with marketable tailoring and handicraft skills, enabling them to earn sustainable incomes and achieve economic sovereignty.',
      whatWeDo: [
        'Provide sewing machines, sewing kits, and quality textiles for practical training',
        'Conduct daily tailoring, pattern-making, and embroidery masterclasses',
        'Deliver basic financial literacy, business bookkeeping, and marketing training',
        'Eliminate child labor by securing stable household incomes for mothers',
      ],
      impactPoints: [
        'Dozens of rural women certified annually as skilled tailoring artisans',
        'Active sewing training centers operating in Mariamabad-Sheikhpura',
        'Immediate increase in household income and child school enrollment',
      ],
      stats: [
        { label: 'Location', value: 'Mariamabad-Sheikhpura' },
        { label: 'Core Focus', value: 'Tailoring & Sewing' },
        { label: 'Impact', value: 'Economic Autonomy' },
      ],
    },
    {
      title: 'Climate Change Awareness & Tree Plantation',
      slug: 'climate-change-environmental-action',
      shortDescription:
        'Planting 500+ trees and leading environmental education conventions in schools across Punjab to combat environmental degradation.',
      description:
        'Pakistan faces some of the world most severe climate vulnerabilities. Led by Professor Saima and field coordinators, RISE International conducts community climate conventions and hands-on environmental workshops in schools. Through direct youth action, more than 500 trees have been planted across rural compounds and educational campuses, instilling lifelong ecological stewardship.',
      image: '/images/wordpress/WhatsApp-Image-2024-10-22-at-16.12.54_e3b77bd6.jpg',
      icon: 'park',
      category: 'community-development',
      status: 'published',
      sortOrder: 3,
      mission: 'Mobilize youth and communities for environmental resilience through tree planting, climate awareness, and sustainable habitat preservation.',
      whatWeDo: [
        'Host climate awareness seminars and interactive workshops in local schools',
        'Plant shade, fruit, and indigenous tree varieties across community spaces',
        'Educate students on air pollution, clean water preservation, and waste reduction',
        'Train youth climate ambassadors to care for planted saplings',
      ],
      impactPoints: [
        '500+ healthy trees planted and nurtured across community areas',
        'Major climate convention hosted at Light Education School System',
        'Hundreds of students actively engaged as local environmental stewards',
      ],
      stats: [
        { label: 'Trees Planted', value: '500+' },
        { label: 'Lead Educator', value: 'Prof. Saima' },
        { label: 'Target', value: 'Schools & Communities' },
      ],
    },
    {
      title: 'Annual Christmas Care & Community Relief',
      slug: 'annual-christmas-care-program',
      shortDescription:
        'Delivering over 500 comprehensive care and ration packages annually, reaching more than 2,500 vulnerable individuals across marginalized settlements.',
      description:
        'Every winter, the Annual Christmas Care and Relief Program brings joy, dignity, and critical winter nourishment to marginalized households. RISE International distributes comprehensive care packages consisting of essential dry rations (flour, rice, oil, pulses), warm winter clothing, hygiene kits, and children gift hampers across Youhanabad, rural settlements, and brick kiln communities.',
      image: '/images/wordpress/1.21.jpg',
      icon: 'volunteer_activism',
      category: 'humanitarian-aid',
      status: 'published',
      sortOrder: 4,
      mission: 'Deliver dignified seasonal relief, warm clothing, and essential nutrition to impoverished families, ensuring no child or family is forgotten.',
      whatWeDo: [
        'Procure and assemble bulk food rations and family winter survival kits',
        'Distribute warm winter clothing, sweaters, and blankets to children and elders',
        'Host festive holiday meals and children musical performances',
        'Provide emergency relief supplies to struggling families during winter hardships',
      ],
      impactPoints: [
        'Over 500 family care packages distributed each year',
        'More than 2,500 individuals supported with nutrition and warmth annually',
        'Festive performances and children celebrations hosted in Youhanabad',
      ],
      stats: [
        { label: 'Families Reached', value: '500+ Annually' },
        { label: 'Individuals', value: '2,500+' },
        { label: 'Region', value: 'Lahore & Punjab' },
      ],
    },
    {
      title: 'Interfaith Harmony & Peaceful Coexistence',
      slug: 'interfaith-harmony-peace',
      shortDescription:
        'Convening religious scholars, community leaders, and youth across faiths to build mutual respect, protect minority rights, and foster social harmony.',
      description:
        'True community empowerment requires peace, mutual respect, and social solidarity. RISE International actively convenes landmark Interfaith Harmony & Peace assemblies—such as the annual Tolerance Day event on 16 November at Qubra Masjid in Samnabad, Lahore, and St. John Catholic Church in Youhanabad. Bringing together Muslim, Christian, and Hindu scholars alongside civic leaders, RISE fosters enduring friendships and mutual protection.',
      image: '/images/wordpress/1.23.jpg',
      icon: 'handshake',
      category: 'community-development',
      status: 'published',
      sortOrder: 5,
      mission: 'Strengthen social fabric and peaceful coexistence by creating dialogue platforms that unite leaders of all faiths in collaborative service.',
      whatWeDo: [
        'Organize annual Tolerance Day interfaith conferences and peaceful assemblies',
        'Facilitate joint dialogue sessions between mosque, church, and temple leaders',
        'Advocate for minority rights, social inclusion, and legal safeguards',
        'Promote youth leadership workshops centered on empathy and anti-discrimination',
      ],
      impactPoints: [
        'Historic interfaith tolerance assembly convened at Qubra Masjid, Lahore',
        'Cross-faith council of Muslim and Christian leaders collaborating regularly',
        'Community cohesion and shared festival celebrations successfully held',
      ],
      stats: [
        { label: 'Assembly Day', value: '16 November' },
        { label: 'Key Venues', value: 'Qubra Masjid & St. John' },
        { label: 'Focus', value: 'Tolerance & Solidarity' },
      ],
    },
  ]);
  console.log('[Seed] 5 authentic programmes seeded.');

  console.log('[Seed] Synchronizing Impact Statistics...');
  await ImpactStat.deleteMany({});
  await ImpactStat.create([
    {
      label: 'Trees Planted',
      value: '500+',
      numericValue: 500,
      suffix: '+',
      description: 'Planted across educational campuses and community spaces under the climate initiative led by Prof. Saima.',
      icon: 'park',
      colour: '#15803D',
      sortOrder: 1,
      isVisible: true,
    },
    {
      label: 'Annual Relief Beneficiaries',
      value: '2,500+',
      numericValue: 2500,
      suffix: '+',
      description: 'Vulnerable individuals reached with winter rations, warm apparel, and emergency relief kits across Punjab.',
      icon: 'volunteer_activism',
      colour: '#E11D48',
      sortOrder: 2,
      isVisible: true,
    },
    {
      label: 'Care Packages Delivered',
      value: '500+',
      numericValue: 500,
      suffix: '+',
      description: 'Comprehensive family food packages and relief supplies distributed during winter outreach initiatives.',
      icon: 'inventory_2',
      colour: '#D97706',
      sortOrder: 3,
      isVisible: true,
    },
    {
      label: 'St. Louis IT Hub Launch Target',
      value: '2026',
      numericValue: 2026,
      suffix: '',
      description: 'Scheduled completion date for the flagship rural Higher Information Technology Institute campus.',
      icon: 'computer',
      colour: '#0B2145',
      sortOrder: 4,
      isVisible: true,
    },
    {
      label: 'Grassroots Accountability',
      value: '100%',
      numericValue: 100,
      suffix: '%',
      description: 'Community-driven priority setting and transparent stewardship of all donated resources.',
      icon: 'verified',
      colour: '#047857',
      sortOrder: 5,
      isVisible: true,
    },
  ]);
  console.log('[Seed] 5 authentic impact statistics seeded.');

  console.log('[Seed] Synchronizing Authentic Team Members...');
  await TeamMember.deleteMany({});
  await TeamMember.create([
    {
      name: 'Ishfaq Chaman',
      position: 'Founder, President & Visionary',
      bio: 'Extensive background in international humanitarian service including Italian Red Cross (Croce Rossa Italiana) collaboration. Founded RISE International to address pressing societal challenges and expand human potential through education, technology, and collective community action.',
      photo: '/images/wordpress/Untitled-design-28.png',
      email: 'ishfaq.chaman@riseintl.org',
      department: 'Executive Directorate',
      sortOrder: 1,
      isVisible: true,
    },
    {
      name: 'Saima Samuel',
      position: 'Executive Director',
      bio: 'Dedicated educator, trainer, and motivational community leader. Leads frontline educational curriculum, women empowerment initiatives, and youth development across Punjab.',
      photo: '/images/wordpress/Saima-profile.jpeg',
      department: 'Executive Directorate & Education',
      sortOrder: 2,
      isVisible: true,
    },
    {
      name: 'Noel Patras',
      position: 'Chief Advancement & Technology Officer',
      bio: 'Driving digital modernization, strategic institutional partnerships, and technological architecture to create lasting, scalable social impact.',
      photo: '/images/wordpress/Noel-patras.jpg',
      department: 'Strategic Technology & Systems',
      sortOrder: 3,
      isVisible: true,
    },
    {
      name: 'Akhiz Mehmood',
      position: 'Community Leadership Specialist',
      bio: 'Coordinating grassroots community mobilization, field outreach, and stakeholder engagement in rural and urban communities.',
      photo: '/images/wordpress/Akhiz-mehmood.jpg',
      department: 'Field Operations & Mobilization',
      sortOrder: 4,
      isVisible: true,
    },
    {
      name: 'Shahbaz Munawer',
      position: 'Community Outreach Director',
      bio: 'Specializing in community peace assemblies, interfaith dialogue, and local relationship management across diverse neighborhoods.',
      photo: '/images/wordpress/Shahbaz-Munawer.jpg',
      department: 'Community Engagement & Interfaith Affairs',
      sortOrder: 5,
      isVisible: true,
    },
    {
      name: 'Junaid Gabriel',
      position: 'VP and Secretary Finance',
      bio: 'Ensuring transparent fiscal management, institutional audit compliance, and accountable stewardship of donor funds.',
      photo: '/images/wordpress/team-riseintl.jpg',
      department: 'Financial Governance & Compliance',
      sortOrder: 6,
      isVisible: true,
    },
  ]);
  console.log('[Seed] 6 authentic team members seeded.');

  console.log('[Seed] Synchronizing Authentic Partners...');
  await Partner.deleteMany({});
  await Partner.create([
    {
      name: 'Shirkat Gah Women Resource Centre',
      category: 'Women Empowerment & Rights',
      logo: '/images/wordpress/logo.png',
      website: 'https://shirkatgah.org',
      description: 'Pioneering women rights organization collaborating on grassroots community empowerment.',
      sortOrder: 1,
      isVisible: true,
    },
    {
      name: 'Overflowing Mercy Foundation',
      category: 'Humanitarian Care & Relief',
      logo: '/images/wordpress/om-logo.png',
      website: 'https://overflowingmercy.org',
      description: 'Strategic charitable foundation partnering on winter relief and child sponsorship.',
      sortOrder: 2,
      isVisible: true,
    },
    {
      name: 'Light Education School System',
      category: 'Educational Institutions',
      logo: '/images/logo/rise-logo.png',
      description: 'Host educational campus for health seminars, climate conventions, and youth development.',
      sortOrder: 3,
      isVisible: true,
    },
    {
      name: 'Lahore Interfaith Peace Alliance',
      category: 'Interfaith Councils',
      logo: '/images/logo/rise-logo.png',
      description: 'Coalition of mosque, church, and community leaders fostering peaceful coexistence.',
      sortOrder: 4,
      isVisible: true,
    },
  ]);
  console.log('[Seed] 4 authentic partners seeded.');

  console.log('[Seed] Synchronizing Authentic News & Articles...');
  await NewsArticle.deleteMany({});
  await NewsArticle.create([
    {
      title: 'What does God say about supporting each other?',
      slug: 'what-does-god-say-about-supporting-each-other',
      excerpt:
        'Embracing the Spirit of Generosity and Biblical Wisdom on Giving. In a world when financial demands can distort judgment, generosity creates a circle of reciprocal blessings.',
      content: [
        'In a world when financial demands and personal issues can distort our judgment, it is critical to recognize the significant influence that giving can have. The scriptures provide timeless advice on the issue of giving, reminding us that our approach to generosity may significantly enhance our lives and the lives of others.',
        'Sowing Generously, A Harvest of Blessings — 2 Corinthians 9:6-7 states: "Remember this: Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously. Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."',
        'This emphasizes the notion of reciprocity in offering. Just as a farmer who sows a big quantity of seed anticipates a huge harvest, individuals who give liberally will reap copious rewards—in spiritual progress, personal fulfillment, and community peace. Giving should be a celebration of generosity, not an onerous duty.',
        'The Rewards of Generosity — Proverbs 11:25 provides another layer of insight: "A generous person will prosper; whoever refreshes others will be refreshed." By refreshing others, whether via financial assistance, acts of kindness, or encouragement, we bring a refreshing experience back into our own lives.',
        'The Heart of Giving — Matthew 6:3-4 provides guidance on the nature of our giving: "But when you give to the needy, do not let your left hand know what your right hand is doing, so that your giving may be in secret." True generosity is not about gaining fame or accolades, but about making a constructive difference with a modest attitude.',
        'Incorporating these truths into our daily lives entails cultivating purposeful generosity. Whether donating to support rural schooling or aiding a neighbor in need, we contribute joyfully and with humility.',
      ],
      featuredImage: '/images/wordpress/bosa-charity-img1.jpg',
      category: 'Faith & Community',
      author: 'riseintl.org',
      publishedAt: new Date('2024-08-29'),
      status: 'published',
      featured: true,
      tags: ['Giving', 'Faith', 'Biblical Wisdom', 'Community'],
    },
    {
      title: 'AIDS and Health Awareness Seminar by Professor Dr. Gill',
      slug: 'aids-and-health-awareness-by-professor-dr-gill',
      excerpt:
        'Mr. Samuel Gill delivered an impactful seminar at Light Education School System on health awareness, preventive care, and community disease prevention.',
      content: [
        'RISE International hosted an enlightening health awareness seminar featuring respected advocate Professor Dr. Samuel Gill at Light Education School System.',
        'The seminar provided crucial educational insights into community health protection, preventive measures, hygiene practices, and breaking social stigmas surrounding health conditions.',
        'Key topics covered: understanding disease prevention and community impacts, latest public health protocols, and essential daily health tips for youth and parents.',
        'RISE International continues to prioritize community wellness alongside formal classroom education, empowering local families with life-saving knowledge.',
      ],
      featuredImage: '/images/wordpress/bosa-charity-img11.jpg',
      category: 'Health & Awareness',
      author: 'RISE Health Directorate',
      publishedAt: new Date('2024-09-15'),
      status: 'published',
      featured: true,
      tags: ['Healthcare', 'Awareness', 'Seminars'],
    },
    {
      title: 'Climate Change Awareness Convention by Professor Saima',
      slug: 'climate-change-awareness-by-professor-saima',
      excerpt:
        'Leading educator and environmental expert Professor Saima addressed students and teachers at Light Education School System on urgent ecological preservation.',
      content: [
        'RISE International organized a community environmental convention with Professor Saima focusing on local climate resilience and practical tree plantation strategies.',
        'Attendees engaged in hands-on workshops covering environmental degradation, heat wave protection in Punjab, and water preservation techniques.',
        'Following the seminar, participants pledged ongoing stewardship for the 500+ trees planted across local community sites and schools.',
        'Empowering students to take direct ownership of their natural surroundings remains a pillar of RISE International environmental agenda.',
      ],
      featuredImage: '/images/wordpress/WhatsApp-Image-2024-10-22-at-16.12.54_e3b77bd6.jpg',
      category: 'Environmental Action',
      author: 'Environmental Stewardship Team',
      publishedAt: new Date('2024-10-10'),
      status: 'published',
      featured: false,
      tags: ['Environment', 'Tree Plantation', 'Climate Action'],
    },
    {
      title: 'Tolerance Day Assembly: Interfaith Harmony & Peace at Qubra Masjid',
      slug: 'interfaith-harmony-peace-2024',
      excerpt:
        'On 16 November (International Day for Tolerance), Muslim, Christian, and civil leaders gathered at Qubra Masjid in Samnabad, Lahore to champion mutual solidarity.',
      content: [
        'In commemoration of International Day for Tolerance on 16 November, RISE International brought together faith leaders, community elders, and youth at Qubra Masjid, Samnabad, Lahore.',
        'Under the theme "Interfaith Harmony & Peace", scholars prayed together, shared messages of unity, and planted an olive sapling as a living symbol of peace and mutual protection.',
        'Community leaders commended RISE International tireless dedication to building bridges across diverse religious traditions in Pakistan.',
        'The assembly concluded with a joint declaration affirming that love, respect, and mutual brotherhood are the bedrock of a thriving, secure nation.',
      ],
      featuredImage: '/images/wordpress/rise-team.jpg',
      category: 'Interfaith Harmony',
      author: 'Ishfaq Chaman & Outreach Team',
      publishedAt: new Date('2024-11-16'),
      status: 'published',
      featured: true,
      tags: ['Interfaith', 'Peace', 'Tolerance Day', 'Lahore'],
    },
  ]);
  console.log('[Seed] 4 authentic news & articles seeded.');

  console.log('[Seed] Synchronizing Authentic Stories...');
  await Story.deleteMany({});
  await Story.create([
    {
      title: 'Empowering Rural Women Through Tailoring in Mariamabad-Sheikhpura',
      slug: 'mariamabad-vocational-sewing',
      excerpt:
        'How vocational sewing workshops enable mothers to attain financial independence, support their households, and keep children in school.',
      content: [
        'In rural communities across Mariamabad and Sheikhpura, economic hardship frequently limits opportunities for women and forces young children into premature labor.',
        'RISE International launched dedicated tailoring and embroidery centers equipped with heavy-duty sewing machines, professional sewing kits, and masterclass instruction.',
        'Trainees develop advanced dressmaking and stitching skills, enabling them to produce school uniforms, traditional garments, and artisan crafts for regional markets.',
        'Earning stable income transforms household dynamics—mothers gain self-confidence and provide nutritious meals, while children attend full-time school.',
      ],
      featuredImage: '/images/wordpress/1.jpg',
      category: 'Women Empowerment',
      author: 'Saima Samuel',
      publishedAt: new Date('2024-10-15'),
      status: 'published',
      featured: true,
    },
    {
      title: 'Greening Communities: 500 Trees Planted by Student Stewards',
      slug: 'greening-communities-tree-plantation',
      excerpt:
        'How youth-led environmental conventions and tree-planting drives are combating severe heat waves and environmental degradation in Punjab.',
      content: [
        'With rising temperatures and climate vulnerability impacting Pakistan, local ecological action has never been more urgent.',
        'Following the Climate Change awareness seminar with Professor Saima at Light Education School System, RISE mobilized students and volunteers for community planting campaigns.',
        'Over 500 indigenous trees and flowering saplings were planted in schoolyards, roadside verges, and neighborhood courtyards.',
        'Students formed tree-care clubs to water, protect, and document sapling growth, fostering personal responsibility for their environment.',
      ],
      featuredImage: '/images/wordpress/WhatsApp-Image-2024-10-22-at-16.12.54_e3b77bd6.jpg',
      category: 'Environmental Stewardship',
      author: 'Prof. Saima',
      publishedAt: new Date('2024-10-22'),
      status: 'published',
      featured: true,
    },
    {
      title: 'St. Louis Institute: Bringing Future IT Horizons to Rural Punjab',
      slug: 'st-louis-it-institute-vision',
      excerpt:
        'Constructing a world-class technology institute to equip rural youth with software development, computer literacy, and digital career skills.',
      content: [
        'The digital divide remains one of the largest obstacles preventing rural youth from accessing the high-wage global knowledge economy.',
        'RISE International designed the St. Louis Institute—a dedicated rural tech campus integrating computer laboratories, coding bootcamps, and vocational incubation.',
        'Rural youth will receive structured computer science diplomas, web engineering certifications, and mentorship from international technology leaders.',
        'Access to high-tech education transforms under-served communities into innovative hubs of economic leadership.',
      ],
      featuredImage: '/images/wordpress/Leonardo_Phoenix_A_vibrant_and_dynamic_illustration_of_the_St_3.jpg',
      category: 'Higher Education',
      author: 'Noel Patras',
      publishedAt: new Date('2024-09-20'),
      status: 'published',
      featured: true,
    },
    {
      title: 'Winter Joy & Nourishment: The Annual Christmas Care Outreach',
      slug: 'annual-christmas-care-outreach',
      excerpt:
        'Bringing over 500 food ration hampers and warm winter clothing to 2,500+ marginalized families during the winter season.',
      content: [
        'Winter in Punjab brings severe damp cold, challenging marginalized families working in informal labor or brick kiln settlements.',
        'Each December, RISE International coordinates its Annual Christmas Care and Relief Program across Youhanabad and rural outposts.',
        'Over 500 comprehensive care packages—packed with wheat flour, cooking oil, warm sweaters, and blankets—were hand-delivered to families in greatest need.',
        'Families expressed profound relief and joy, celebrating the festive season with dignified nutrition and warmth.',
      ],
      featuredImage: '/images/wordpress/1.21.jpg',
      category: 'Humanitarian Relief',
      author: 'Ishfaq Chaman',
      publishedAt: new Date('2024-12-24'),
      status: 'published',
      featured: true,
    },
  ]);
  console.log('[Seed] 4 authentic field stories seeded.');

  console.log('[Seed] Synchronizing Core Pages...');
  await Page.deleteMany({});
  await Page.create([
    {
      title: 'About RISE International',
      slug: 'about',
      content:
        'RiseIntl is a dedicated organization committed to empowering communities through sustainable education and resources. Our mission is to uplift lives and foster self-reliance for a brighter future. RISE is a holistic program designed to transform every aspect of an individual life: personal growth, professional skills, mental well-being, and community engagement.',
      status: 'published',
      seoTitle: 'About Us | RISE International',
      seoDescription: 'Empowering communities through holistic development, education, and resources.',
      featuredImage: '/images/wordpress/bosa-charity-img1.jpg',
    },
    {
      title: 'Founder & President Message',
      slug: 'founder-message',
      content:
        'Throughout my leadership journey, I have served organizations and institutions in strategic and executive roles, gaining extensive experience in organizational development, community empowerment, education, technology, leadership, and sustainable development. These experiences have strengthened my belief that meaningful and lasting change is achieved when vision, compassion, innovation, and collective action come together. Driven by a deep commitment to service, I founded this organization to address pressing societal challenges while creating opportunities for individuals and communities to thrive.',
      status: 'published',
      seoTitle: 'Founder & President Message | Ishfaq Chaman | RISE International',
      seoDescription: 'Message from Ishfaq Chaman, Founder & President of RISE International.',
      featuredImage: '/images/wordpress/Untitled-design-28.png',
    },
    {
      title: 'Our Mission & Vision',
      slug: 'mission-vision',
      content:
        'Our goal at RiseIntl is to empower people via education and sustainable practices, creating resilient communities that can prosper in a world that is constantly changing. We believe every person has God-given potential that can be translated into purposeful action.',
      status: 'published',
      seoTitle: 'Our Mission | RISE International',
      seoDescription: 'Our mission to empower communities through education, self-reliance, and dignity.',
      featuredImage: '/images/wordpress/bosa-charity-img3.jpg',
    },
    {
      title: 'Annual Reports & Impact',
      slug: 'annual-reports',
      content:
        'RISE International is committed to complete transparency and accountability. In 2022-2024, our Annual Christmas Care Programs reached over 2,500 individuals with 500+ essential family hampers. Our climate action campaigns planted 500+ trees. The upcoming St. Louis Institute represents our visionary commitment to opening rural technology horizons by 2026.',
      status: 'published',
      seoTitle: 'Annual Reports & Impact | RISE International',
      seoDescription: 'Audited impact, Christmas relief metrics, and St. Louis Institute development reports.',
      featuredImage: '/images/wordpress/1.21.jpg',
    },
  ]);
  console.log('[Seed] Core pages seeded.');

  console.log('[Seed] Synchronizing 189 Authentic WordPress Media Assets...');
  await MediaAsset.deleteMany({});
  try {
    const manifestPath = path.resolve(process.cwd(), '../src/data/wordpressMediaManifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifestData = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));
      const mediaDocs = manifestData.map((item: any) => {
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

        return {
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
        };
      });

      await MediaAsset.insertMany(mediaDocs);
      console.log(`[Seed] ${mediaDocs.length} authentic media assets registered in MongoDB.`);
    }
  } catch (err: any) {
    console.error('[Seed] Media assets seed error:', err.message);
  }

  console.log('[Seed] Seeding completed successfully!');
  await disconnectDatabase();
}

seedDatabase().catch((err) => {
  console.error('[Seed] Database seeding failed:', err);
  process.exit(1);
});
