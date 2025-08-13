import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface SelectionsI {
  option: string;
  isSelected: boolean;
  value: string;
}

type AvailableTimePickerPropT = {
  selections?: SelectionsI[]; //options user can select
  clickCallback?: (time: string) => void;
  editAll?: boolean;
};

export default function AvailableTimePicker({
  clickCallback,
  selections = [],
  editAll,
}: AvailableTimePickerPropT) {
  //ui buttons for user to select time slots
  let timeSelections: JSX.Element[] = [];

  //filter by seleted items then return string array of the values to set as seleted in ui
  const filteredSelections = selections.filter(slot => slot.isSelected);

  //set up selected options by getting values for component to use
  const selectedTimes =
    filteredSelections.length > 0
      ? filteredSelections.map(slot => slot.value)
      : editAll
        ? undefined
        : [];

  timeSelections = selections.map(slot => {
    return (
      <ToggleGroupItem
        key={slot.value}
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

  return (
    <div className=''>
      <ToggleGroup
        variant='outline'
        type='multiple'
        className='columns-3 w-11/12 mx-auto'
        value={selectedTimes}
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
