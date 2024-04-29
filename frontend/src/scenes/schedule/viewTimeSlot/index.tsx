import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 
import { Passenger } from '@/shared/types';

// Define an interface for the JSON data
interface Slot {
  type: string;
  buildingname: string;
  classname: string;
  subject: string;
  daysofweek: string;
  starttime: string;
  endtime: string;
}

type Props = {
  passenger: Passenger;
}

const ViewTimeSlot: React.FC<Props> = (passenger: Props) => {
  const [schedule, setSchedule] = useState<Slot[]>([]); // Initialize schedule as an empty array of Slot objects
  const transformTime = (timeString: string): string => (parseInt(timeString.slice(0, 2)) % 12 || 12) + timeString.slice(2, 5);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/scheduler/viewCourses/${passenger.passenger.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch schedule');
        }
  
        const data = await response.json();
        setSchedule(data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };
  
    fetchSchedule();
  
  }, [passenger.passenger.id]);

  return (
    <>
      <div className="bg-primary-green-500 text-primary-black py-5 px-6 flex items-center justify-between fixed top-0 w-full z-10">
        <Link to="/schedule" className="mr-4">
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-xl text-primary-black font-bold mr-10">Current Schedule</h1>
        </div>
        </div>
        <div className="flex flex-col justify-center items-center h-full pt-20">
      {schedule.length === 0 ? (
        <p className="text-red-500 text-2xl">The schedule is currently empty.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {schedule.map((slot, index) => (
            <div key={index} className="max-w-xs w-full sm:w-64 rounded overflow-hidden shadow-lg bg-primary-red">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{slot.classname}</div>
                <p className="text-slate-300 text-base">
                  Type: Class <br />
                  Days: {slot.daysofweek}<br />
                  Location: {slot.buildingname}<br />
                  Time: {transformTime(slot.starttime)}-{transformTime(slot.endtime)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
     </div>
    </>
  );
};

export default ViewTimeSlot;
