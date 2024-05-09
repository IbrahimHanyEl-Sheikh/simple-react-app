import "./Course.css";
import { Link } from "react-router-dom";

function Course({ name}) {
    return (
        <div className="course">
                <p className="name"> {name} </p>
        </div>
    )
}

export default Course;