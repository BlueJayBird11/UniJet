import React from 'react'
import Calendar from 'react-calendar'

type Props = {}

const Schedule = (props: Props) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-primary-blue py-20 flex justify-center items-start">
          <h1 className='text-5xl font-bold text-primary-black mt-6'> 
            Scheduler
          </h1>
      </div>
      <div className="flex-grow text-2xl bg-primary-white p-8">
          <Calendar />
      </div>
      <div className="bg-primary-blue py-60">

      </div>
    </div>
  )
}

export default Schedule