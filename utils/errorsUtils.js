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
