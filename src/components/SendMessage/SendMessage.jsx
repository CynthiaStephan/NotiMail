import { useEffect, useState } from "react"
import "./SendMessage.css"

export default function SendMessage({ selectedCompanies }) {
    // Utiliser useState pour stocker les IDs
    const [selectedIds, setSelectedIds] = useState([]);
    const [adminId, setAdminId] = useState('');

    
    useEffect(() => {
        // Vérifier que selectedCompanies est un tableau
        if (Array.isArray(selectedCompanies)) {
            // Extraire les _id de chaque objet et créer le tableau d'objets avec _id
            const idsArray = selectedCompanies.map(company => company._id);
            setSelectedIds(idsArray);
        }
    }, [selectedCompanies]);

    useEffect(() => {
        const getAdminId = localStorage.getItem("_id");
        setAdminId(getAdminId);
    }, []);

    

    const handleSend = () => {
        // Utiliser URLSearchParams pour construire les paramètres de l'URL
        const urlSearchParams = new URLSearchParams();
        selectedIds.forEach(id => urlSearchParams.append("userId", id));

        // Construire l'URL avec les paramètres
        const url = `http://51.83.69.229:3000/api/users/sendModalEntreprise?adminId=${adminId}&${urlSearchParams.toString()}`;

        // Effectuer la requête
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            // Ne pas envoyer de données dans le corps de la requête
        })
        .then(response => {
            // Gérer la réponse selon vos besoins
            console.log(response)
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
    }

    return (
        <>
            <h2>Vous vous apprêtez à notifier :</h2>
            <div>
                <ul></ul>
            </div>
            <div>
                <button className="sendmessage-cancel">Annuler</button>
                <button 
                    className="sendmessage-send" 
                    type="submit"
                    onClick={handleSend}
                >
                    Envoyer
                </button>
            </div>
        </>
    )
}
