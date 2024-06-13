import { IonIcon } from "@ionic/react";
import "./Course.css";
// import { Link } from "react-router-dom";
import { trashOutline } from 'ionicons/icons';

function Course({name, onDrop}) {
    return (
        <div className="course">
                <p className="name"> {name} </p>
                <button className="drop-button" onClick={() => onDrop(name)}>
                    <IonIcon icon={trashOutline}/>
                </button>
        </div>
    )
}

export default Course;