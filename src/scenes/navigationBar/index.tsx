import { SelectedPage } from "@/shared/types";
import { CalendarDaysIcon, UserCircleIcon, ClockIcon, TruckIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import History from "@/scenes/history";
import { Link } from "react-router-dom";

type Props = {
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
    page: JSX.Element;
}

const Navbar = ({selectedPage, setSelectedPage, page}: Props) => {
    const handleButtonClick = () => {
        console.log(`Clicked: {}`);
    };
    const setPage = () => {
        page = <History />
    }
    
    const buttonStyle = "rounded-full p-4 border-solid border-black"
    const iconStyle = "h-10 w-10 text-black";
    return (
    <nav>
        {/* <Link to = "/">a</Link>
        <Link to = "/history">a</Link> */}

        <div className='bg-primary-red flex w-full items-center justify-between fixed bottom-0 py-2 px-6 gap-2 z-50'>
            <Link to ="/schedule">
                <button className={`${buttonStyle}`} 
                    onClick={() => setSelectedPage(SelectedPage.Schedule)}
                > 
                    <CalendarDaysIcon className={`${iconStyle}`}/>
                </button>
            </Link>
            <Link to ="/findDriver">
                <button
                    className={`${buttonStyle}`} 
                    onClick={() => setSelectedPage(SelectedPage.FindDriver)}   
                >
                    <TruckIcon className={`${iconStyle}`}/>
                </button>
            </Link>
            <Link to ="/history">
                <button
                    className={`${buttonStyle}`}    
                    onClick={() => setSelectedPage(SelectedPage.History)}
                >
                    <ClockIcon className={`${iconStyle}`}/>
                </button>
            </Link>
            <Link to ="/">
                <button
                    className={`${buttonStyle}`}    
                    onClick={() => setSelectedPage(SelectedPage.Profile)}
                >
                    <UserCircleIcon className={`${iconStyle}`}/>
                </button>
            </Link>
        </div>
    </nav>
  )
}

export default Navbar