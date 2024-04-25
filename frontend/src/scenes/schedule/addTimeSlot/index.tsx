import React, { useState, useEffect } from 'react';
import placeholderData from "../MOCK_DATA.json";
import currData from "../CURR_DATA.json";
import { Link } from 'react-router-dom';
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
  const handleAddTimeSlot = () => {
    const newData = [...currData, ...filteredData];
    // You might want to add additional logic to prevent duplicates or handle conflicts
    // For simplicity, this example just appends the filtered data to the current data
    // You can implement more sophisticated logic based on your requirements
    // For example, checking for duplicates before adding
    console.log(newData);
    handleReset()
    // This is where you can save newData to CURR_DATA.json or take any further actions
  };

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
          const section = foundSection.sectionid
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
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="mb-4 text-3xl font-bold">Add Time Slot </h1>
      <div className="mt-8">
        <div className="mb-16">
          <label htmlFor="subject" className="mr-2 text-xl">Subject:</label>
          <select
            id="subject"
            className="border rounded p-2"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {(subjectList as any[]).map((subject, index) => (
              <option key={index} value={subject.classsubject}>{subject.classsubject}</option>
            ))}
          </select>
        </div>
        <div className="mb-16">
          <label htmlFor="course" className="mr-2 text-xl">Course:</label>
          <select
            id="course"
            className="border rounded p-2"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {(courseList as any[]).map((course, index) => (
              <option key={index} value={course.coursenumber}>{course.coursenumber}</option>
            ))}
          </select>
        </div>
        <div className="mb-16">
          <label htmlFor="section" className="mr-2 text-xl">Section:</label>
          <select
            id="section"
            className="border rounded p-2"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>
            {(sectionList as any[]).map((section, index) => (
              <option key={index} value={section.section}>{section.section}</option>
            ))}
          </select>
        </div>
        {/* Display submit button only when all form fields are filled */}
        {(selectedSubject && selectedCourse && selectedSection) && (
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        )}
      </div>
      {/* Display filtered data only after form submission */}
      {formSubmitted && selectedClass && (
        <div className="mt-8">
          <h2>Selected Class:</h2>
          <div className="flex flex-wrap justify-center gap-4">
              <div className="max-w-xs w-full sm:w-64 rounded overflow-hidden shadow-lg bg-primary-red">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{selectedClass && selectedClass[0].classname}</div>
                  <p className="text-slate-300 text-base">
                    Type: class <br />
                    Days: {selectedClass && selectedClass[0].daysofweek}<br />
                    Location: {selectedClass && selectedClass[0].buildingname}<br />
                    Time: {selectedClass && selectedClass[0].starttime}-{selectedClass[0].endtime}
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
      <Link to="/schedule" className="mt-4 text-blue-500 hover:text-blue-700">Back to Schedule</Link>
    </div>
  );
  }

export default AddTimeSlot;
