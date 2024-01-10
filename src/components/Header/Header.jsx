import { useEffect, useState } from 'react'
import './Header.css'

export default function Header(){

    const[firmName, setFirmName] = useState('')

    useEffect(() => {
        fetch('http://51.83.69.229:3000/api/users/gestionEntreprise')
        .then(response => {
            // Vérification de la réponse HTTP (status 200 indique une réponse réussie)
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des données');
            }
            // Conversion de la réponse en format JSON et retourne la promesse
            return response.json();
          })
        .then((data) => {
            setFirmName(data)
            console.log(data)
        })
        .catch(error => console.error('Erreur:', error)); // Gestion des erreurs.

    },[]);
    

    // Récupérer qui est l'utilisateur, et en fonction afficher dans P l'utilisateur
    return(
        <>
            <div>
                <img src="./Logo.png" alt="Logo NotiMail" />
                <div>
                    <p>Nom du compte</p>
                    <button type="button" id="logoutButton" aria-label="Se déconnecter">
                        Deconnexion
                    </button>
                </div>
            </div>
            
        </>
    )
}