import React, { useState, useEffect } from 'react';
import placeholderData from "../MOCK_DATA.json";
import currData from "../CURR_DATA.json";
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 
import { Passenger } from '@/shared/types';

type Props = {
  passenger: Passenger;
}

type sectionList = { 
  section: string;
  sectionid: number;
}

type courseList = { 
  coursenumber: string;
  id: number;
}

type selectedClass = { 
  buildingname: string;
  classname: string;
  daysofweek: string;
  endtime: string;
  starttime: string;
}

let classId: number = 0;
let section: number = 0;

const AddTimeSlot: React.FC<Props> = (passenger: Props) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<selectedClass>();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [subjectList, setSubjectList] = useState<string[]>([]); 
  const [courseList, setCourseList] = useState<courseList[]>([]); 
  const [sectionList, setSectionList] = useState<sectionList[]>([]); 
  const transformTime = (timeString: string): string => (parseInt(timeString.slice(0, 2)) % 12 || 12) + timeString.slice(2, 5);

  // Function to handle form submission

  // Function to reset form
  const handleReset = () => {
    setSelectedSubject('');
    setSelectedCourse('');
    setSelectedSection('');
    setFormSubmitted(false);
    setFilteredData([]);
  };

  // Function to add time slot to current data
  const handleAddTimeSlot = async () => {
    if (selectedClass !== undefined) {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/scheduler/addCourse/${classId}/${section}/${selectedClass[0].classname}/${selectedClass[0].buildingname}/${selectedClass[0].daysofweek}/${selectedClass[0].starttime}/${selectedClass[0].endtime}/${passenger.passenger.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const { data } = await response.json();
        console.log('Passenger data:', data.subject);
        setSubjectList(data.subject || []); // Use default empty array if data.subject is undefined
      } catch (error) {
        console.error('Error:', error);
      }
      handleReset()
    };
  }

    useEffect(() => {
      const fetchSubjects = async () => { 
        try {
          const response = await fetch(`http://localhost:8000/api/v1/scheduler/subjects/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
    
          const { data } = await response.json();
          console.log('Passenger data:', data.subject);
          setSubjectList(data.subject || []); // Use default empty array if data.subject is undefined
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      fetchSubjects();
    }, []);

    useEffect(() => {
      const fetchCourse = async () => { 
        try {
          console.log("RIGHT HERE")
          console.log(selectedSubject)
          const response = await fetch(`http://localhost:8000/api/v1/scheduler/subjects/course/${selectedSubject}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const { data } = await response.json();
          console.log('Passenger data:', data.course);
          setCourseList(data.course || []); // Use default empty array if data.subject is undefined
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      fetchCourse();
    }, [selectedSubject]);
    
    useEffect(() => {
      const fetchSection = async () => { 
        try {
          console.log("RIGHT HERE")
          console.log(courseList)
          const foundCourse = courseList.find(course => course.coursenumber === selectedCourse);
          if (foundCourse != undefined) { 
            classId = foundCourse.id
            const response = await fetch(`http://localhost:8000/api/v1/scheduler/subjects/course/section/${classId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            const { data } = await response.json();
            console.log('Passenger data:', data.section);
            setSectionList(data.section || []); // Use default empty array if data.subject is undefined
            console.log(sectionList)
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      fetchSection();
    }, [selectedCourse]);

    const handleSubmit = async () => {
      try {
        await fetchSelectedClass();
        setFormSubmitted(true);
        console.log("HERE")
        console.log(selectedClass)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchSelectedClass = async () => { 
      try {
        const foundSection = sectionList.find(course => course.section === selectedSection);
        console.log(foundSection)
        if (foundSection != undefined) { 
          section = foundSection.sectionid
          const response = await fetch(`http://localhost:8000/api/v1/scheduler/subjects/course/section/submit/${classId}/${section}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
      
          const { data } = await response.json();
          console.log('Passenger data:', data.slot);
          setSelectedClass(data.slot)
        } 
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    };
    useEffect(() => {
      console.log(selectedClass);
    }, [selectedClass]);

  return (
    <>
      <div className="bg-primary-green-500 text-primary-black py-5 px-6 flex items-center justify-between fixed top-0 w-full z-10">
      <Link to="/schedule" className="mr-4">
        <ChevronLeftIcon className="h-6 w-6" />
      </Link>
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-xl text-primary-black font-bold mr-10">Add Time Slots</h1>
      </div>
    </div>
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="mb-4 text-primary-black text-3xl font-bold">Add Time Slot </h1>
      <div className="mt-8">
        <div className="mb-8">
          <div className={`bg-viewTimeSlots rounded-lg p-4`}>
          <label htmlFor="subject" className="mr-2 text-primary-black text-xl">Subject:</label>
          <select
            id="subject"
            className="text-primary-blue border rounded p-2 w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {(subjectList as any[]).map((subject, index) => (
              <option key={index} value={subject.classsubject}>{subject.classsubject}</option>
            ))}
          </select>
         </div>
        </div>
        <div className="mb-8">
          <div className={`bg-viewTimeSlots rounded-lg p-4`}>
          <label htmlFor="course" className="mr-2 text-primary-black text-xl">Course:</label>
          <select
            id="course"
            className="text-primary-blue border rounded p-2 w-full"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {(courseList as any[]).map((course, index) => (
              <option key={index} value={course.coursenumber}>{course.coursenumber}</option>
            ))}
          </select>
          </div>
        </div>
        <div className="mb-8">
          <div className={`bg-viewTimeSlots rounded-lg p-4`}>
          <label htmlFor="section" className="mr-2 text-primary-black text-xl">Section:</label>
          <select
            id="section"
            className="text-primary-blue border rounded p-2 w-full"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>
            {(sectionList as any[]).map((section, index) => (
              <option key={index} value={section.section}>{section.section}</option>
            ))}
          </select>
         </div>
        </div>
        {/* Display submit button only when all form fields are filled */}
        {(selectedSubject && selectedCourse && selectedSection) && (
          <button onClick={handleSubmit} className="bg-settingsButtons hover:bg-settingsButtonsPressed text-primary-black font-bold py-2 px-4 rounded">
            Submit
          </button>
        )}
      </div>
      {/* Display filtered data only after form submission */}
      {formSubmitted && selectedClass && (
        <div className="mt-8 text-primary-black">
          <h2>Selected Class:</h2>
          <div className="flex flex-wrap justify-center gap-4">
              <div className="max-w-xs w-full sm:w-64 rounded overflow-hidden shadow-lg bg-primary-red">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{selectedClass && selectedClass[0].classname}</div>
                  <p className="text-primary-black text-base">
                    Type: class <br />
                    Days: {selectedClass && selectedClass[0].daysofweek}<br />
                    Location: {selectedClass && selectedClass[0].buildingname}<br />
                    Time: {selectedClass && transformTime(selectedClass[0].starttime)}-{transformTime(selectedClass[0].endtime)}
                  </p>
                </div>
              </div>
          </div>
          <div className="mt-4">
            <button onClick={handleAddTimeSlot} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
              Add Time Slot
            </button>
            <button onClick={handleReset} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Back
            </button>
          </div>
        </div>
      )}
      <div className='py-12'></div>
    </div>
   </>
  );
  }

export default AddTimeSlot;
