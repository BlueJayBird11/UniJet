import { HoldDestination, Passenger } from "@/shared/types";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

interface Slot {
    buildingname: string;
    classname: string;
    daysofweek: string;
    starttime: string;
    location: [number, number];
  }

interface Props {
    setHoldDestination: (value: HoldDestination) => void;
    passenger: Passenger;
  }

const ScheduleModal: React.FC<Props> = ({setHoldDestination, passenger}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [schedule, setSchedule] = useState<Slot[]>([]); // Initialize schedule as an empty array of Slot objects
  const navigate = useNavigate();
  const transformTime = (timeString: string): string => (parseInt(timeString.slice(0, 2)) % 12 || 12) + timeString.slice(2, 5);

//   

  const toggleModal = async () => {
    try {
        if (!isOpen) {
            const response = await fetch(`http://localhost:8000/api/v1/requests/agenda/${passenger.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            
            if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
            }
        
            const {data} = await response.json();

            
            if(data !== undefined)
                {
                    const coordinates: [number, number] = data.buildinglocation.split(',').map(parseFloat) as [number, number];
                    setSchedule([{
                        buildingname: data.buildingname,
                        classname: data.classname,
                        daysofweek: data.daysofweek,
                        starttime: data.starttime,
                        location: [coordinates[1], coordinates[0]]
                    }])
                }
            setIsOpen(!isOpen);
        }
        else
        {
            setIsOpen(!isOpen);
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

    const requestRide = (buildingname: string, location: [number, number]) => {
        // throw new Error("Function not implemented.");
        
        setHoldDestination({
            name: buildingname,
            destination: [location[0], location[1]]
          })
        //   
          navigate('/confirmRide');
    }

  return (
    <div className="absolute top-0 left-16 right-0 z-[900]">
      <button
        className="top-2 right-2 bg-primary-green-500 z-20 h-12 w-12 absolute rounded-md"
        onClick={toggleModal}
        onMouseLeave={toggleModal}
      >
        <CalendarDaysIcon className="text-black"/>
        </button>
      <div
        className={`w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-32" : "translate-x-96"
        }`}
      >
        {/* Modal content goes here */}
        {
            schedule === null || schedule.length === 0 ? (
                <div className="p-4 text-black top-16 absolute bg-white rounded-md right-8 pr-16">
                    <p>No available classes</p>
                </div>
            ) : (
            <div className="p-4 text-black top-16 absolute bg-white rounded-md right-8 pr-16">
                <h2 className="text-lg font-bold">Class Info: </h2>
                <p>Class: {schedule[0].classname}</p>
                <p>Location: {schedule[0].buildingname}</p>
                <p>Time: {transformTime(schedule[0].starttime)}</p>
                <button className="bg-blue-500 rounded-lg p-2 text-white" onClick={() => requestRide(schedule[0].buildingname,schedule[0].location)}>Request Ride</button>
            </div>
          )
        }
        {/* <div className="p-4 text-black top-16 absolute bg-white rounded-md right-8 pr-16">
          <h2 className="text-lg font-bold">Class Info: </h2>
          <p>Class: {}</p>
          <p>Location: {}</p>
          <p>Time: {}</p>
          <button className="bg-blue-500 rounded-lg p-2 text-white">Request Ride</button>
        </div> */}
      </div>
    </div>
  );
};

export default ScheduleModal;
