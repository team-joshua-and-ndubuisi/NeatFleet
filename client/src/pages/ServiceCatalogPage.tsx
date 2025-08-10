import { BookServiceForm } from '@/features/bookService';
import React from 'react';

const ServiceCatalogPage: React.FC = () => {
  return (
    <div className='mt-16 mb-16 px-8'>
      <BookServiceForm />
    </div>
  );
};

export default ServiceCatalogPage;
