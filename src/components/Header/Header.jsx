import './Header.css'
export default function Header(){

    

    // Récupérer qui est l'utilisateur, et en fonction afficher dans P l'utilisateur
    return(
        <>
            <header>
                <img src="./Logo.png" alt="Logo NotiMail" />
                <div>
                    <p>Nom du compte</p>
                    <button type="button" id="logoutButton" aria-label="Se déconnecter">
                        Deconnexion
                    </button>
                </div>
            </header>
        </>
    )
}