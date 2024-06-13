import "./CoursesList.css";
import Course from "./Course";
import {useState, useEffect} from "react";
import {useLoaderData, json, redirect} from 'react-router-dom';

function CoursesList({ username }) {
    const student_courses = useLoaderData();
    const [enrolledCourses, setEnrolledCourses ] = useState(student_courses || []);
    const [courses, setCourses] = useState([]);
    const fetchAllCourses = async () => {
        try {
            const response = await fetch("http://localhost:8090/api/courses/")
            console.log(response);
            console.log(response.body);
            if (!response.ok) {
                throw new Error("Bad Response");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            return [];
        }
    };

    const fetchEnrolledCourses = async () => {
        const username = localStorage.getItem('username');
        try {
            const response = await fetch(`http://localhost:8090/api/course_students/by_student?student_username=${username}`);
                // params: {
                //     student_username: username,
                // },
            // });
            console.log(`getting ${username} courses`)
            console.log(response.data);
            if (!response.ok) {
                throw new Error('Bad Response while fetching your courses...')
            }
            const data = await response.json();
            setEnrolledCourses(data);
        } catch (error) {
            console.error('Error fetching enrolled courses', error);
        }
    };
    useEffect(() => {
        const loadCourses = async () => {
            const data_courses = await fetchAllCourses();
            setCourses(data_courses);
        };
        loadCourses();
        fetchEnrolledCourses();
    }, []);

    // useEffect(() => {
    //     if (student_courses) {
    //         setEnrolledCourses(student_courses);
    //     }
    // }, [student_courses]);

    const handleCourseEnroll = async (selectedCourse) => {
        if (!enrolledCourses.some(course => course.fields.name === selectedCourse)) {
            try {
                const username = localStorage.getItem('username');
                const response = await fetch('http://localhost:8090/api/course_students/', {
                    method: 'POST',
                    body: JSON.stringify({username: username, course:selectedCourse}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to enroll you in this course');
                }

                setEnrolledCourses([...enrolledCourses, {fields: { name: selectedCourse}}]);
                console.log(`${selectedCourse} course added!`);
                console.log(response)
            } catch (error) {
                console.error(`Error enrolling in course: `, error);
            }
        } else {
            console.log(`You have already enrolled in ${selectedCourse}`);
        }
    };

    const handleDropCourse = async (courseName) => {
        try {
            const username = localStorage.getItem('username');
            const response = await fetch('http://localhost:8090/api/course_students/drop/', {
                method: 'DELETE',
                body: JSON.stringify({student_username: username, course: courseName}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to drop this course')
            }
            setEnrolledCourses(enrolledCourses.filter(course => course.fields.name !== courseName));
            console.log(`${courseName} course dropped!`);
        } catch (error) {
            console.error('Error dropping course: ', error);
        }
    };

    return (
        <>
        <div className="dropdown">
            <select onChange={(e) => handleCourseEnroll(e.target.value)}>
                <option value="" disabled selected hidden>Select a course</option>
                {courses.map((course) => (
                  <option key={course.fields.id} value={course.fields.name}>{course.fields.name}</option>
                ))}
            </select>

        </div>
        {enrolledCourses.length > 0 && (
            <ul className="courses">
                <li>
                    {enrolledCourses.map((course) => (
                        <Course key={course.fields.id} name={course.fields.name} onDrop={handleDropCourse}/>
                    ))}
                </li>
            </ul>
        )}
        {enrolledCourses.length === 0 && (
            <div style={{textAlign: "center", color: "white"}}>
                <h2>You haven't enrolled in any course yet.</h2>
                <p>Enroll in some!</p>
            </div>
        )}
        </>
    );
}

export default CoursesList;

export async function loader({params}) {
    const username = localStorage.getItem('username');
    const response = await fetch(`http://localhost:8090/api/course_students/by_student/?username=${username}`);
    if (response.ok){
        const data = await response.json();
        return data;
    } else {
        throw json({message: 'Could not fetch your enrolledcourses'}, {status: response.status});
    }
}

export async function action({request}) {
    const data = await request.formData();
    const course = data.get('course');
    const username = localStorage.getItem('username');

    const response = await fetch('http://localhost:8090/api/course_students/', {
        method: 'POST',
        body: JSON.stringify({username, course}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw json({ message: 'Failed to enroll in the course' }, { status: response.status });
    }

    return redirect('/home');
}