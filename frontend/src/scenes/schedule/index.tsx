import React from 'react'
import placeholderData from "./MOCK_DATA.json"
import {useTable} from "react-table"

interface DataEntry {
  startTime: string;
  endTime: string;
  // Other properties as needed
}

const dayOfWeekDict: { [key: string]: string } = {
  "U": "Sunday",
  "M": "Monday",
  "T": "Tuesday",
  "W": "Wednesday",
  "R": "Thursday",
  "F": "Friday",
  "S": "Saturday"
};

function getData(startTimes:string[], endTimes:string[], days:string[]) { 
  let num: number = 0
  // Define the days of the week as two-letter abbreviations
  const daysOfWeek: string[] = ["U", "M", "T", "W", "R", "F", "S"];
  
  // Initialize an empty object to hold the data
  const data: { [key: string]: { [key: string]: number } } = {};

  // Define an array to represent time slots from 12:00 am to 11:45 pm
  const timeSlots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}`;
      for (let i = 0; i < startTimes.length; i++) { 
        let value = 0
        if (hour >= Number(startTimes[i].substring(0,2)) && hour <= Number(endTimes[i].substring(0,2))) {
          if (minute >= Number(startTimes[i].substring(2)) && minute <= Number(endTimes[i].substring(2))) { 
            value = 1
            console.log(startTimes[i],time,endTimes[i], value, days[i].split(''))
          }
        }
        createSchedule(time, value, days[i].split(''))
      }
    }
  }

  function createSchedule(time: string, value: number, days:string[]) { 
    timeSlots.push(time)
    timeSlots.forEach((time) => {
      data[time] = {};
      daysOfWeek.forEach(day => {
        if (days.includes(day)) { 
          data[time][day] = value;
        }
        else { 
          data[time][day] = 0;
        }
      });
    });
  }
  //console.log(data);

  // Convert the data object to JSON format
  const jsonData: string = JSON.stringify(data, null, 2);

  
  // Print or use the JSON data as needed
  //console.log(jsonData);


}

function calculateStartAndEndTime(data: DataEntry[]): {startTime: string, endTime: string} | null {
  if (!Array.isArray(data) || data.length === 0) {
    return null; // Return null if data is empty or not an array
  }

  // Initialize start and end times with the first entry's start and end times
  let startTime = data[0].startTime;
  let endTime = data[0].endTime;

  // Iterate through the data to find the earliest start time and latest end time
  data.forEach(entry => {
    if (entry.startTime < startTime) {
      startTime = entry.startTime;
    }
    if (entry.endTime > endTime) {
      endTime = entry.endTime;
    }
  });

  return { startTime, endTime };
}

function Schedule() { 
  
  const jsonData = JSON.parse(JSON.stringify(placeholderData));
  const startTimes: string[] = [];
  const endTimes: string[] = [];
  const days: string[] = [];

  placeholderData.forEach(item => {
      startTimes.push(item.startTime);
      endTimes.push(item.endTime);
      days.push(item.days);
  });
  //console.log('Start Times:', startTimes);
  //console.log('End Times:', endTimes);
  //console.log('Days:', days)
  
  const generatedData = getData(startTimes, endTimes, days);

  const data = React.useMemo(() => placeholderData, []);
  //console.log(data)
  const columns = React.useMemo(() => [
    {
      Header: "Type",
      accessor: "type" as const
    },
    {
      Header: "Days",
      accessor: "days" as const
    },
    {
      Header: "Name",
      accessor: "name" as const
    },
    {
      Header: "Location",
      accessor: "location" as const
    },
    {
      Header: "Start Time",
      accessor: "startTime" as const
    },
    {
      Header: "End Time",
      accessor: "endTime" as const
    }
  ], []);

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data});
  return (
    <div className="Schedule">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => { 
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                       {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule