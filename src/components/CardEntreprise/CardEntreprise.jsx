import React, { useState, useEffect } from "react";
import { FaPenToSquare, FaPhone, FaAt } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { Checkbox, Spinner } from "evergreen-ui";
import './CardEntreprise.css'



export default function CardEntreprise(){

    /* Afficher ou pas la 2e partie de la card */
    const [visible, setVisible] = useState(false);
    const toggleVisibility = () => {
      setVisible(!visible);
    };

    /* Vérification de la reception du courrier. */
    const [courrierReceptionne, setCourrierReceptionne] = useState(false);


    /* Vérifier que l'information a bien été récupéré*/
    const [load, setLoad] = useState(true);
    
    /* Checkbox */
    const [checked, setChecked] = React.useState(true)
    // Permet de selectionner les cases individuellement.
    const [selectedCompanies, setSelectedCompanies] = useState({});


    /* Fetch pour récupérer les informations d'entreprise */
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        
        const requestBody = {
                 };

        fetch('http://51.83.69.229:3000/api/users/gestionEntreprise', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
      
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            return response.json();
        })
        .then((data) => {
            // setCompanies(data)
            // setLoad(false);
            // console.log(data)
            setCompanies(data);
            const receptionne = data.some(company => company.has_mail); // Vérifiez si au moins une entreprise a reçu le courrier
            setCourrierReceptionne(receptionne);
            setLoad(false);
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur:', error);
            setLoad(false);
        });
    }, []);
    
    const handleCheckboxChange = (companyId) => {
        setSelectedCompanies(prevState => ({
            ...prevState,
            [companyId]: !prevState[companyId],
        }));
    };
    
    
    return(
        <>
            <div className="companies-card-frame">
            {/* Je m'assure que l'information est bien chargé */}
            {load ? (
                <Spinner size={24} />
            ) : (
            companies && companies.map((items, index) => (


                <div className="companie-card" key={index}>

                    <div className="top-companie-card">
                        <div className="top-left-card">
                            <div className="pastille-edit-frame">
                                <div className={`pastille ${courrierReceptionne ? 'pastille-verte' : 'pastille-rouge'}`}></div>
                                <IconContext.Provider value={{ color: "white", className: "card-button", size:"24px" }}>
                                    <FaPenToSquare />
                                </IconContext.Provider>
                            </div>

                            <div  onClick={toggleVisibility}>
                                <h2>{companies[index].firm_name}</h2>
                                <p>{companies[index].first_name} {companies[index].last_name}</p>
                                <p>{companies[index].last_picked_up || `N'a pas encore reçu de courrier`}</p>
                            </div>
                        </div>

                        <div>
                            {/* <Checkbox
                            checked={checked}
                            onChange={e => setChecked(e.target.checked)}
                            /> */}
                            <Checkbox
                                checked={selectedCompanies[companies[index]._id]}
                                onChange={() => handleCheckboxChange(companies[index]._id)}
                            />

                        </div>

                    </div>

                    {visible && (
                        <IconContext.Provider value={{ color: "white", className: "", size:"30px" }}>
                        <div className="bottom-companie-card">
                            <div>
                                <FaAt />
                                <a href={`mailto:${companies[index].email}`}>{companies[index].email}</a>
                            </div>

                            <div>
                                <FaPhone />
                                <a href={`tel:${companies[index].phone_number}`}>{companies[index].phone_number}</a>
                            </div>
                        </div>
                        </IconContext.Provider>
                    )}
                </div>
                ))
            )}
            
            </div>
        </>
    )
}
