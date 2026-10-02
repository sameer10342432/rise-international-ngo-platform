import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { FaqAccordion } from '../../components/common/FaqAccordion';
import { ContactMessage, SubmissionStatus } from '../../types';
import { contactService } from '../../services/contactService';
import { organizationInfo } from '../../data/organization';
import { FormField } from '../../components/forms/FormField';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { Textarea } from '../../components/forms/Textarea';
import { SubmitButton } from '../../components/forms/SubmitButton';
import { validators, validateField } from '../../utils/validation';

const contactFaqs = [
  {
    question: "How can I contact RISE International?",
    answer: "You can reach us by email at info@riseintl.org, by telephone at +49 1520-6777889, or by submitting an inquiry via our contact form.",
  },
  {
    question: "When can I expect a response to my inquiry?",
    answer: "Our team typically reviews and responds to general inquiries within 2 to 3 business days.",
  },
  {
    question: "Who should I contact regarding partnership proposals?",
    answer: "You can submit your proposal via our contact form under 'Partnership Inquiries' or visit our Partner With Us page for detailed collaboration areas.",
  },
  {
    question: "How can I update or inquire about my donation?",
    answer: "Please contact info@riseintl.org with your confirmation ID or donor email, and our stewardship team will assist you directly.",
  },
];

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialInquiry = searchParams.get('inquiry') === 'advocacy' ? 'Programme Information' : 'General Enquiry';

  const [formData, setFormData] = useState<ContactMessage>({
    fullName: '',
    email: '',
    phone: '',
    subject: initialInquiry,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);

  const subjectOptions = [
    { value: 'General Enquiry', label: 'General Enquiry' },
    { value: 'Donation', label: 'Donation & Contributions' },
    { value: 'Volunteering', label: 'Volunteering Inquiries' },
    { value: 'Partnership', label: 'Partnership & Collaboration' },
    { value: 'Programme Information', label: 'Programme Information' },
    { value: 'Media', label: 'Media & Communications' },
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string | null> = {
      fullName: validateField(formData.fullName, [validators.required('Full Name')]),
      email: validateField(formData.email, [validators.required('Email'), validators.email()]),
      phone: validateField(formData.phone || '', [validators.phone()]),
      message: validateField(formData.message, [
        validators.required('Message'),
        validators.minLength(10, 'Message'),
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
      const res = await contactService.submitMessage(formData);
      setStatus('success');
      setFeedback(res.message);
    } catch (err) {
      setStatus('error');
      setFeedback(err instanceof Error ? err.message : 'Message failed to send. Please try again.');
    }
  };

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Contact Us | RISE International"
        description="Get in touch with RISE International. Contact us by phone at +49 1520-6777889 or email at info@riseintl.org with questions, partnership inquiries, or volunteer applications."
        canonical="https://riseintl.org/contact"
        ogImage="/images/rise-contact-hero-dialogue.webp"
        breadcrumbs={[
          { name: "Home", item: "https://riseintl.org/" },
          { name: "Contact", item: "https://riseintl.org/contact" },
        ]}
        faqs={contactFaqs}
      />

      {/* Hero Banner */}
      <section className="bg-primary-container text-white py-16 lg:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rise-contact-hero-dialogue.webp"
            alt="RISE International community liaison officer welcoming visitors and community members at an open information desk"
            className="w-full h-full object-cover opacity-25"
            loading="eager"
            width={1344}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/90 to-primary-container/60" />
        </div>
        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "Contact" }]} className="text-white/80 justify-center" />
          </div>
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            OPEN COMMUNICATION
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold mt-2">
            Contact RISE International
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3 leading-relaxed">
            We welcome inquiries regarding our programmes, collaborative partnerships, donations, or volunteering. Please reach out to our team using the details or contact form below.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Info & Response Expectations */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
                DIRECT INQUIRIES
              </span>
              <h2 className="font-headline-xl text-2xl sm:text-3xl font-bold text-primary mt-1">
                Reach Out Directly
              </h2>
              <p className="font-body-md text-on-surface-variant mt-2 leading-relaxed">
                Whether you have a general inquiry or wish to explore a collaboration, we look forward to hearing from you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">call</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-on-surface-variant block">Telephone</span>
                  <a
                    href={`tel:${organizationInfo.phone}`}
                    className="font-headline-sm text-lg font-bold text-primary hover:text-secondary transition-colors"
                  >
                    {organizationInfo.phone}
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">mail</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-on-surface-variant block">Official Email</span>
                  <a
                    href={`mailto:${organizationInfo.email}`}
                    className="font-headline-sm text-lg font-bold text-primary hover:text-secondary transition-colors"
                  >
                    {organizationInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Response Expectation Wording */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <div className="flex items-center gap-2 text-secondary font-bold text-sm mb-2">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
                <span>Response Expectation</span>
              </div>
              <p className="font-body-sm text-on-surface-variant text-sm leading-relaxed">
                Our coordination team typically responds to all inquiries within <strong>2 to 3 business days</strong>. We appreciate your patience and interest in our work.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-10 rounded-3xl border border-outline-variant/30 shadow-level-2">
            {status === 'success' ? (
              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h3 className="font-headline-md text-2xl font-bold text-primary mb-2">Message Sent</h3>
                <p className="font-body-md text-on-surface-variant max-w-md mb-6">{feedback}</p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      subject: 'General Enquiry',
                      message: '',
                    });
                  }}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-label-md font-bold hover:bg-primary/90 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField id="contactFullName" label="Full Name" required error={errors.fullName}>
                    <Input
                      id="contactFullName"
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      error={Boolean(errors.fullName)}
                    />
                  </FormField>

                  <FormField id="contactEmail" label="Email Address" required error={errors.email}>
                    <Input
                      id="contactEmail"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={Boolean(errors.email)}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField id="contactPhone" label="Phone (Optional)" error={errors.phone}>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="+49 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      error={Boolean(errors.phone)}
                    />
                  </FormField>

                  <FormField id="contactSubject" label="Inquiry Subject" required>
                    <Select
                      id="contactSubject"
                      options={subjectOptions}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </FormField>
                </div>

                <FormField
                  id="contactMessage"
                  label="Message"
                  required
                  error={errors.message}
                >
                  <Textarea
                    id="contactMessage"
                    rows={4}
                    required
                    placeholder="Please write your inquiry here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    error={Boolean(errors.message)}
                  />
                </FormField>

                {status === 'error' && (
                  <div role="alert" className="p-3 rounded-xl bg-error-container text-on-error-container text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    <span>{feedback}</span>
                  </div>
                )}

                <div className="pt-2">
                  <SubmitButton
                    loading={status === 'loading'}
                    text="Send Message"
                    className="w-full bg-primary text-white hover:bg-primary/90 shadow-md font-bold py-3.5"
                  />
                </div>

                <p className="text-center font-body-sm text-xs text-on-surface-variant">
                  We respect your privacy. Inquiries are stored securely and never shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contact FAQs */}
      <FaqAccordion
        title="Contact &amp; Communication FAQs"
        subtitle="Helpful answers regarding inquiry channels, partnerships, and response times."
        faqs={contactFaqs}
      />
    </div>
  );
};
