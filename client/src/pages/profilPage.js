import React from "react";
import Log from "../components/log";

const profilPage = () => {
  return (
    <div className="profil-page">
      <div className="log-container">
        <Log signIn={false} />
        <div className="img-container">
          <img src="./img/log.svg" alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default profilPage;
