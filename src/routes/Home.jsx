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
