import { SelectedPage } from "@/shared/types";
import { CalendarDaysIcon, UserCircleIcon, ClockIcon, TruckIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import History from "@/scenes/history";
import { Link } from "react-router-dom";

type Props = {
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
}

const Navbar = ({selectedPage, setSelectedPage}: Props) => {
    let currentPage: string = "profile";
    
    const changeCurrentPage = (temp: string, curr: string) => {
        currentPage = temp;
        console.log(currentPage);
    }

    const isSelectedPage = (testPage: string) => {
        console.log("testing if equal");
        if (testPage === currentPage) {
            return "bg-primary-green-500"
        }
        return ""
    };
    
    const buttonStyle = "rounded-full p-4 border-solid border-black"
    const iconStyle = "h-10 w-10 text-black";
    return (
    <nav>
        {/* <Link to = "/">a</Link>
        <Link to = "/history">a</Link> */}

        <div className='bg-primary-red flex w-full items-center justify-between fixed bottom-0 py-2 px-6 gap-2 z-50'>
            <Link to ="/schedule">
                <button className={`${buttonStyle} ${isSelectedPage("schedule")}`} 
                    onClick={() => changeCurrentPage("schedule", currentPage)}
                > 
                    <CalendarDaysIcon className={`${iconStyle}`}/>
                </button>
            </Link>
            <Link to ="/findDriver">
                <button
                    className={`${buttonStyle} ${isSelectedPage("findDriver")}`} 
                    onClick={() => changeCurrentPage("findDriver", currentPage)}   
                >
                    <TruckIcon className={`${iconStyle}`}/>
                </button>
            </Link>
            <Link to ="/history">
                <button
                    className={`${buttonStyle} ${isSelectedPage("history")}`}    
                    onClick={() => changeCurrentPage("history", currentPage)}
                >
                    <ClockIcon className={`${iconStyle}`}/>
                </button>
            </Link>
            <Link to ="/">
                <button
                    className={`${buttonStyle} ${isSelectedPage("profile")}`}    
                    onClick={() => changeCurrentPage("profile", currentPage)}
                >
                    <UserCircleIcon className={`${iconStyle}`}/>
                </button>
            </Link>
        </div>
    </nav>
  )
}

export default Navbar