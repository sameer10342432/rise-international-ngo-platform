import React from 'react';
import { Programme } from '../../types';
import { programmesData } from '../../data/programmes';
import { ProgrammeCard } from './ProgrammeCard';

interface ProgrammeGridProps {
  programmes?: Programme[];
  limit?: number;
}

export const ProgrammeGrid: React.FC<ProgrammeGridProps> = ({
  programmes = programmesData,
  limit,
}) => {
  const displayedProgrammes = limit ? programmes.slice(0, limit) : programmes;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayedProgrammes.map((programme) => (
        <ProgrammeCard key={programme.id} programme={programme} />
      ))}
    </div>
  );
};
