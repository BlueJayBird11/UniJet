import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useUserRole } from '@/scenes/settings/userRole/UserRoleContext';
import { Passenger, SelectedPage } from '@/shared/types';

// Define the props for a single history entry
type HistoryEntryProps = {
  date: string;
  name: string; // Name of the passenger or driver
  totalTime: number; // Assuming total time is in hours
  amount: number; // Earnings or payment
  userRole: 'driver' | 'passenger';
};

type Props = {
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
    passenger: Passenger;
}

const getDriverId: (id: bigint) => Promise<bigint> = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/history/driverId/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const {data} = await response.json();
    const driverId = data.history[0].driverid;
    console.log('Passenger data right here:', driverId);
    return BigInt(Number(driverId));
  } catch (error) {
    console.error('Error:', error);
    return BigInt(Number(0));
  }
};

// Define the component for a single history entry
const HistoryEntry = ({ date, name, totalTime, amount, userRole }: HistoryEntryProps) => {
  const entryStyle = "bg-gray-600 rounded-[20px] px-2 py-4 mb-4";
  const textStyle = "text-primary-black text-xl font-bold";
  const detailTextStyle = "text-primary-black text-lg";  

  const roleSpecificText = userRole === 'driver' ? 'Passenger: ' : 'Driver: ';
  const amountText = userRole === 'driver' ? 'Earnings: ' : 'Payment: ';

  return (
    <motion.div 
        className={entryStyle}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="flex items-center justify-between px-2">
          <p className={textStyle}>{roleSpecificText + name}</p>
          <p className={textStyle}>{date}</p>
        </div>
        <div className="mt-2">
          <p className={detailTextStyle}>Total Ride Time: {parseFloat(totalTime.toFixed(2))} minutes</p>
          <p className={detailTextStyle}>{amountText + `$${amount}`}</p>
        </div>
    </motion.div>
  );
};

// Define the parent component that will render the list of history entries
const History: React.FC<Props> = ({ selectedPage, setSelectedPage, passenger }: Props) => {
  const { userRole } = useUserRole();
  const [historyEntries, setHistoryEntries] = useState<any[]>([]);
  const [searchDate, setSearchDate] = useState('');
  const [filteredEntries, setFilteredEntries] = useState<any[]>([]);

  useEffect(() => {
    const getInformation = async (passenger: Passenger) => {
      console.log(userRole)
      if (userRole === "driver") { 
        try {
          console.log("driver")
          const id = await getDriverId(BigInt(Number(passenger.id)))
          const response = await fetch(`http://localhost:8000/api/v1/history/passengers/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const {data} = await response.json();
          console.log('Passenger data:', data);
          setHistoryEntries(data.history)
        } catch (error) {
          console.error('Error:', error);
        }
      }
      else if (userRole === "passenger")  {
        try {
          console.log("passenger")
          const response = await fetch(`http://localhost:8000/api/v1/history/drivers/${BigInt(Number(passenger.id))}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const {data} = await response.json();
          console.log('Passenger data:', data);
          setHistoryEntries(data.history)
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    getInformation(passenger);
  }, [passenger]); // Fetch data when 'passenger' prop changes

  // Filter function
  console.log(historyEntries)
  useEffect(() => {
    // Filter entries based on searchDate
    if (searchDate.trim() === '') {
      setFilteredEntries(historyEntries); // If searchDate is empty, show all entries
    } else {
      const filtered = historyEntries.filter(entry => {
        // Extract date part from starttime and compare with searchDate
        const entryDate = entry.starttime.split("T")[0];
        console.log(searchDate)
        console.log(entryDate)
        return entryDate === searchDate;
      });
      
      setFilteredEntries(filtered);
    }
  }, [searchDate, historyEntries]);

  return (
    <div className="bg-primary-blue">
      <div className="pt-4 px-4">
      <input 
          type="date" 
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="mb-4 p-2 w-full max-w-2xl mx-auto bg-historySearch text-primary-black" // Changed to bg-gray-400 and text-white
          placeholder="Search by Date"
          style={{ display: 'block' }}
        />
        {filteredEntries.map((entry, index) => (
          <HistoryEntry
            key={index}
            date={(entry.starttime.split("T")[0].replace(/-/g, "/")).split("/").slice(1).concat((entry.starttime.split("T")[0].replace(/-/g, "/")).split("/")[0]).join("/")}
            name={entry.firstname + " " + entry.lastname}
            totalTime={Math.ceil((new Date(entry.endtime).getTime() - new Date(entry.starttime).getTime()) / (1000 * 60))}
            amount={Math.round(parseFloat(entry.earnings) / 100)}
            userRole={userRole}
          />
        ))}
      </div>
      <div className="py-14 bottom-0"></div>
    </div>
  );
};

export default History;
