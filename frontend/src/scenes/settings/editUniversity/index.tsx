import React, { useEffect, useState } from 'react'

type University = {
  id: number
  name: string
}

const EditUniversity = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [universities, setUniversities] = useState<University[]>([])

  // Function to simulate fetching universities based on search term
  const fetchUniversities = (searchTerm: string) => {

    const mockUniversities: University[] = [
      { id: 1, name: 'Acadia University' },
      { id: 2, name: 'Baylor University' },
      { id: 3, name: 'Fort Lewis College' },
      { id: 4, name: 'Louisiana Tech University' },
      { id: 5, name: 'Rollins College' },
      { id: 6, name: 'Southern Oregon University' },
      { id: 7, name: 'St. Olaf College' },
      { id: 8, name: 'Truman State University' },
      { id: 9, name: 'University of the Ozarks' },
      { id: 10, name: 'Western New England University' },
    ]

    // Simulate filtering based on search term
    const filteredUniversities = mockUniversities.filter((uni) =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Update state with filtered universities
    setUniversities(filteredUniversities)
  }

  useEffect(() => {
    fetchUniversities('')
  }, [])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    fetchUniversities(e.target.value)
  }

  // Handle click on university button
  const handleClickUniversity = (name: string) => {
    console.log(name)
  }

  return (
    <div className="p-4 px-12">
      <div className="text-2xl font-bold mb-4 px-14" style={{ whiteSpace: 'nowrap' }}>
        Edit University
      </div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        className="px-4 py-1 mb-4 border border-gray-300 rounded"
        style={{ width: "calc(100% - 2rem)", marginLeft: '0.9rem' }}
      />
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {universities.map((uni) => (
          <button 
            key={uni.id} 
            onClick={() => handleClickUniversity(uni.name)}
            className="border border-gray-300 p-2 mb-2 rounded hover:bg-gray-100 focus:outline-none w-full"
            style={{ minWidth: '10rem' }}
          >
            {uni.name}
          </button>
        ))}
        {universities.length === 0 && <p>No universities found.</p>}
      </div>
    </div>
  )
}

export default EditUniversity
