//création de la page de connexion

// Import des composants nécessaires depuis Evergreen UI et React
import {
    Autocomplete,
    Button,
    Pane,
    SelectMenu,
    TextInput,
  } from "evergreen-ui";
  import React, { useState, useEffect } from "react";
  import { FaChevronDown, FaUnlock } from "react-icons/fa6";
  import "./login.css"; // Import du fichier CSS pour la page de connexion
  import { Navigate, useNavigate } from "react-router-dom";
  
  // Définition du composant de connexion
  const Login = () => {
    // États pour gérer les données de l'utilisateur et l'état de connexion
    const [password, setPassword] = useState(""); // Mot de passe
    const [entreprise, setEntreprise] = useState([]); // Liste des entreprises récupérée depuis l'API
    const [selectedCompany, setSelectedCompany] = useState(""); // Entreprise sélectionnée par l'utilisateur
    const [loggedIn, setLoggedIn] = useState(false); // État de connexion
    const [tabselect, settabselect] = useState([]); // Tableau pour stocker les noms des entreprises (utilisé dans Autocomplete)
    const [isAdmin, setIsAdmin] = useState("");
    const navigate = useNavigate();
    const [firmName, setFirmName] = useState("");

  
    // Vérifier si le bouton de connexion doit être activé
    const isLoginButtonDisabled = !selectedCompany || !password;
  
    // Fonction appelée lorsqu'un utilisateur tente de se connecter
    const handleLogin = (e) => {
      e.preventDefault(); // Empêche le rechargement de la page par défaut
  
  
      // Construction du corps de la requête pour l'identification du client
      const requestBody = {
        firm_name: selectedCompany,
        four_digit_code: password,
      };
  
      // Requête au serveur pour vérifier les identifiants
      fetch(`http://51.83.69.229:3000/api/users/login`, {
        method: "POST", // Méthode POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Convertit l'objet en format JSON
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
  
          // Vérification du succès de la connexion
          if (data && data.message === "Identification réussie") {
            // setLoggedIn(true);
  
            // pour stocker le token ,l'Id et le nom de l'entreprise de l'utilisateur
            //et savoir si l'utilisateur est un administrateur (is_admin).
            localStorage.setItem("token", data.token);
            localStorage.setItem("_id", data.userId);
            localStorage.setItem("firm_name", data.firm_name);
            localStorage.setItem("is_admin", data.is_admin);
  
            // Mise à jour de l'état isAdmin avec la valeur de data.is_admin
            setIsAdmin(data.is_admin);
            // Mise à jour de l'état firmName avec la valeur de data.firm_name
            setFirmName(data.firm_name);
            // Affichage dans la console de la valeur actuelle de isAdmin
            console.log(isAdmin);
  
            // Si l'utilisateur est un administrateur, navigue vers la page "/admin", sinon, navigue vers la page "/user/{firmName}"
            if (data.is_admin) {
              navigate("/admin");
            } else {
              const firmName = data.firm_name;
              navigate(`/user/${firmName}`);
            }
          } else {
            // console.warn(selectedCompany, password);
            alert("Identifiants incorrects");
          }
        })
        .catch((error) => console.error(error));
    };
    // Fonction appelée lorsqu'un utilisateur soumet le formulaire
    const handleSubmit = (e) => {
      e.preventDefault();
      // Appeler votre fonction de connexion ici
      handleLogin(e);
    };
  
    // Effet pour charger la liste des entreprises depuis l'API lors du chargement de la page
    useEffect(() => {
      // Requête au serveur pour obtenir la liste des entreprises
      fetch(`http://51.83.69.229:3000/api/users/gestionEntrepriseFirmName`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          //  Vérifier si la réponse est OK
          if (!response.ok) {
            throw new Error("Réponse non valide du serveur");
          }
  
          // Vérifier le type de contenu de la réponse
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("La réponse n'est pas au format JSON");
          }
  
          // Parse la réponse en JSON
          return response.json();
        })
  
        .then((data) => {
          // Log de la réponse brute pour le débogage
  
          console.log(data);
  
          // Vérification du succès de la récupération des entreprises
          if (data.firmNames && data.firmNames.length > 0) {
            // Formatage des données pour les adapter au composant Autocomplete
  
            setEntreprise(data.firmNames);
  
            //Création d'un tableau contenant les noms des entreprises
            const tab = data.firmNames.map((el) => el.firm_name);
            // Mise à jour de l'état du tableau des noms d'entreprises
            settabselect(tab);
          } else {
            console.error("Aucune entreprise trouvée dans la réponse de l'API");
          }
        })
        .catch((error) => console.error(error));
    }, []);
  
    // Rendu de l'interface utilisateur
    return (
      <div className="login-page">
        {/* Ajout de la balise <form> autour de votre contenu de connexion */}
        <img src="./logo.png" alt="Logo de NotiMail" />
  
        <form onSubmit={handleSubmit}>
          {/* Composant Autocomplete pour la sélection de l'entreprise */}
  
          {/*  Champ d'autocomplétion(saisie semi-automatique) pour la sélection d'une entreprise */}
  
          <div className="login-name">
            <SelectMenu
              title="Entreprises"
              options={entreprise.map((label) => ({ label, value: label }))}
              selected={selectedCompany}
              onSelect={(item) => setSelectedCompany(item.value)}
            >
              <Button type="button">
                {/* bouton evergreen en submit par défaut; à mettre en type="button" pour qu'il n'envoie pas le formulaire*/}
                {selectedCompany || "Choisir une entreprise"}
              </Button>
            </SelectMenu>
          </div>
  
          {/* Champ de mot de passe */}
          <div className="login-password">
            {/* <p>{tabselect}</p> */}
            <input
              type="password"
              placeholder="Mot de passe" // Placeholder du champ de mot de passe
              value={password} // Valeur du champ de mot de passe
              onChange={(e) => setPassword(e.target.value)} // Gère le changement de la valeur du champ de mot de passe
            />
            {/* Icône de cadenas pour indiquer le champ de mot de passe */}
            <span className="lock-icon">
              <FaUnlock />
            </span>
          </div>
  
          {/* Bouton de connexion */}
          <button type="submit" disabled={isLoginButtonDisabled}>
            {/* bouton normal par défaut à mettre en type="submit" */}
            Se connecter
          </button>
        </form>
      </div>
    );
  };
  
  // Export du composant pour pouvoir l'utiliser ailleurs dans l'application
  export default Login;
  