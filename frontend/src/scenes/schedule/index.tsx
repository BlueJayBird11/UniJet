import React from 'react'
import placeholderData from "./CURR_DATA.json"
import {useTable} from "react-table"
import { Link } from 'react-router-dom';

interface DataEntry {
  startTime: string;
  endTime: string;
  days: string; // Add 'days' property
  // Other properties as needed
}

function getData(startTimes:string[], endTimes:string[], days:string[]) { 
  // Define the days of the week as two-letter abbreviations
  const daysOfWeek: string[] = ["U", "M", "T", "W", "R", "F", "S"];
  
  // Initialize an empty object to hold the data
  const data: { [key: string]: { [key: string]: number } } = {};
  const resultList: { [key: string]: number }[] = [];

  // Define an array to represent time slots from 12:00 am to 11:45 pm
  const timeSlots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}`;
      let slot = {};
      for (let i = 0; i < startTimes.length; i++) { 
        if (hour >= Number(startTimes[i].substring(0,2)) && hour < Number(endTimes[i].substring(0,2))) {
          slot = createSchedule(time, days[i].split(''), slot)
        }
        else if (hour === Number(endTimes[i].substring(0,2))) { 
          if (minute < Number(endTimes[i].substring(2))) {
            slot = createSchedule(time, days[i].split(''), slot)
          }
        }
      }
      if (isEmpty(slot)) { 
        slot = {
          "U": 0,
          "M": 0,
          "T": 0,
          "W": 0,
          "R": 0,
          "F": 0,
          "S": 0
        };
      }
      resultList.push(slot);
    }
  }
  return resultList

  function createSchedule(time: string, days:string[], slot:{}): object { 
    timeSlots.push(time)
    timeSlots.forEach((time) => {
      data[time] = slot;
      daysOfWeek.forEach(day => {
        if (days.includes(day)) { 
          data[time][day] = 1;
        }
        else if (data[time][day] === 1) { 
          data[time][day] = 1;
        }
        else { 
          data[time][day] = 0;
        }
      });
    });
    return data[time]
  }
}

function isEmpty(obj: object) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

function Schedule() { 
  
  const jsonData: DataEntry[] = Array.isArray(placeholderData) ? placeholderData : [];

  // Extract startTimes, endTimes, and days from placeholderData
  const startTimes: string[] = [];
  const endTimes: string[] = [];
  const days: string[] = [];

  jsonData.forEach(item => {
      startTimes.push(item.startTime);
      endTimes.push(item.endTime);
      days.push(item.days);
  });
  //console.log('Start Times:', startTimes);
  //console.log('End Times:', endTimes);
  //console.log('Days:', days)
  
  const generatedData =  React.useMemo(() => getData(startTimes, endTimes, days), []);
  //console.log(generatedData)

  const data = React.useMemo(() => placeholderData, []);
  //console.log(data)
  
  const columns = React.useMemo(() => [
    {
      Header: "Su",
      accessor: "U" as const
    },
    {
      Header: "Mo",
      accessor: "M" as const
    },
    {
      Header: "Tu",
      accessor: "T" as const
    },
    {
      Header: "We",
      accessor: "W" as const
    },
    {
      Header: "Tr",
      accessor: "R" as const
    },
    {
      Header: "Fr",
      accessor: "F" as const
    },
    {
      Header: "Sa",
      accessor: "S" as const
    }
    ], []);

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data: generatedData});
  return (
    <div className='pt-20'>
      <div className="h-20 fixed top-0 border border-rose-100 bg-gray-600 flex justify-between items-center px-2 w-full">
        <Link to="/addTimeSlot">
          <button className="bg-primary-red rounded px-1 py-1">Add time slot</button>
        </Link>
        <Link to="/viewTimeSlot">
          <button className="bg-primary-red rounded px-1 py-1">View time slots</button>
        </Link>
        <Link to="/deleteTimeSlot">
          <button className="bg-primary-red rounded px-1 py-1">Delete time slots</button>
        </Link>
      </div>
        <div className="schedule bg-primary-blue">
          <div className="container px-4">
            <table {...getTableProps()} className="table-auto">
              <thead className="sticky top-20">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    <th></th> {/* Add an empty header for the time column */}
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} className="sticky bg-primary-blue border-rose-100 border-2 px-3 py-2">
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => { 
                  prepareRow(row)
                  const hours = Math.floor(index / 4); // Calculate hours
                  const minutes = (index % 4) * 15; // Calculate minutes
                  const time = new Date(0, 0, 0, hours, minutes); // Create Date object
                  const formattedTime = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Format time
                  return (
                    <tr {...row.getRowProps()}>
                      <td className="border border-rose-100 px-4 py-2">{formattedTime}</td> {/* Display time */}
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className={`border border-rose-100 w-10 h-10 ${cell.value === 1 ? 'bg-takenblocks' : 'bg-gray-600'}`}
                        >
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}

export default Schedule