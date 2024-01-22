import React, {useState} from 'react'
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { Link } from 'react-router-dom';
import { SelectedPage } from '@/shared/types';

type Props = {
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
}

const index = ({selectedPage, setSelectedPage}: Props) => {
    const handleButtonClick = () => {
        console.log('hit');
      };

    const [offlineStatus, onlineStatus] = useState(false);

    const handleStatusClick = () => { 
        onlineStatus(!offlineStatus)
    }; 

    const name: string = "Ethan"
    const rating: number = 4.7

    return (
        <header className='relative'>
            <div className='flex justify-end p-4'> 
                <Link to="/settings">
                    <button
                        onClick={() => setSelectedPage(SelectedPage.Settings)}
                    > 
                        <Cog6ToothIcon className='w-10 h-10 text-primary-red'/>
                    </button> 
                </Link>
            </div>
            <div className='flex justify-center items-start'>
                <h1 className='text-5xl font-bold text-primary-black mt-16'>
                    Hello {name}!
                </h1>
            </div>
            <div className='flex justify-center items-start'>
                <h2 className='text-4xl font-bold text-primary-black mt-4'>
                    Rating: {rating}
                </h2>
            </div>
            <div className='flex justify-center items-start'>
                <button
                        className={`text-3xl p-5 font-bold text-primary-black  rounded-full focus:outline-none mt-24 ${offlineStatus ? 'bg-primary-red' : 'bg-primary-green-500'}`}
                        onClick={handleStatusClick}
                    >
                        {offlineStatus ? 'Offline' : 'Online'}
                </button>
            </div>
        </header>
    )
}

export default index