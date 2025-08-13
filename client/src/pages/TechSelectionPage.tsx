import React from 'react';
import { Link } from 'react-router-dom';

const technicianData = [
  {
    name: 'Andrew',
    id: 'eqrv',
  },
  {
    name: 'Yassah',
    id: 'drtyh5',
  },
  {
    name: 'Max',
    id: '345tyhg',
  },
  {
    name: 'Falilou',
    id: 'vgd64c',
  },
  {
    name: 'Jesus',
    id: 'w4j7i',
  },
  {
    name: 'Justin',
    id: 'drjeo98',
  },
];

interface TechnicianLinkProps {
  name: string;
  url: string;
}

const TechnicianLink: React.FC<TechnicianLinkProps> = ({ name, url }) => {
  return (
    <Link
      className='bg-blue-400 text-white p-4 rounded-md flex items-center justify-center text-center'
      to={`/book-service/booking-tech/${url}`}
    >
      {name}
    </Link>
  );
};

const TechSelectionPage: React.FC = () => {
  return (
    <div className='mt-16 px-8'>
      <h4 className='text-3xl mb-4'>Tech Selection Page</h4>
      <div className='grid grid-cols-3 grid-rows-2 gap-4 max-w-4xl'>
        {technicianData.map(technician => (
          <TechnicianLink key={technician.id} name={technician.name} url={technician.id} />
        ))}
      </div>
    </div>
  );
};

export default TechSelectionPage;
