import React, { useContext } from "react";
import Log from "../components/log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/profil/UpdateProfil";

const ProfilPage = () => {
  const uid = useContext(UidContext);

  return (
    // uid? <div>User {uid} Profil Page</div> : <div>You need to be logged in to access this page</div>,

    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <Log signIn={false} />
          <div className="img-container">
            <img src="./img/log.svg" alt="avatar" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilPage;
