import { AdjustmentsHorizontalIcon, SparklesIcon } from "@heroicons/react/24/solid";

type Props = {}

const FindDriver = (props: Props) => {
  const iconStyle = "h-8 w-8 text-black";
  const iconTextStyle = "flex"
  const textStyle = "text-black text-xs"
  return (
    <section>
      <div className="w-full py-2">
        <div className="flex justify-between">
          <div className={`${iconTextStyle}`}>
            <AdjustmentsHorizontalIcon className={`${iconStyle}`} />
            <p className={`${textStyle} align-middle`}>Filter</p>
          </div>
          <input title="driverSearch" type="text" />
          <div className={`${iconTextStyle}`}>
            <SparklesIcon className={`${iconStyle}`} />
            <p className={`${textStyle}`}>Optimize</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FindDriver