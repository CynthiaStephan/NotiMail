
import { useEffect, useState } from "react"
import "./SendMessage.css"

export default function SendMessage({ selectedCompanies }) {
    // Utiliser useState pour stocker les IDs
    const [selectedIds, setSelectedIds] = useState([]);
    const [test, setTest] = useState([]);

    useEffect(() => {
        // Vérifier que selectedCompanies est un objet
        if (typeof selectedCompanies === 'object' && selectedCompanies !== null) {
            // Extraire les valeurs de l'objet et map pour créer le tableau d'objets avec _id
            const idsArray = Object.values(selectedCompanies).map(company => company._id);
            setSelectedIds(idsArray);
        }
    }, [selectedCompanies]);

    useEffect(() => {
        const test = selectedCompanies.map(id => id._id);
        setTest(test);
    }, []);


    const dataToSend = {
        _id: selectedIds,
    }

    console.log(dataToSend);
    console.log(test);

    const handleSend = () => {
        fetch('http://51.83.69.229:3000/api/users/sendModalEntreprise' , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(test),
        })
        .then(response => {
            // Gérer la réponse selon vos besoins
            console.log(response)
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
    }

    return(
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
