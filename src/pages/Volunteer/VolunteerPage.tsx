import React, { useState } from 'react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import { SubmissionStatus, VolunteerApplication } from '../../types';
import { volunteerService } from '../../services/volunteerService';
import { FormField } from '../../components/forms/FormField';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { Textarea } from '../../components/forms/Textarea';
import { SubmitButton } from '../../components/forms/SubmitButton';
import { validators, validateField } from '../../utils/validation';

const volunteerFaqs = [
  {
    question: "Who is eligible to volunteer with RISE International?",
    answer: "We welcome individuals from diverse professional, academic, and community backgrounds who share a commitment to human dignity, mutual respect, and ethical collaboration.",
  },
  {
    question: "Are volunteer placements guaranteed upon application?",
    answer: "No. Volunteer placements depend on current community-identified needs, local project schedules, and applicant skill alignment. We do not guarantee placements for all applicants.",
  },
  {
    question: "Can I volunteer remotely?",
    answer: "Yes. Many of our volunteer contributors support research, curriculum development, digital communications, and translation remotely from their home locations.",
  },
  {
    question: "What is the typical time commitment for volunteers?",
    answer: "Time commitments vary widely based on the role, ranging from occasional project tasks (2-4 hours weekly) to structured project-based engagements.",
  },
  {
    question: "What preparation is provided before beginning?",
    answer: "All accepted volunteers participate in an orientation covering our humanitarian principles, safeguarding policies, and community-led collaboration guidelines.",
  },
];

