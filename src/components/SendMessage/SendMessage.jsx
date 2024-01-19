// import { useEffect, useState } from "react"
// import "./SendMessage.css"

// export default function SendMessage(selectedCompanies) {
//      // Utiliser useState pour stocker les IDs
//      const [selectedIds, setSelectedIds] = useState([]);

//      // Effet pour mettre à jour les IDs lorsque selectedCompanies change
//      useEffect(() => {
//          // Extraction des IDs de selectedCompanies et mise à jour de selectedIds
//          const ids = selectedCompanies.map(company => company._id);
//          setSelectedIds(ids);
//      }, [selectedCompanies]);
 
//      const dataToSend = {
//          _id: selectedIds,
//      }

//     const handleSend = () => {
//         fetch('http://51.83.69.229:3000/api/users/sendModalEntreprise' , {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(dataToSend),
//         })
//         .then(response => {
            
//         })
//         .catch(error => {
//             console.error('Error:', error);
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
//                 className="sendmessage-send" 
//                 type="submit"
//                 onClick={handleSend}
//                 >Envoyer</button>
//             </div>
//         </>
//     )
// }

import { useEffect, useState } from "react"
import "./SendMessage.css"

export default function SendMessage({ selectedCompanies }) {
    // Utiliser useState pour stocker les IDs
    const [selectedIds, setSelectedIds] = useState([]);

    // Effet pour mettre à jour les IDs lorsque selectedCompanies change
    useEffect(() => {
        // Vérifier que selectedCompanies est un tableau avant de l'utiliser
        if (Array.isArray(selectedCompanies)) {
            // Extraction des IDs de selectedCompanies et mise à jour de selectedIds
            const ids = selectedCompanies.map(company => company._id);
            setSelectedIds(ids);
        }
    }, [selectedCompanies]);

    const dataToSend = {
        _id: selectedIds,
    }

    console.log(JSON.stringify(dataToSend));

    const handleSend = () => {
        fetch('http://51.83.69.229:3000/api/users/sendModalEntreprise' , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
        .then(response => {
            // Gérer la réponse selon vos besoins
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
