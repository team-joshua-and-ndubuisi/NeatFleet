import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface SelectionsI {
  option: string;
  isSelected: boolean;
  value: string;
}

type AvailableTimePickerPropT = {
  selections?: SelectionsI[];
  // range?: { start: Date; end: Date };
  clickCallback?: (time: string) => void;
};

export default function AvailableTimePicker({
  clickCallback,
  selections = [],
}: AvailableTimePickerPropT) {
  //if timeslots provided use them from props
  let timeSelections: JSX.Element[] = [];

  const selectedTimes = selections
    ? selections.filter(slot => slot.isSelected).map(slot => slot.value)
    : undefined;

  // useEffect(() => {
  //   setSelectedTimes(() => selections.filter(slot => slot.isSelected).map(slot => slot.value));
  // }, [selections]);

  //if range provided then create the timeslots for the range
  // if (range) {
  //   const timeSlotsForRange = createTimeSelectionFromRange(range.start, range.end);
  //   timeSelections = timeSlotsForRange.map(time => {
  //     return timeSelectionButton(time, clickCallback);
  //   });
  // }

  timeSelections = selections.map(slot => {
    return (
      <ToggleGroupItem
        onClick={() => {
          if (clickCallback) clickCallback(slot.value);
        }}
        value={slot.value}
        aria-label='Toggle'
        className='border-3'
      >
        <span>{slot.option}</span>
      </ToggleGroupItem>
    );
  });

  // const selectedTimes: string[] = selections
  //   .filter(slot => slot.isSelected)
  //   .map(slot => slot.value);

  console.log('selectedTimes', selectedTimes);

  return (
    <div className=''>
      <ToggleGroup
        variant='outline'
        type='multiple'
        className='columns-3 w-11/12 mx-auto'
        value={selectedTimes.length > 0 ? selectedTimes : undefined}
      >
        {timeSelections}
      </ToggleGroup>
    </div>
  );
}

// //generate the JSX for the date passed in
// function timeSelectionButton(time: string, callback?: (time: string) => void) {
//   return (
//     <ToggleGroup key={time} variant='outline' type='multiple' className='w-full'>
//       <ToggleGroupItem
//         onClick={() => {
//           if (callback) callback(time);
//         }}
//         value={time}
//         aria-label='Toggle'
//       >
//         <span>{time}</span>
//       </ToggleGroupItem>
//     </ToggleGroup>
//   );
// }
