export type AdminRole = 'super_admin' | 'admin' | 'editor';

export interface AdminPayload {
  id: string;
  email: string;
  role: AdminRole;
  name: string;
}

export type ProgrammeCategory =
  | 'education'
  | 'community-development'
  | 'humanitarian-aid'
  | 'economic-empowerment';

export type PublicationStatus = 'draft' | 'published';

export type DonationFrequencyType = 'one_time' | 'monthly';

export type DonationPurposeType =
  | 'where_needed'
  | 'education'
  | 'humanitarian_aid'
  | 'community_development'
  | 'economic_empowerment';

export type DonationStatusType =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export type VolunteerStatusType =
  | 'new'
  | 'reviewing'
  | 'accepted'
  | 'rejected'
  | 'contacted';

export type ContactStatusType = 'new' | 'in_progress' | 'resolved' | 'spam';

export type NewsletterStatusType = 'active' | 'unsubscribed';
