import React, { useState } from "react";
import { FaPenToSquare, FaPhone, FaAt } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { Checkbox, Spinner } from "evergreen-ui";



export default function CardEntreprise(){

    /* Afficher ou pas la 2e partie de la card */
    const [visible, setVisible] = useState(false);
    const toggleVisibility = () => {
      setVisible(!visible);
    };

    /* Vérifier que l'information a bien été récupéré*/
    const [load, setLoad] = useState(true);
    
    /* Checkbox */
    const [checked, setChecked] = React.useState(true)

    /* Fetch pour récupérer les informations d'entreprise */
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        
        const requestBody = {
                 };

        fetch('http://51.83.69.229:3000/api/users/gestionEntreprise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            return response.json();
        })
        .then((data) => {
            setCompanies(data)
            setLoad(false);
            console.log(data)
        })
        .catch(error => {
            console.error('Erreur:', error);
            setLoad(false);
        });
    }, []);
    
    
    
    return(
        <>
            {/* Je m'assure que l'information est bien chargé */}
            {load ? (
                <Spinner size={24} />
            ) : (
            companies && companies.map((items, index) => (

                <div className="companie-card" key={index}>

                    <div className="top-companie-card">
                        <div>
                            <div className="pastille"></div>
                            <IconContext.Provider value={{ color: "white", className: "card-button", size:"24px" }}>
                                <FaPenToSquare />
                            </IconContext.Provider>
                        </div>

                        <div  onClick={toggleVisibility}>
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

                    {visible && (
                        <IconContext.Provider value={{ color: "white", className: "", size:"30px" }}>
                        <div className="bottom-companie-card">
                            <div>
                                <FaAt />
                                <a href=""></a>
                            </div>

                            <div>
                                <FaPhone />
                                <a href=""></a>
                            </div>
                        </div>
                        </IconContext.Provider>
                    )}
                </div>
                ))
            )}


            {/* <p onClick={toggleVisibility}>NovaSphere Solutions</p>

            {visible && (
                <div>
                    <p>Ceci est la div dont la visibilité sera modifiée</p>
                </div>
            )} */}
            

        </>
    )
}