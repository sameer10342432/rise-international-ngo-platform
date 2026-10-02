import React from 'react';

interface DonationPurposeSelectorProps {
  purpose: string;
  onChange: (val: string) => void;
}

export const donationPurposes = [
  'Where Needed Most',
  'Education',
  'Humanitarian Aid',
  'Community Development',
  'Economic Empowerment',
];

export const DonationPurposeSelector: React.FC<DonationPurposeSelectorProps> = ({
  purpose,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor="donation-purpose" className="block font-label-md text-label-md text-primary mb-2 font-bold">
        Designate Donation Purpose
      </label>
      <div className="relative">
        <select
          id="donation-purpose"
          value={purpose}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-4 pr-10 rounded-xl bg-surface-container-low text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container-high focus:ring-2 focus:ring-secondary/30 transition-all border border-outline-variant/30 appearance-none cursor-pointer"
        >
          {donationPurposes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">
          expand_more
        </span>
      </div>
    </div>
  );
};
