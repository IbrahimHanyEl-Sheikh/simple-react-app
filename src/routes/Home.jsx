import "../components/App.css";
import "./Home.css";
import { Outlet } from 'react-router-dom';
import CoursesList from "../components/CoursesList";


function Home() {
    
    return (
        <>
        <Outlet />
        <main>
            <CoursesList />
        </main>
        </>
    )
}
export default Home;

// export async function loader() {
//     const response = await fetch('http://localhost:8000/course_students/by_student/')
//     const resData = await response.json();
//     return resData.courses;
// }