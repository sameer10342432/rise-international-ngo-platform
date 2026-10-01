import React from 'react';
import { Link } from 'react-router-dom';
import { Programme } from '../../types';

interface ProgrammeCardProps {
  programme: Programme;
}

export const ProgrammeCard: React.FC<ProgrammeCardProps> = ({ programme }) => {
  return (
    <div className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-level-1 hover:shadow-level-3 transition-all duration-300 hover:-translate-y-1 border border-outline-variant/30">
      <div className="relative h-56 overflow-hidden bg-surface-container">
        <img
          src={programme.image}
          alt={programme.altText}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-sm">
          {programme.tag}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-bold group-hover:text-secondary transition-colors">
            {programme.title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
            {programme.description}
          </p>
        </div>

        <Link
          to={programme.link}
          className="inline-flex items-center gap-2 text-secondary font-label-md text-label-md group-hover:gap-3 transition-all pt-2 font-bold"
        >
          <span>Learn More</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
};
