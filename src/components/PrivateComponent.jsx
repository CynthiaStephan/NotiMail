import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  // Récupère la valeur du statut d'administrateur depuis le stockage local
  const auth = localStorage.getItem("is_admin");

  //auth= authentification

  console.log("Valeur d'authentification:", auth);

  // Vérifie si l'utilisateur est un administrateur
  const isAdmin = auth === "true"; // Assurez-vous que la comparaison est correcte selon la façon dont vous stockez la valeur

  console.log("Est un administrateur:", isAdmin);

  // Redirige l'utilisateur en fonction de son statut
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateComponent;