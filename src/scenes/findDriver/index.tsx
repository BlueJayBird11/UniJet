import { AdjustmentsHorizontalIcon, SparklesIcon } from "@heroicons/react/24/solid";

type Props = {}

const FindDriver = (props: Props) => {
  const filterButtonClickEvent = () => {
    console.log(`Clicked: {}`);
  };
  const iconStyle = "h-8 w-8 text-black";
  const iconTextStyle = "flex items-center justify-between"
  const textStyle = "text-black text-xs"
  return (
    <section>
      <div className="w-full py-6">
        <div className="flex items-center justify-between">
          <button
            className="pl-4"
            onClick={filterButtonClickEvent}
          >
            <div className={`${iconTextStyle}`}>
              <AdjustmentsHorizontalIcon className={`${iconStyle}`} />
              <div className="flex items-center">
                <p className={`${textStyle} text-center`}>Filter</p>
              </div>
            </div>
          </button>
          <input 
            title="driverSearch" 
            type="text" 
            placeholder="Search"  
          />
          <button className="pr-4">
            <div className={`${iconTextStyle}`}>
              <SparklesIcon className={`${iconStyle}`} />
              <div className="flex items-center">
                <p className={`${textStyle} text-center`}>Optimize</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FindDriver