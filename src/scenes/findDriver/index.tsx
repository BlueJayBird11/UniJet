import { AdjustmentsHorizontalIcon, SparklesIcon, UserCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

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
    <section>
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
      <div className="px-2">
        <div className="bg-gray-600 rounded-[20px] px-2 py-4">
          <div className="flex items-center justify-between px-2">
            {/* PROFILE PICTURE */}
            <UserCircleIcon className={`${userIconStyle}`}/>
            {/* NAME AND RATING */}
            <div className="pr-16">
              <p className={`${userTextStyle}`}>Ash</p>
              <p className={`${userTextStyle}`}>Rating: 5.0 Stars</p>
            </div>
          </div>
          <div className={`${styleToCenterTxt}`}>
            <p className={`${userInfoTextStyle}`}>Distance away: 1.5 mi</p>
            {/* <p className={`${userInfoTextStyle}`}>Distance away: 1.5 mi <br/>Drop off: Nethken <br/>Pay: $9-$11</p> */}
            {/* <p className={`${userInfoTextStyle}`}></p>
            <p className={`${userInfoTextStyle}`}></p> */}
          </div>
          <div className={`${styleToCenterTxt}`}>
            <p className={`${userInfoTextStyle}`}>Drop off: Nethken</p>
          </div>
          <div className={`${styleToCenterTxt}`}>
            <p className={`${userInfoTextStyle}`}>Pay: $9-$11</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FindDriver