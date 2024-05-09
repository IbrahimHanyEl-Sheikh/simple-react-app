import "./CoursesList.css";
import Course from "./Course";
// import { useLoaderData } from "react-router-dom";
import {useState} from "react";

function CoursesList() {
    // const courses = useLoaderData();
    const [enrolledCourses, setEnrolledCourses ] = useState([]);
    const courses = ["HTML","CSS","JavaScript","ReactJS","NodeJs"];
    
    function handleCourseEnroll(selectedCourse) {
        if (!enrolledCourses.includes(selectedCourse)) {
            setEnrolledCourses(prevEnrolledCourses => [...prevEnrolledCourses, selectedCourse]);
            console.log(`${selectedCourse} course added!`);
            console.log({enrolledCourses});
        } else {
            console.log(`You are already enrolled in ${selectedCourse}!`);
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