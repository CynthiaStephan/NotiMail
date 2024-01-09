import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
export default function Notification() {

    return(
        <>
            <div className="notifModal">
                <h2>Confimer la réception  du courrier</h2>
                <div>
                    <button><FaXmark /></button>
                    <button><FaCheck /></button>
                </div>
            </div>
        </>
    )
}