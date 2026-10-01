import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { ContactMessage, SubmissionStatus } from '../../types';
import { contactService } from '../../services/contactService';
import { organizationInfo } from '../../data/organization';
import { FormField } from '../../components/forms/FormField';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { Textarea } from '../../components/forms/Textarea';
import { SubmitButton } from '../../components/forms/SubmitButton';
import { validators, validateField } from '../../utils/validation';

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
    { value: 'Donation', label: 'Donation & Tax Receipts' },
    { value: 'Volunteering', label: 'Volunteering & Deployments' },
    { value: 'Partnership', label: 'Partnership & CSR Grants' },
    { value: 'Programme Information', label: 'Programme Information' },
    { value: 'Media', label: 'Media & Press Inquiries' },
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
    <div className="w-full">
      <SEO
        title="Contact Us | RISE International"
        description="Get in touch with RISE International headquarters. Phone: +49 1520-6777889, Email: info@riseintl.org."
      />

      <section className="bg-primary-container text-white py-16 lg:py-20 text-center">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            GLOBAL COORDINATION
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold mt-2">
            Contact RISE International
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3">
            Have questions regarding our field initiatives, donor receipts, or volunteering? We are here to help.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Details (Strict adherence: NO fake addresses or fake maps) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="font-label-sm text-secondary uppercase tracking-wider font-bold">
                COMMUNICATION DESK
              </span>
              <h2 className="font-headline-xl text-2xl sm:text-3xl font-bold text-primary mt-1">
                Reach Out Directly
              </h2>
              <p className="font-body-md text-on-surface-variant mt-2 leading-relaxed">
                Our administrative coordination and field logistics officers respond to inquiries promptly during international business hours.
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

            <div className="p-6 rounded-2xl bg-primary text-white">
              <span className="font-label-sm text-secondary-fixed font-bold uppercase text-xs">
                Accountability Assurance
              </span>
              <p className="font-body-sm text-surface-container-high/90 text-sm mt-2 leading-relaxed">
                Every official donation receipt and partnership inquiry is certified through our central governance registry.
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
                  className="px-6 py-3 rounded-xl bg-primary text-white font-label-md font-bold"
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
                      placeholder="e.g. Marcus Vance"
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
                      placeholder="marcus@example.com"
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
                      placeholder="+49 1520-0000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      error={Boolean(errors.phone)}
                    />
                  </FormField>

                  <FormField id="contactSubject" label="Subject" required>
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
                    placeholder="How can we assist you or collaborate?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    error={Boolean(errors.message)}
                  />
                </FormField>

                {status === 'error' && (
                  <div role="alert" className="p-3 rounded-xl bg-error-container/40 text-error text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    <span>{feedback}</span>
                  </div>
                )}

                <div className="pt-2">
                  <SubmitButton
                    isLoading={status === 'loading'}
                    loadingText="Sending message..."
                    variant="primary"
                    icon="send"
                    className="w-full"
                  >
                    SEND MESSAGE
                  </SubmitButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
