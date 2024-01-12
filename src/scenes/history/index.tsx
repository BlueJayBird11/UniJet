import React, { useState } from 'react';
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";


// Define the props for a single history entry
type HistoryEntryProps = {
  date: string;
  name: string; // Name of the passenger or driver
  totalTime: number; // Assuming total time is in hours
  amount: number; // Earnings or payment
  userRole: 'driver' | 'passenger';
};


// Define the component for a single history entry
const HistoryEntry = ({ date, name, totalTime, amount, userRole }: HistoryEntryProps) => {
  const entryStyle = "bg-gray-600 rounded-[20px] px-2 py-4 mb-4";
  const textStyle = "text-black text-xl font-bold";
  const detailTextStyle = "text-black text-lg";  

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
          <p className={detailTextStyle}>Total Ride Time: {totalTime} hrs</p>
          <p className={detailTextStyle}>{amountText + `$${amount.toFixed(2)}`}</p>
        </div>
    </motion.div>
  );
};

// Define the parent component that will render the list of history entries
const History = ({ userRole }: { userRole: 'driver' | 'passenger' }) => {
  const historyEntries = [
    // Sample data, replace with actual data fetching logic
    { date: "01/10/2024", name: userRole === 'driver' ? "Taylor Swift" : "Chris Hemsworth", totalTime: 3, amount: 50.00 },
    { date: "01/06/2024", name: userRole === 'driver' ? "Ryan Reynolds" : "Benedict Cumberbatch", totalTime: 1.75, amount: 30.00 },
    { date: "01/04/2024", name: userRole === 'driver' ? "George Clooney" : "Julia Roberts", totalTime: 2.6, amount: 47.00 },
    { date: "01/04/2024", name: userRole === 'driver' ? "Bradley Cooper" : "Lady Gaga", totalTime: 1.9, amount: 31.00 },
    { date: "01/03/2024", name: userRole === 'driver' ? "Emma Stone" : "Ryan Gosling", totalTime: 2.4, amount: 44.00 },
    { date: "01/03/2024", name: userRole === 'driver' ? "Angelina Jolie" : "Johnny Depp", totalTime: 2.5, amount: 45.00 },
    { date: "01/02/2024", name: userRole === 'driver' ? "Keanu Reeves" : "Dwayne Johnson", totalTime: 3.5, amount: 60.00 },
    { date: "01/02/2024", name: userRole === 'driver' ? "Samuel L. Jackson" : "Charlize Theron", totalTime: 2.3, amount: 41.00 },
    { date: "01/01/2024", name: userRole === 'driver' ? "Leonardo DiCaprio" : "Brad Pitt", totalTime: 2.0, amount: 42.00 },
    { date: "12/31/2023", name: userRole === 'driver' ? "Emma Watson" : "Tom Holland", totalTime: 2.25, amount: 37.50 },
    { date: "12/30/2023", name: userRole === 'driver' ? "Hugh Jackman" : "Jennifer Lawrence", totalTime: 2.2, amount: 39.00 },
    { date: "12/29/2023", name: userRole === 'driver' ? "Tom Holland" : "Zendaya", totalTime: 3, amount: 55.00 },
    { date: "12/29/2023", name: userRole === 'driver' ? "Meryl Streep" : "Anne Hathaway", totalTime: 1.8, amount: 28.00 },
    { date: "12/28/2023", name: userRole === 'driver' ? "Chris Evans" : "Natalie Portman", totalTime: 2.5, amount: 45.00 },
    { date: "12/28/2023", name: userRole === 'driver' ? "Zendaya" : "Keanu Reeves", totalTime: 1.5, amount: 25.00 },
    { date: "12/27/2023", name: userRole === 'driver' ? "Scarlett Johansson" : "Tom Hiddleston", totalTime: 2, amount: 40.00 },
    { date: "12/27/2023", name: userRole === 'driver' ? "Margot Robbie" : "Sandra Bullock", totalTime: 2.1, amount: 38.00 },
    { date: "12/25/2023", name: userRole === 'driver' ? "Tom Cruise" : "Will Smith", totalTime: 3.3, amount: 52.00 },
    ];

  const [searchDate, setSearchDate] = useState('');

  // Filter function
  const filteredEntries = historyEntries.filter(entry => {
    // Convert search date format from YYYY-MM-DD to MM/DD/YYYY
    const convertDateFormat = (dateStr: string) => {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      return `${month}/${day}/${year}`;
    };

    const convertedSearchDate = convertDateFormat(searchDate);
    return entry.date.includes(convertedSearchDate);
  });

  return (
    <div className="bg-primary-blue">
      <div className="pt-4 px-4">
      <input 
          type="date" 
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="mb-4 p-2 w-full max-w-2xl mx-auto bg-gray-400 text-white" // Changed to bg-gray-400 and text-white
          placeholder="Search by Date"
          style={{ display: 'block' }}
        />
        {filteredEntries.map((entry, index) => (
          <HistoryEntry
            key={index}
            date={entry.date}
            name={entry.name}
            totalTime={entry.totalTime}
            amount={entry.amount}
            userRole={userRole}
          />
        ))}
      </div>
      <div className="py-14 bottom-0"></div>
    </div>
  );
};

export default History;
