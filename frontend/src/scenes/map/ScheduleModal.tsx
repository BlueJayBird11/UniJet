import { HoldDestination } from "@/shared/types";
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

const tempClass: Slot = {
    buildingname: "IESB",
    classname: "Software",
    daysofweek: "F",
    starttime: "2:00",
    location: [0,0]
}

interface Props {
    setHoldDestination: (value: HoldDestination) => void;
  }

const ScheduleModal: React.FC<Props> = ({setHoldDestination}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [schedule, setSchedule] = useState<Slot[]>([]); // Initialize schedule as an empty array of Slot objects
  const navigate = useNavigate();

//   console.log(schedule);

  const toggleModal = () => {
    setSchedule([tempClass])
    setIsOpen(!isOpen);
  };

    const requestRide = (buildingname: string, location: [number, number]) => {
        // throw new Error("Function not implemented.");
        console.log(`Send Request: ${buildingname}, ${location}`)
        setHoldDestination({
            name: buildingname,
            destination: [location[0], location[1]]
          })
        //   console.log(holdDestination);
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
                <p>Time: {schedule[0].starttime}</p>
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
