import React from 'react';
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

// Define the props for a single history entry
type HistoryEntryProps = {
  riderName: string;
  date: string;
  totalTime: number; // assuming total time is in hours
  earnings: number;
};


// Define the component for a single history entry
const HistoryEntry = ({ riderName, date, totalTime, earnings }: HistoryEntryProps) => {
  const entryStyle = "bg-gray-600 rounded-[20px] px-2 py-4 mb-4";
  const textStyle = "text-black text-xl font-bold";
  const detailTextStyle = "text-black text-lg";  

  return (
    <motion.div 
        className={entryStyle}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="flex items-center justify-between px-2">
          {/* Left side: Rider Name */}
          <p className={textStyle}>{riderName}</p>

          {/* Right side: Date */}
          <p className={textStyle}>{date}</p>
        </div>
        <div className="mt-2">
          {/* Total Ride Time */}
          <p className={detailTextStyle}>Total Ride Time: {totalTime} hrs</p>

          {/* Earnings */}
          <p className={detailTextStyle}>Earnings: ${earnings.toFixed(2)}</p>
        </div>
    </motion.div>
  );
};

// Define the parent component that will render the list of history entries
const History = () => {
  const historyEntries = [
    { riderName: "Taylor Swift", date: "2024-01-12", totalTime: 3, earnings: 50.00 },
    { riderName: "Chris Evans", date: "2024-01-13", totalTime: 2.5, earnings: 45.00 },
    { riderName: "Scarlett Johansson", date: "2024-01-14", totalTime: 2, earnings: 40.00 },
    { riderName: "Ryan Reynolds", date: "2024-01-15", totalTime: 1.75, earnings: 30.00 },
    { riderName: "Emma Watson", date: "2024-01-16", totalTime: 2.25, earnings: 37.50 },
    { riderName: "Tom Holland", date: "2024-01-17", totalTime: 3, earnings: 55.00 },
    { riderName: "Zendaya", date: "2024-01-18", totalTime: 1.5, earnings: 25.00 },
    { riderName: "Keanu Reeves", date: "2024-01-19", totalTime: 3.5, earnings: 60.00 },
    
  ];

  return (
    <div className="bg-primary-blue"> {/* Blue background */}
    <div className="pt-4"> {/* Top padding */}
      {historyEntries.map((entry, index) => (
        <HistoryEntry
          key={index}
          riderName={entry.riderName}
          date={entry.date}
          totalTime={entry.totalTime}
          earnings={entry.earnings}
        />
      ))}
    </div>
  </div>
  );
};


export default History;
