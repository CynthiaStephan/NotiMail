import { useEffect } from "react";

export default function Login(){

    useEffect(() => {
        
        const requestBody = {
                 };

        fetch('http://51.83.69.229:3000/api/users/gestionEntrepriseFirmName', {
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
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    }, []);
    return(
        <>
            <h1>Page Login</h1>
            <p>Page Login</p>
        </>
    )
}