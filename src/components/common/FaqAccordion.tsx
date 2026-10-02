import React, { useState } from 'react';

export interface FAQ {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQ[];
  items?: FAQ[];
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  title = "Frequently Asked Questions",
  subtitle = "Find factual, transparent answers to common inquiries about our organisation and work.",
  faqs,
  items,
  className = "",
}) => {
  const faqList = faqs || items || [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className={`w-full py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
            QUESTIONS &amp; ANSWERS
          </span>
          <h2 className="font-headline-xl text-3xl sm:text-headline-xl text-primary font-bold mt-2">
            {title}
          </h2>
          {subtitle && (
            <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {faqList.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-headline-sm text-lg font-bold text-primary hover:text-secondary transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`material-symbols-outlined text-[24px] text-on-surface-variant transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-secondary' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-on-surface-variant font-body-md leading-relaxed border-t border-outline-variant/10">
                    <p className="mt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
