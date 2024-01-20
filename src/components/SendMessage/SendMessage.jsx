
// import { useEffect, useState } from "react"
// import "./SendMessage.css"

// export default function SendMessage({ selectedCompanies }) {
//     // Utiliser useState pour stocker les IDs
//     const [selectedIds, setSelectedIds] = useState([]);

//     useEffect(() => {
//         // Vérifier que selectedCompanies est un tableau
//         if (Array.isArray(selectedCompanies)) {
//             // Extraire les _id de chaque objet et créer le tableau d'objets avec _id
//             const idsArray = selectedCompanies.map(company => ({ _id: company._id }));
//             setSelectedIds(idsArray);
//         }
//     }, [selectedCompanies]);

//     const dataToSend = {
//         selectedIds,
//     }

//     console.log("Data to send:", dataToSend);
//     console.log(selectedIds)

//     const handleSend = () => {
//         fetch('http://51.83.69.229:3000/api/users/sendModalEntreprise' , {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(dataToSend),
//         })
//         .then(response => {
//             // Gérer la réponse selon vos besoins
//             console.log(response)
//         })
//         .catch(error => {
//             console.error('Erreur :', error);
//         });
//     }

//     return(
//         <>
//             <h2>Vous vous apprêtez à notifier :</h2>
//             <div>
//                 <ul></ul>
//             </div>
//             <div>
//                 <button className="sendmessage-cancel">Annuler</button>
//                 <button 
//                     className="sendmessage-send" 
//                     type="submit"
//                     onClick={handleSend}
//                 >
//                     Envoyer
//                 </button>
//             </div>
//         </>
//     )
// }

import { useEffect, useState } from "react"
import "./SendMessage.css"

export default function SendMessage({ selectedCompanies }) {
    // Utiliser useState pour stocker les IDs
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        // Vérifier que selectedCompanies est un tableau
        if (Array.isArray(selectedCompanies)) {
            // Extraire les _id de chaque objet et créer le tableau d'objets avec _id
            const idsArray = selectedCompanies.map(company => company._id);
            setSelectedIds(idsArray);
        }
    }, [selectedCompanies]);

    const handleSend = () => {
        // Utiliser URLSearchParams pour construire les paramètres de l'URL
        const urlSearchParams = new URLSearchParams();
        selectedIds.forEach(id => urlSearchParams.append("userId", id));

        // Construire l'URL avec les paramètres
        const url = `http://51.83.69.229:3000/api/users/sendModalEntreprise?${urlSearchParams.toString()}`;

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
