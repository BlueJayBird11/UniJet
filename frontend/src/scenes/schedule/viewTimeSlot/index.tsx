import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import placeholderData from "../CURR_DATA.json";
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
  const [schedule, setSchedule] = useState
  <Slot[]>([]); // Initialize schedule as an empty array of Slot objects

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
        console.log(schedule)
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };
  
    fetchSchedule();
  
  }, [passenger.passenger.id]);
  
  
  

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-3xl font-bold">Current Schedule</h1>
      {schedule.length === 0 ? (
        <p className="text-red-500 text-2xl">The schedule is currently empty.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {schedule.map((slot, index) => (
            <div key={index} className="max-w-xs w-full sm:w-64 rounded overflow-hidden shadow-lg bg-primary-red">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{slot.classname}</div>
                <p className="text-slate-300 text-base">
                  Type: class <br />
                  Days: {slot.daysofweek}<br />
                  Location: {slot.buildingname}<br />
                  Time: {slot.starttime}-{slot.endtime}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/schedule" className="mt-4 text-blue-500 hover:text-blue-700">Back to Schedule</Link>
    </div>
  );
};

export default ViewTimeSlot;
