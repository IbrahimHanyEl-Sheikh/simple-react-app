import "./CoursesList.css";
import Course from "./Course";
// import { useLoaderData } from "react-router-dom";
import {useState, useEffect} from "react";
import {useLoaderData, json, redirect} from 'react-router-dom';

function CoursesList({ username }) {
    const student_courses = useLoaderData();
    const [enrolledCourses, setEnrolledCourses ] = useState(student_courses || []);
    
    const fetchAllCourses = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/courses/")
            console.log(response);
            console.log(response.body);
            return response.data;
            //   setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    const data_courses = fetchAllCourses();
    // const response = data_courses.json();
    const courses = [data_courses.name];
    console.log(courses);
    
    useEffect(() => {
        if (student_courses) {
            setEnrolledCourses(student_courses);
        }
    }, [student_courses]);

    function handleCourseEnroll(selectedCourse) {
        if (!enrolledCourses.includes(selectedCourse)) {
            setEnrolledCourses([...enrolledCourses, selectedCourse]);
            console.log(`${selectedCourse} course added!`);
            console.log({enrolledCourses});
        } else {
            console.log(`You have already enrolled in ${selectedCourse}!`);
        }
    }

    return (
        <>
        <div className="dropdown">
            <select onChange={(e) => handleCourseEnroll(e.target.value)}>
                <option value="" disabled selected hidden>Select a course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
            </select>
            {/* <button onClick={handleCourseEnroll}>+</button> */}
        </div>
        {enrolledCourses.length > 0 && (
            <ul className="courses">
                <li>
                    {enrolledCourses.map((course) => (
                        <Course key={course} name={course}/>
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
    const response = await fetch(`http://localhost:8000/api/course_students/by_student/?username=${username}`);
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

    const response = await fetch('http://localhost:8000/api/course_students/', {
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