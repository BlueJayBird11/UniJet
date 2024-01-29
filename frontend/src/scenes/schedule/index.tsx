import React from 'react'

type Props = {}

const Schedule = (props: Props) => {
    const generateHourLabels = () => {
    const hours = [];
    for (let i = 7; i <= 23; i++) {
      const label = i <= 12 ? `${i} am` : `${i - 12} pm`;
      hours.push(
        <div key={i} className="h-12 flex items-center justify-center">
          {label}
        </div>
      )
    }
    return hours
  }
  
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="flex flex-col h-screen pb-24 bg-gray-600">
      <div className="bg-primary-blue py-20 flex justify-center items-start relative">
        {/* Gray bar behind weekday text */}
        <div className="absolute py-6 m-10 bg-gray-400 w-full">
        </div>
        {/* Text in the blue area */}
        <div className="flex justify-between w-full px-16 absolute py-10">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-white m-3">
                {day}
              </div>
            ))}
        </div>
      </div>
      <div className="flex-grow overflow-y-auto flex">
        {/* Left column */}
        <div className="w-16 bg-gray-600">
          <div className="grid grid-rows-24 gap-20">
            {generateHourLabels()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
