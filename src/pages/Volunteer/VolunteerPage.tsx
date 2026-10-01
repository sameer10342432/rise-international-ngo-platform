import React, { useState } from 'react';
import { SEO } from '../../components/common/SEO';
import { SubmissionStatus, VolunteerApplication } from '../../types';
import { volunteerService } from '../../services/volunteerService';
import { FormField } from '../../components/forms/FormField';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { Textarea } from '../../components/forms/Textarea';
import { SubmitButton } from '../../components/forms/SubmitButton';
import { validators, validateField } from '../../utils/validation';

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
    { value: 'Education', label: 'Education & Literacy' },
    { value: 'Community Development', label: 'Community Development & Infrastructure' },
    { value: 'Humanitarian Aid', label: 'Humanitarian Aid & Health Response' },
    { value: 'Fundraising', label: 'Fundraising & Donor Relations' },
    { value: 'Digital / Marketing', label: 'Digital / Communications / Media' },
    { value: 'Other', label: 'Other Specialization' },
  ];

  const availabilities = [
    { value: 'Occasional', label: 'Occasional (Ad-hoc tasks & events)' },
    { value: 'Part Time', label: 'Part Time (5-10 hours / week)' },
    { value: 'Regular', label: 'Regular (15-20 hours / week)' },
    { value: 'Project Based', label: 'Project Based (Dedicated deployment missions)' },
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string | null> = {
      fullName: validateField(formData.fullName, [validators.required('Full Name')]),
      email: validateField(formData.email, [validators.required('Email'), validators.email()]),
      phone: validateField(formData.phone, [validators.phone()]),
      country: validateField(formData.country, [validators.required('Country')]),
      message: validateField(formData.message, [
        validators.required('Message'),
        validators.minLength(20, 'Message'),
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
      setFeedback(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <SEO
        title="Become a Volunteer | Lend Your Skills | RISE International"
        description="Apply to volunteer with RISE International. Join physicians, engineers, teachers, and digital advocates empowering vulnerable communities."
      />

      <section className="bg-primary-container text-white py-16 lg:py-20 text-center">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            GRASSROOTS MOBILIZATION
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold mt-2">
            Become a RISE Volunteer
          </h1>
          <p className="font-body-lg text-surface-container-high/90 max-w-xl mx-auto mt-3">
            Your skills, dedication, and empathy can change lives. Join our global volunteer network of 1,500+ active changemakers.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 lg:p-12 border border-outline-variant/30 shadow-level-2">
          {status === 'success' ? (
            <div className="text-center py-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[44px]">how_to_reg</span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-primary mb-2">
                Application Received!
              </h2>
              <p className="font-body-lg text-on-surface-variant max-w-md mb-6 leading-relaxed">
                {feedback}
              </p>
              <div className="p-4 rounded-xl bg-surface-container-low max-w-md w-full mb-8 text-sm text-on-surface-variant">
                <div className="flex justify-between py-1 border-b border-outline-variant/30">
                  <span className="font-medium text-primary">Application Reference:</span>
                  <span className="font-mono text-xs text-secondary font-bold">{applicationId}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-primary">Track:</span>
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
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField id="fullName" label="Full Name" required error={errors.fullName}>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    error={Boolean(errors.fullName)}
                  />
                </FormField>

                <FormField id="email" label="Email Address" required error={errors.email}>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="elena@example.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={Boolean(errors.email)}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField id="phone" label="Phone Number (Optional)" error={errors.phone}>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+49 1520-0000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={Boolean(errors.phone)}
                  />
                </FormField>

                <FormField id="country" label="Country of Residence" required error={errors.country}>
                  <Input
                    id="country"
                    type="text"
                    required
                    placeholder="e.g. Germany, Kenya, United States"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    error={Boolean(errors.country)}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField id="areaOfInterest" label="Area of Interest" required>
                  <Select
                    id="areaOfInterest"
                    options={areasOfInterest}
                    value={formData.areaOfInterest}
                    onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                  />
                </FormField>

                <FormField id="availability" label="Availability" required>
                  <Select
                    id="availability"
                    options={availabilities}
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  />
                </FormField>
              </div>

              <FormField
                id="message"
                label="Why do you want to volunteer with RISE? (Min 20 characters)"
                required
                error={errors.message}
                helpText="Share relevant qualifications, language skills, or previous voluntary background."
              >
                <Textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your background, motivations, and what you hope to contribute to our mission..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  error={Boolean(errors.message)}
                />
              </FormField>

              {status === 'error' && (
                <div role="alert" className="p-3.5 rounded-xl bg-error-container/40 text-error text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{feedback}</span>
                </div>
              )}

              <div className="pt-2">
                <SubmitButton
                  isLoading={status === 'loading'}
                  loadingText="Submitting application..."
                  variant="secondary"
                  icon="send"
                  className="w-full"
                >
                  SUBMIT VOLUNTEER APPLICATION
                </SubmitButton>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
