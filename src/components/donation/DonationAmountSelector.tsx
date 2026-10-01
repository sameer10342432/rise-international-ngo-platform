import React from 'react';

interface DonationAmountSelectorProps {
  selectedAmount: number;
  customAmount: string;
  onSelectPredefined: (amt: number) => void;
  onCustomAmountChange: (val: string) => void;
}

export const predefinedAmounts = [
  { amount: 25, impact: 'School books for 3 children' },
  { amount: 50, impact: 'Clean water for a family' },
  { amount: 100, impact: 'Clinic supplies for 20 patients' },
  { amount: 250, impact: 'Community micro-grant' },
];

export const DonationAmountSelector: React.FC<DonationAmountSelectorProps> = ({
  selectedAmount,
  customAmount,
  onSelectPredefined,
  onCustomAmountChange,
}) => {
  const isCustomActive = Boolean(customAmount && Number(customAmount) > 0);

  return (
    <div className="flex flex-col gap-6">
      {/* 4 Amount Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="radiogroup" aria-label="Predefined donation amounts">
        {predefinedAmounts.map((chip) => {
          const isSelected = !isCustomActive && selectedAmount === chip.amount;
          return (
            <button
              key={chip.amount}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectPredefined(chip.amount)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all text-center border ${
                isSelected
                  ? 'bg-secondary/10 border-secondary ring-1 ring-secondary/50 shadow-sm'
                  : 'bg-surface hover:bg-surface-container-low border-outline-variant/40'
              }`}
            >
              <span
                className={`font-stat-metric text-2xl sm:text-headline-md font-bold ${
                  isSelected ? 'text-secondary' : 'text-primary'
                }`}
              >
                ${chip.amount}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-1">
                {chip.impact}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Amount Input */}
      <div>
        <label htmlFor="custom-amount" className="block font-label-md text-label-md text-primary mb-2 font-bold">
          Or Enter a Custom Amount ($ USD)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-headline-sm text-headline-sm text-on-surface-variant select-none" aria-hidden="true">
            $
          </span>
          <input
            id="custom-amount"
            type="number"
            min="1"
            step="1"
            placeholder="Other amount (e.g. 75, 500)"
            value={customAmount}
            onChange={(e) => onCustomAmountChange(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl bg-surface-container-low text-primary font-label-lg text-label-lg focus:outline-none focus:bg-surface-container-high focus:ring-2 focus:ring-secondary/30 transition-all border border-outline-variant/30"
          />
        </div>
      </div>
    </div>
  );
};
