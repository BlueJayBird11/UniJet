import { AdjustmentsHorizontalIcon, SparklesIcon, UserCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import Person from "./person";

type Props = {}

const FindDriver = (props: Props) => {
  const filterButtonClickEvent = () => {
    console.log(`Clicked: {}`);
  };
  const iconStyle = "h-8 w-8 text-black";
  const iconTextStyle = "flex items-center justify-between";
  const headerTextStyle = "text-black text-xs";
  
  const userIconStyle = "h-20 w-20 text-black";
  const userTextStyle = "text-black text-xl font-bold";
  const styleToCenterTxt = "flex items-center h-full pl-2"
  const userInfoTextStyle = "text-black text-2xl text-left font-bold";

  return (
    <section className="bg-primary-blue">
      {/* HEADER SECTION */}
      <div className="w-full py-6">
        {/* ITEMS FOR HEADER */}
        <div className="flex items-center justify-between">
          {/* FILTER BUTTON */}
          <button
            className="pl-4"
            onClick={filterButtonClickEvent}
          >
            <div className={`${iconTextStyle}`}>
              <AdjustmentsHorizontalIcon className={`${iconStyle}`} />
              <div className="flex items-center">
                <p className={`${headerTextStyle} text-center`}>Filter</p>
              </div>
            </div>
          </button>
          {/* INPUT */}
          <input 
            title="driverSearch" 
            type="text" 
            placeholder="Search"  
          />
          {/* OPTIMIZE BUTTON */}
          <button className="pr-4">
            <div className={`${iconTextStyle}`}>
              <SparklesIcon className={`${iconStyle}`} />
              <div className="flex items-center">
                <p className={`${headerTextStyle} text-center`}>Optimize</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* PEOPLE */}
      <Person name="Ash" rating={5.0} distance={1.5} location="Nethken" payMin={9} payMax={11} />
      <Person name="Henry" rating={4.1} distance={1.2} location="IESB" payMin={5} payMax={6} />
      <Person name="Asta" rating={4.8} distance={2.5} location="IESB" payMin={7} payMax={13} />

      <div className="py-14"></div>
    </section>
  )
}

export default FindDriver