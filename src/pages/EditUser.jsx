import { useParams } from "react-router-dom";

export default function EditUser(){

        const { firmname } = useParams();

        console.log('firmname:', firmname); 
      
        // Utilisez le firmname comme nécessaire dans votre composant
        // ...
    return(
        <>
        <h1> Bonjour ! {firmname}</h1>
        </>
    )
}