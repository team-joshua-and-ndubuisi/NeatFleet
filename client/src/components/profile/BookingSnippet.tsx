import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { FunctionComponent, PropsWithChildren } from 'react';

const BookingSnippets: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <div className='w-full py-10'>
        <div>
          <Accordion type='single' collapsible>
            <AccordionItem className='py-5' value='item-1'>
              <AccordionTrigger className='bg-stone-300 border-3 border border-black '>
                <h3 className='px-3 text-3xl'>Scheduled Bookings</h3>
              </AccordionTrigger>
              <AccordionContent className='flex flex-col justify-center gap-3'>
                {children}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Accordion type='single' collapsible>
            <AccordionItem className='py-5' value='item-1'>
              <AccordionTrigger className='bg-stone-300 border-3 border border-black'>
                <h3 className='px-3 text-3xl'>Past Bookings</h3>
              </AccordionTrigger>
              <AccordionContent className='flex flex-col justify-center gap-3'>
                {/* Child is map of booking car */}
                {children}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
export default BookingSnippets;
