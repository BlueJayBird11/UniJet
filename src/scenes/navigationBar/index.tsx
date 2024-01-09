import { CalendarDaysIcon, UserCircleIcon, ClockIcon, TruckIcon } from "@heroicons/react/24/solid";
import { Console } from "console";
import { motion } from "framer-motion";

type Props = {}

const Navbar = (props: Props) => {
    const handleButtonClick = () => {
        console.log(`Clicked: {}`);
    };

    const buttonStyle = "rounded-full p-4 border-solid border-black"
    const iconStyle = "h-10 w-10 text-black"
    return (
    <nav>
        <div className='bg-primary-red flex w-full items-center justify-between fixed bottom-0 py-2 px-6 gap-2'>
            <button
                className={`${buttonStyle}`}
                onClick={handleButtonClick}
            >
                <CalendarDaysIcon className={`${iconStyle}`}/>
            </button>
            <button
                className={`${buttonStyle}`}    
            >
                <TruckIcon className={`${iconStyle}`}/>
            </button>
            <button
                className={`${buttonStyle}`}    
            >
                <ClockIcon className={`${iconStyle}`}/>
            </button>
            <button
                className={`${buttonStyle}`}    
            >
                <UserCircleIcon className={`${iconStyle}`}/>
            </button>
        </div>
    </nav>
  )
}

export default Navbar