export const VolunteerPage: React.FC = () => {
  const [formData, setFormData] = useState<VolunteerApplication>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    areaOfInterest: 'Education',
    availability: 'Regular',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const areasOfInterest = [
    { value: 'Education', label: 'Education & Learning Support' },
    { value: 'Community Development', label: 'Community Development & Infrastructure' },
    { value: 'Humanitarian Aid', label: 'Humanitarian Aid & Relief Coordination' },
    { value: 'Economic Empowerment', label: 'Economic Empowerment & Skills Training' },
    { value: 'Digital / Communications', label: 'Digital, Communications & Translation' },
    { value: 'Other', label: 'Other Skills & Specializations' },
  ];

  const availabilities = [
    { value: 'Occasional', label: 'Occasional (Ad-hoc tasks & events)' },
    { value: 'Part Time', label: 'Part Time (5-10 hours / week)' },
    { value: 'Regular', label: 'Regular (15-20 hours / week)' },
    { value: 'Project Based', label: 'Project Based (Specific task initiatives)' },
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string | null> = {
      fullName: validateField(formData.fullName, [validators.required('Full Name')]),
      email: validateField(formData.email, [validators.required('Email'), validators.email()]),
      phone: validateField(formData.phone, [validators.phone()]),
      country: validateField(formData.country, [validators.required('Country')]),
      message: validateField(formData.message, [
        validators.required('Statement of Interest'),
        validators.minLength(20, 'Statement of Interest'),
      ]),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err !== null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setFeedback(null);

    try {
      const res = await volunteerService.submitApplication(formData);
      setStatus('success');
      setApplicationId(res.applicationId);
      setFeedback(res.message);
    } catch (err) {
      setStatus('error');
      setFeedback(err instanceof Error ? err.message : 'Application submission failed. Please try again.');
    }
  };

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Volunteer Opportunities | International Nonprofit Volunteering | RISE International"
        description="Explore volunteer opportunities with RISE International. Lend your skills to community volunteering, education, and sustainable development initiatives worldwide."
        canonical="https://riseintl.org/volunteer"
        ogImage="/images/rise-volunteer-hero-collaboration.webp"
        breadcrumbs={[
          { name: "Home", item: "https://riseintl.org/" },
          { name: "Volunteer", item: "https://riseintl.org/volunteer" },
        ]}
        faqs={volunteerFaqs}
      />

      {/* Hero Banner */}
      <section className="bg-primary-container text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rise-volunteer-hero-collaboration.webp"
            alt="Diverse group of international volunteers and local community leaders working together to paint and equip an educational center"
            className="w-full h-full object-cover object-center opacity-25"
            loading="eager"
            width={1344}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/90 to-primary-container/60" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12 text-center">
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "Volunteer" }]} className="text-white/80 justify-center" />
          </div>
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            COMMUNITY COLLABORATION
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold mt-2">
            Volunteer With RISE International
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3 leading-relaxed">
            Contribute your time, expertise, and perspective to support community-led initiatives in education, sustainable development, and humanitarian assistance.
          </p>
          <div className="mt-6">
            <a
              href="#application-form"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-secondary text-white font-label-md font-bold shadow-md hover:bg-secondary/90 transition-all"
            >
              <span>Apply to Volunteer</span>
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
            </a>
          </div>
        </div>
      </section>

      {/* 1. Why Volunteer */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
              PURPOSE &amp; SOLIDARITY
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-primary font-bold">
              Why Volunteer With Us
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Volunteering with RISE International is rooted in collaboration and mutual respect. Rather than assuming a top-down role, volunteers work in close partnership with local teams, listening to community priorities and contributing specialized support where requested.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Whether you are an educator, technical specialist, student, or community organizer, your engagement directly supports initiatives designed and sustained by local residents.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-level-2 border border-outline-variant/30">
              <img
                src="/images/volunteer-school-building-teamwork.jpg"
                alt="Volunteers and local residents working side by side in mutual solidarity"
                className="w-full h-[380px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ways to Help & 3. Who Can Volunteer */}
      <section className="w-full bg-surface-container-low py-20 border-y border-outline-variant/30">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
                AREAS OF PARTICIPATION
              </span>
              <h2 className="font-headline-xl text-3xl text-primary font-bold mt-2 mb-6">
                Ways to Help
              </h2>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
                  <h3 className="font-headline-sm text-lg font-bold text-primary mb-1">Education &amp; Mentorship</h3>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Assist with learning resource preparation, digital literacy curricula, or remote tutoring support for youth programs.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
                  <h3 className="font-headline-sm text-lg font-bold text-primary mb-1">Technical &amp; Sustainable Infrastructure</h3>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Collaborate with field engineers on solar water system planning, mapping, and technical training materials.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
                  <h3 className="font-headline-sm text-lg font-bold text-primary mb-1">Communications &amp; Storytelling</h3>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Support community dispatch editing, translation, graphic design, and ethical documentation.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
                  <h3 className="font-headline-sm text-lg font-bold text-primary mb-1">Community Outreach &amp; Awareness</h3>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Organize local awareness events, book drives, or informational sessions in your home community.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
                OPEN ENGAGEMENT
              </span>
              <h2 className="font-headline-xl text-3xl text-primary font-bold mt-2 mb-6">
                Who Can Volunteer
              </h2>
              <p className="font-body-lg text-on-surface-variant mb-6 leading-relaxed">
                We believe that passion, humility, and willingness to learn are just as essential as formal qualifications.
              </p>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
                  <h3 className="font-headline-sm text-lg font-bold text-primary mb-1">Professionals &amp; Practitioners</h3>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Educators, engineers, healthcare professionals, and legal advisors lending specific technical expertise.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
                  <h3 className="font-headline-sm text-lg font-bold text-primary mb-1">Students &amp; Early Career</h3>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Motivated learners eager to gain hands-on perspective in international development and nonprofit operations.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
                  <h3 className="font-headline-sm text-lg font-bold text-primary mb-1">Community Advocates</h3>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Individuals who want to mobilize their local circles to support global equity and dignified community partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What to Expect */}
      <section className="max-w-content mx-auto px-6 lg:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
            TRANSPARENT PROCESS
          </span>
          <h2 className="font-headline-xl text-3xl sm:text-4xl text-primary font-bold mt-2">
            What to Expect
          </h2>
          <p className="font-body-md text-on-surface-variant mt-2">
            We prioritize transparent communication and thoughtful matching rather than automated placements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <span className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-lg mb-4">
              1
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">Application Review</h3>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              Our team reviews your experience, availability, and areas of interest against current project needs. Placements are based on community demand and are not guaranteed.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <span className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-lg mb-4">
              2
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">Dialogue &amp; Matching</h3>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              If an aligned opportunity exists, we schedule a discussion to align expectations, schedules, and specific collaborative tasks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <span className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-lg mb-4">
              3
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">Orientation &amp; Values</h3>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              Volunteers receive onboarding on our safeguarding standards, cultural sensitivity principles, and ethical documentation guidelines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <span className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-lg mb-4">
              4
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">Engaged Action</h3>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              You collaborate alongside coordinators and fellow volunteers, contributing meaningfully to locally led programs.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Volunteer Application Form */}
      <section id="application-form" className="w-full bg-surface-container-low py-20 border-y border-outline-variant/30">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 lg:p-12 border border-outline-variant/30 shadow-level-2">
            <div className="mb-8">
              <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
                PARTICIPATE
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-primary mt-1">
                Volunteer Application
              </h2>
              <p className="font-body-md text-on-surface-variant mt-2">
                Please complete the form below. Placements are determined by community needs and are not guaranteed.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[44px]">how_to_reg</span>
                </div>
                <h3 className="font-headline-lg text-2xl font-bold text-primary mb-2">
                  Application Received
                </h3>
                <p className="font-body-lg text-on-surface-variant max-w-md mb-6 leading-relaxed">
                  {feedback}
                </p>
                <div className="p-4 rounded-xl bg-surface-container-low max-w-md w-full mb-8 text-sm text-on-surface-variant">
                  <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                    <span className="font-medium text-primary">Application ID:</span>
                    <span className="font-mono text-xs text-secondary font-bold">{applicationId}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="font-medium text-primary">Selected Focus:</span>
                    <span className="font-bold text-secondary">{formData.areaOfInterest}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      country: '',
                      areaOfInterest: 'Education',
                      availability: 'Regular',
                      message: '',
                    });
                  }}
                  className="px-8 py-3.5 rounded-xl bg-primary text-white font-label-md font-bold hover:bg-primary/90 transition-all"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <FormField label="Full Name" required error={errors.fullName}>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Maya Chen"
                    error={Boolean(errors.fullName)}
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Email Address" required error={errors.email}>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      error={Boolean(errors.email)}
                    />
                  </FormField>

                  <FormField label="Phone Number (optional)" error={errors.phone}>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+49 ..."
                      error={Boolean(errors.phone)}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Country of Residence" required error={errors.country}>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Germany"
                      error={Boolean(errors.country)}
                    />
                  </FormField>

                  <FormField label="Area of Interest" required>
                    <Select
                      name="areaOfInterest"
                      value={formData.areaOfInterest}
                      onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                      options={areasOfInterest}
                    />
                  </FormField>
                </div>

                <FormField label="Availability" required>
                  <Select
                    name="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    options={availabilities}
                  />
                </FormField>

                <FormField
                  label="Statement of Interest & Relevant Experience"
                  required
                  error={errors.message}
                >
                  <Textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your background, skills, and why you are interested in volunteering with RISE International..."
                    error={Boolean(errors.message)}
                  />
                </FormField>

                {feedback && status === 'error' && (
                  <div className="p-4 rounded-xl bg-error-container text-on-error-container text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">error</span>
                    <span>{feedback}</span>
                  </div>
                )}

                <div className="pt-2">
                  <SubmitButton
                    loading={status === 'loading'}
                    text="Apply to Volunteer"
                    className="w-full bg-secondary text-white hover:bg-secondary/90 shadow-md font-bold py-3.5"
                  />
                </div>

                <p className="text-center font-body-sm text-xs text-on-surface-variant">
                  We respect your privacy. Volunteer details are held confidentially and accessed strictly for application evaluation.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 6. Volunteer FAQs */}
      <FaqAccordion
        title="Volunteer FAQs"
        subtitle="Common questions about volunteer eligibility, expectations, and matching."
        faqs={volunteerFaqs}
      />
    </div>
  );
};
