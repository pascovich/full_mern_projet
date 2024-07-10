export const signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo")) {
    errors.pseudo = "pseudo incorrect ";
  }
  if (err.message.includes("email")) {
    errors.email = "email incorrect";
  }
  if (err.message.includes("password")) {
    errors.password = "password doit >=6 chars ";
  }
  if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) {
    errors.pseudo = "pseudo deja pris";
  }
  if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("email")) {
    errors.email = "email deja pris";
  }

  return errors;
};

export const signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) {
    errors.email = "email incorrect";
  }
  if (err.message.includes("password")) {
    errors.password = "password incorect ";
  }
  return errors;
};

export const uploadFileError = (err) => {
  let errors = { format: "", size: "" };
  if (err.message.includes("invalide format")) {
    errors.format = "format de image est invalide";
  }
  if (err.message.includes("max size")) {
    errors.format = "la taille de l'image doit pas depasser le 500ko";
  }
};
