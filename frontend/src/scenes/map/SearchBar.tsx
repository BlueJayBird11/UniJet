import { HoldDestination } from '@/shared/types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  holdDestination: HoldDestination;
  setHoldDestination: (value: HoldDestination) => void;
}

const SearchBar: React.FC<Props> = ({holdDestination, setHoldDestination}) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSearch = (text: string) => {
    setSearchText(text); // Update search text as user types

    if (!text) {
      setResults([]); // Clear results if search text is empty
      return;
    }

    const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const city = 'Ruston';
    const state = 'Louisiana';
    const zipCode = '71270';
    const query = ` ${city}, ${state} ${zipCode}`;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      text + query
    )}.json?access_token=${accessToken}&types=poi,address&country=US&language=en&limit=5&state=LA&city=Ruston`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const features = data.features;
        if (features && features.length > 0) {
          setResults(features);
        } else {
          setResults([]);
        }
      })
      .catch((error) => {
        console.error('Error searching address:', error);
        setResults([]);
      });
  };

  const handleResultClick = (name: string, coordinates: number[]) => {
    console.log('Clicked:', name, coordinates);
    setHoldDestination({
      name: name,
      destination: [coordinates[0], coordinates[1]]
    })
    console.log(holdDestination);
    navigate('/confirmRide');
    // Add additional logic here (e.g., navigate to a specific location on the map)
  };

  return (
    <div className="z-[400] top-24 left-2 bg-white p-2 absolute">
      <input
        type="text"
        placeholder="Search address..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {results.length > 0 && (
        <ul className="mt-2">
          {results.map((feature: any, index: number) => (
            <li key={index}>
              <button
                className="text-blue-500 hover:underline focus:outline-none p-2"
                onClick={() =>
                  handleResultClick(feature.place_name, feature.center)
                }
              >
                {feature.place_name}
              </button>
            </li>
          ))}
        </ul>
      )}
      {results.length === 0 && <p className="mt-2 text-gray-500">No results found.</p>}
    </div>
  );
};

export default SearchBar;
