import classes from "../LoginRegister.module.css";
import { useNavigate } from 'react-router-dom';

function Modal({children}) {
    const navigate = useNavigate();

    function closeHandler() {
        navigate('..');
    }

    return (
        <>
        <div className={classes.backdrop} onClick={closeHandler}/>
        <dialog open className={classes.modal}>
            <div className={classes.wrapper}>
                {children}
            </div>
        </dialog>
        </>
    )
}

export default Modal;