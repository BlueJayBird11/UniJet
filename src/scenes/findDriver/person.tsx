import { UserCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

type Props = {
    name: string;
    rating: number;
    distance: number;
    location: string;
    payMin: number;
    payMax: number
}

const Person = ({name, rating, distance, location, payMin, payMax}: Props) => {
    const userIconStyle = "h-20 w-20 text-black";
    const userTextStyle = "text-black text-xl font-bold";
    const styleToCenterTxt = "flex items-center h-full pl-2"
    const userInfoTextStyle = "text-black text-2xl text-left font-bold";  

    let formattedRating: string = rating.toFixed(1);
    let formattedDistance: string = distance.toFixed(1);
  
    return (
    <div className="px-2 py-2">
        <div className="bg-gray-600 rounded-[20px] px-2 py-4">
          <div className="flex items-center justify-between px-2">
            {/* PROFILE PICTURE */}
            <UserCircleIcon className={`${userIconStyle}`}/>
            {/* NAME AND RATING */}
            <div className="pr-16">
              <p className={`${userTextStyle}`}>{name}</p>
              <p className={`${userTextStyle}`}>Rating: {formattedRating} Stars</p>
            </div>
          </div>
          <div className={`${styleToCenterTxt}`}>
            <p className={`${userInfoTextStyle}`}>Distance away: {formattedDistance} mi</p>
            {/* <p className={`${userInfoTextStyle}`}>Distance away: 1.5 mi <br/>Drop off: Nethken <br/>Pay: $9-$11</p> */}
            {/* <p className={`${userInfoTextStyle}`}></p>
            <p className={`${userInfoTextStyle}`}></p> */}
          </div>
          <div className={`${styleToCenterTxt}`}>
            <p className={`${userInfoTextStyle}`}>Drop off: {location}</p>
          </div>
          <div className={`${styleToCenterTxt}`}>
            <p className={`${userInfoTextStyle}`}>Pay: ${payMin}-${payMax}</p>
          </div>
        </div>
      </div>
  )
}

export default Person