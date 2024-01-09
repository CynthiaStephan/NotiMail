import React, { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { Checkbox } from "evergreen-ui";

export default function CardEntreprise(){

    /* Afficher ou pas la 2e partie de la card */
    const [visible, setVisible] = useState(false);
    const toggleVisibility = () => {
      setVisible(!visible);
    };
    /* Checkbox */

    const [checked, setChecked] = React.useState(true)
    
    return(
        <>
            <div>

                <div>
                    <div className="pastille"></div>
                    <IconContext.Provider value={{ color: "white", className: "card-button", size:"24px" }}>
                        <FaPenToSquare />
                    </IconContext.Provider>
                </div>

                <div>
                    <h2>Zenith Dynamics</h2>
                    <p>Marion P.</p>
                    <p>19/09/2023</p>
                </div>

                <div>
                    <Checkbox
                    checked={checked}
                    onChange={e => setChecked(e.target.checked)}
                    />
                </div>

            </div>

            {/* <p onClick={toggleVisibility}>NovaSphere Solutions</p>

            {visible && (
                <div>
                    <p>Ceci est la div dont la visibilité sera modifiée</p>
                </div>
            )} */}
            

        </>
    )
}