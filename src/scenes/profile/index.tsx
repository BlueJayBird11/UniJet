import React from 'react'
import { Cog6ToothIcon } from "@heroicons/react/20/solid";

type Props = {}

const index = (props: Props) => {
    const handleButtonClick = () => {
        console.log('hit');
      };
    return (
        <header className='relative'>
            <div className='flex justify-end p-4'> 
                <button onClick={handleButtonClick}> 
                    <Cog6ToothIcon className='w-10 h-10 text-gray-500'/>
                </button> 
            </div>
        </header>
    )
}

export default index