import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const BookingAccordion = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className='w-full'>
      <div>
        <Accordion type='single' collapsible>
          <AccordionItem className='' value='item-1'>
            <AccordionTrigger className='bg-primary-50 border rounded-lg shadow-md p-5'>
              <h3 className='text-3xl font-light'>{title}</h3>
            </AccordionTrigger>
            <AccordionContent className='flex flex-col justify-center gap-3'>
              {children}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
export default BookingAccordion;
