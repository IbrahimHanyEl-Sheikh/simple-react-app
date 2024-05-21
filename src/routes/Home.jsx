import "../components/App.css";
import "./Home.css";
import { Outlet } from 'react-router-dom';
import CoursesList from "../components/CoursesList";


function Home() {
    const username = localStorage.getItem('username');
    return (
        <>
        <Outlet />
        <main>
            <CoursesList username={username} />
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