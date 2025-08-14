import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

export default function EditDay({
  selections,
  onSelected,
}: {
  selections: Date[];
  onSelected?: (day: Date) => void;
}) {
  return (
    <div>
      <ToggleGroup variant='outline' type='single' className=' mx-auto'>
        {selections.map(day => (
          <ToggleGroupItem
            key={String(day.getTime())}
            value={day.toDateString()}
            aria-label={`Toggle ${day.toDateString()}`}
            className='p-3'
            onClick={() => onSelected && onSelected(day)}
          >
            {day.toDateString()}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
