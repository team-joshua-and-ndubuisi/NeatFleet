import React, { useState } from 'react';
import AvailableDayPicker from './AvailableDayPicker';
import AvailableTimePicker from './AvailableTimePicker';
import { Button } from '../ui';
import EditDay from './EditDay';
import { useAuthStore } from '@/features/auth';
import { useUpdateTechAvailability } from '@/features/technicians/hooks/useUpdateTechAvailabilities';
import LoadingIndicator from '../LoadingIndicator';

interface DaySchedule {
  date: Date;
  timeBlocks: string[];
}

export default function TechAvailabilityForm() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const userToken = useAuthStore(state => state.token);
  const userId = useAuthStore(state => state.user.id);

  const {
    mutate: updateAvailability,
    // isSuccess: updateAvailabilitySuccess,
    isPending: updateAvailabilityPending,
  } = useUpdateTechAvailability(userToken);

  const [dayToEdit, setDayToEdit] = useState<Date | null>(null);

  // set the time technician is available
  const handleTimeClick = (timeSlots: string[]) => {
    // console.log('time click', timeSlots);

    //no day selected then update all days
    if (!dayToEdit) {
      setSchedule(prev => {
        const updatedSchedule = prev.map(day => {
          //filter times out of day
          return { ...day, timeBlocks: timeSlots };
        });
        return updatedSchedule;
      });
    }

    setSchedule(prev => {
      const updated = prev.map(day => {
        if (day.date.getTime() === dayToEdit?.getTime()) {
          day.timeBlocks = timeSlots;
          return day;
        }
        return day;
      });
      return updated;
    });
  };

  const handleDayClick = (day: Date) => {
    setSchedule(prev => {
      if (prev.length === 0) {
        return [{ date: day, timeBlocks: [] }];
      }

      // filter by label
      let list = prev.filter(scheduleForDay => scheduleForDay.date.getTime() !== day.getTime());

      //if list is same size then day was not in list, add it
      if (list.length === prev.length) {
        list = [...prev, { date: day, timeBlocks: [] }];
      }

      if (list.length <= 0) setDayToEdit(null);

      return list.sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort by dayOfWeek
    });
  };

  //sets the day to apply changes
  const handleDayToEdit = (day: Date) => {
    setDayToEdit(prev => (prev === day ? null : day));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const scheduledDays = schedule
      .map(day => {
        const isoString = day.date.toISOString().split('T')[0];
        return {
          availableDate: isoString, // Format date as YYYY-MM-DD
          timeBlock: day.timeBlocks,
        };
      })
      .filter(day => day.timeBlock.length > 0);

    //TODO format should be different
    const formatSchedule: { availableDate: string; timeBlock: string }[] = [];

    for (const day of scheduledDays) {
      day.timeBlock.forEach(time => {
        formatSchedule.push({
          availableDate: day.availableDate,
          timeBlock: time,
        });
      });
    }

    console.log('formated', formatSchedule);
    // updateAvailability({ availability: formatSchedule, userId });
  };

  const AvailableTimePickerOptions = getAvailableTimePickerOptions(dayToEdit, schedule);

  return (
    <section className='relative'>
      <form action='' onSubmit={handleSubmit} className=''>
        <section>
          <h2 className='text-4xl'>Set Your Availability</h2>
        </section>
        <section className='border-2 border-gray-200 mb-4 pb-4'>
          <h3 className='font-bold'>Select days available</h3>
          <AvailableDayPicker clickCallback={handleDayClick} />
        </section>
        {/* displays selected days and can togle single selection to edit  */}
        <section className='flex items-center justify-center'>
          <div className='bg-accent p-2 rounded-2xl'>
            <EditDay
              onSelected={handleDayToEdit}
              selections={schedule.map(scheduleForDay => scheduleForDay.date)}
            />
            {schedule.length <= 0 && <div> Pick one or more days above</div>}
            {dayToEdit && <div>Editing: {dayToEdit.toLocaleDateString()} only</div>}
            {!dayToEdit && schedule.length > 0 && <div>Editing: All</div>}
          </div>
        </section>
        <section>
          <h3 className='font-bold'>Select time available</h3>

          <AvailableTimePicker
            editAll={!dayToEdit}
            valueChangeCallback={handleTimeClick}
            selections={AvailableTimePickerOptions}
          />
        </section>
        <section className='mt-4 flex justify-center'>
          <Button className='w-1/4 ' type='submit'>
            Confirm availability
          </Button>
        </section>

        {updateAvailabilityPending ? (
          <section className=' flex justify-center items-center'>
            <div className='absolute h-screen bg-gray-600 w-full opacity-70 top-0 z-50'></div>
            <LoadingIndicator size='lg' />
          </section>
        ) : null}
      </form>
    </section>
  );
}

//set the time selections as selected if day is being edited or return default options
function getAvailableTimePickerOptions(dayToEdit: Date | null, schedule: DaySchedule[]) {
  const options = [
    { option: 'Morning', isSelected: false, value: 'morning' },
    { option: 'Afternoon', isSelected: false, value: 'afternoon' },
    { option: 'Evening', isSelected: false, value: 'evening' },
  ];

  //return default options
  if (!dayToEdit) return options;

  //find schedule for day
  const daySchedule = schedule.find(day => day.date.getTime() === dayToEdit.getTime());

  //no schedule found for day return default options
  if (!daySchedule) return options;

  //update schedule of day found
  const updatedOptions = options.map(option => {
    if (daySchedule.timeBlocks.includes(option.value)) {
      return { ...option, isSelected: true };
    }
    return option;
  });

  return updatedOptions;
}
