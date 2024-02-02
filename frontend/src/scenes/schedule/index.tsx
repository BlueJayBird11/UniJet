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
        {/* Gray-400 bar behind weekday text */}
        <div className="absolute py-5 m-10 bg-gray-400 w-full">
          {/* Weekday text */}
          <div className="flex justify-between w-full px-16 absolute py-0">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-white mx-3" style={{ marginTop: '-12px' }}>
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto flex">
        {/* Left column */}
        <div className="w-16 bg-gray-600">
          <div className="grid grid-rows-24 gap-20">
            {generateHourLabels()}
          </div>
        </div>
        {/* Vertical lines to separate time slots */}
        <div className="flex-grow relative">
          <div className="absolute top-0 bottom-0 left-0 w-full flex">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="flex-grow border-l-2 border-black" style={{ marginRight: `${1/20 * (index + 1)}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
