import React from 'react';

interface BusinessInfoCardProps {
  title: string;
  lines: string[];
}

const BusinessInfoCard: React.FC<BusinessInfoCardProps> = ({ title, lines }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 sm:p-6 text-center'>
      <h3 className='text-lg sm:text-xl font-semibold mb-3'>{title}</h3>
      {lines.map((line, i) => (
        <p key={i} className='text-muted-foreground'>
          {line}
        </p>
      ))}
    </div>
  );
};

export default BusinessInfoCard;
