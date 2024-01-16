import React, { useState, useEffect } from "react";
import { FaPenToSquare, FaPhone, FaAt } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { Spinner } from "evergreen-ui";
import './CardEntreprise.css'
import { Link } from "react-router-dom";



export default function CardEntreprise({ searchTerm }) {

    /* Afficher ou pas la 2e partie de la card */
    const [visibilityMap, setVisibilityMap] = useState({});
    // Fonction pour basculer la visibilité d'une entreprise spécifique
    const toggleVisibility = (companyId) => {
        setVisibilityMap(prevState => ({
        ...prevState,
        [companyId]: !prevState[companyId],
        }));
    };

    /* Vérification de la reception du courrier. */
    const [courrierReceptionne, setCourrierReceptionne] = useState(false);

    /* Vérifier que l'information a bien été récupéré*/
    const [load, setLoad] = useState(true);
    
    /* Checkbox */
    const [checked, setChecked] = React.useState(true);
    // Permet de selectionner les cases individuellement.
    const [selectedCompanies, setSelectedCompanies] = useState({});

    /* Fetch pour récupérer les informations d'entreprise */
    const [companies, setCompanies] = useState([]);

    // État pour stocker les entreprises filtrées
    const [filteredCompanies, setFilteredCompanies] = useState([]);



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

    useEffect(() => {
        if (searchTerm && searchTerm.trim() !== '') {
          const filteredData = companies.filter((company) => {
            const { firm_name, first_name, last_name } = company;
            const searchRegex = new RegExp(searchTerm, 'i');
    
            return (
              searchRegex.test(firm_name) ||
              searchRegex.test(first_name) ||
              searchRegex.test(last_name)
            );
          });
    
          setFilteredCompanies(filteredData);
        } else {
          setFilteredCompanies(companies);
        }
      }, [searchTerm, companies]);



    // Permet de différencier les checkbox
    const handleCheckboxChange = (companyId) => {
        setSelectedCompanies(prevState => ({
            ...prevState,
            [companyId]: !prevState[companyId],
        }));
    };

    // Au click sur l'icone edit envoie des données vers nouvelle page dans l'url
    const handleIconClick = (firm_name) => {
        // Naviguer vers la nouvelle page avec les données
        const editPath = `/admin/${firm_name}`;
        history.push(editPath);
    };

    
    
    
    return(
        <>
            <div className="companies-card-frame">
            {/* Je m'assure que l'information est bien chargé */}
            {load ? (
                <Spinner size={24} />
            ) : (
                filteredCompanies &&
                filteredCompanies.map((company, index) => (


                <div className="companie-card" key={index}>

                    <div className="top-companie-card">
                        <div className="top-left-card">

                            <div className="pastille-edit-frame">
                                
                                <div className={`pastille ${courrierReceptionne ? 'pastille-verte' : 'pastille-rouge'}`}></div>

                                <Link to={`/admin/${company.firm_name}`}>
                                    <IconContext.Provider value={{ color: "white", className: "card-button", size:"24px" }}>
                                        <FaPenToSquare />
                                    </IconContext.Provider>
                                </Link>

                            </div>

                            <div className="card-open" onClick={() => toggleVisibility(company._id)}>

                                <h2>{company.firm_name}</h2>

                                <p>{company.first_name} {company.last_name}</p>

                                <p>{company.last_picked_up || `N'a pas encore reçu de courrier`}</p>

                            </div>
                        </div>

                        <div>                        
                            {/* <Checkbox
                                className="card-selection"
                                checked={selectedCompanies[company._id]}
                                onChange={() => handleCheckboxChange(company._id)}
                            /> */}
                            
                                <input
                                    type="checkbox"
                                    className="card-selection"
                                    checked={!!selectedCompanies[company._id]}
                                    onChange={() => handleCheckboxChange(company._id)}
                                />

                        </div>

                    </div>

                    {visibilityMap[company._id] && (
                        <IconContext.Provider value={{ color: "white", className: "companies-icons", size:"24px" }}>
                        <div className="bottom-companie-card">
                            <div>
                                <FaAt />
                                <a href={`mailto:${company.email}`}>{company.email}</a>
                            </div>

                            <div>
                                <FaPhone />
                                <a href={`tel:${company.phone_number}`}>{company.phone_number}</a>
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
