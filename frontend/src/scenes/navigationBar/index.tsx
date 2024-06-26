import { SelectedPage } from "@/shared/types";
import { CalendarDaysIcon, UserCircleIcon, ClockIcon, TruckIcon, MapIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
}

const Navbar = ({selectedPage, setSelectedPage}: Props) => {    
    const checkIfIsSelectedPage = (testPage: SelectedPage) => {
        if (testPage === selectedPage) {
            return "bg-primary-green-500"
        }
        return ""
    }
    
    const buttonStyle = "rounded-full p-4 border-solid border-black"
    const iconStyle = "h-10 w-10 text-navBarIcons";
    return (
    <nav>
        <div id="navbar" className='bg-primary-red flex w-full items-center justify-between fixed bottom-0 py-2 px-6 gap-2 z-[400]'>
            <Link className="rounded-full" to ="/schedule">
                <button className={`${buttonStyle} ${checkIfIsSelectedPage(SelectedPage.Schedule)}`} 
                    onClick={() => setSelectedPage(SelectedPage.Schedule)}
                > 
                    <CalendarDaysIcon className={`${iconStyle}`}/>
                </button>
            </Link>
            {/* <Link to ="/findDriver">
                <button
                    className={`${buttonStyle} ${checkIfIsSelectedPage(SelectedPage.FindDriver)}`} 
                    onClick={() => setSelectedPage(SelectedPage.FindDriver)}   
                >
                    <TruckIcon className={`${iconStyle}`}/>
                </button>
            </Link> */}
            <Link className="rounded-full" to ="/map">
                <button
                    className={`${buttonStyle} ${checkIfIsSelectedPage(SelectedPage.Map)}`}    
                    onClick={() => setSelectedPage(SelectedPage.Map)}
                >
                    <MapIcon className={`${iconStyle}`}/>
                </button>
            </Link>
            <Link className="rounded-full" to ="/history">
                <button
                    className={`${buttonStyle} ${checkIfIsSelectedPage(SelectedPage.History)}`}    
                    onClick={() => setSelectedPage(SelectedPage.History)}
                >
                    <ClockIcon className={`${iconStyle}`}/>
                </button>
            </Link>
            <Link className="rounded-full" to ="/">
                <button
                    className={`${buttonStyle} ${checkIfIsSelectedPage(SelectedPage.Profile)}`}    
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