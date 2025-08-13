import { ToggleGroupItem } from '@/components/ui/toggle-group';
import { Calendar } from '@/components/ui/calendar';

export type DayT = {
  // value: string;
  // label: string;
  // dayOfWeek: number; // Optional, used for Sunday
  date: Date;
};

// const daysOfWeek: DayT[] = [
//   { value: 'sunday', label: 'Sunday', dayOfWeek: 0 },
//   { value: 'monday', label: 'Monday', dayOfWeek: 1 },
//   { value: 'tuesday', label: 'Tuesday', dayOfWeek: 2 },
//   { value: 'wednesday', label: 'Wednesday', dayOfWeek: 3 },
//   { value: 'thursday', label: 'Thursday', dayOfWeek: 4 },
//   { value: 'friday', label: 'Friday', dayOfWeek: 5 },
//   { value: 'saturday', label: 'Saturday', dayOfWeek: 6 },
// ];

type AvailableDayPickerPropT = {
  clickCallback?: (day: Date) => void;
};

export default function AvailableDayPicker({ clickCallback }: AvailableDayPickerPropT) {
  // const selections = daysOfWeek.map(dayOfWeek => {
  //   return createDaySelection(dayOfWeek, clickCallback);
  // });

  return (
    <div className='flex justify-center'>
      <Calendar
        mode='multiple'
        onDayClick={day => {
          if (clickCallback) {
            clickCallback(day);
          }
        }}
      />
    </div>
  );
}
// export default function AvailableDayPicker({ clickCallback }: AvailableDayPickerPropT) {
//   const selections = daysOfWeek.map(dayOfWeek => {
//     return createDaySelection(dayOfWeek, clickCallback);
//   });

//   return (
//     <div>
//       <ToggleGroup variant='outline' type='multiple' className=' mx-auto'>
//         {selections}
//       </ToggleGroup>
//     </div>
//   );
// }

// function createDaySelection(day: DayT, clickCallback?: (day: DayT) => void) {
//   // const currentNumberOfDay = currentDate.getDay();

//   // Check if the day is in the past compared to the current date

//   return (
//     <ToggleGroupItem
//       onClick={() => clickCallback && clickCallback(day)}
//       key={String(day.label + day.value)}
//       value={day.value}
//       aria-label={`Toggle ${day.value}`}
//       className='p-3'
//       //
//     >
//       <span>{day.label}</span>
//     </ToggleGroupItem>
//   );
// }
