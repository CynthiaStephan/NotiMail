import "./SendMessage.css"
export default function SendMessage() {

    return(
        <>
            <h2>Vous vous apprêtez à notifier :</h2>
            <div>
                <ul></ul>
            </div>
            <div>
                <button className="">Annuler</button>
                <button type="submit">Envoyer</button>
            </div>
        </>
    )
}