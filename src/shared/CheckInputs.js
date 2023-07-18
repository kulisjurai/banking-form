const checkIfNumber = (e, setNumber, setWarning) => {
  const regex = /^[0-9\b]+$/;
  if (e.target.value === "" || regex.test(e.target.value)) {
    setNumber(e.target.value);
    setWarning(false);
  } else {
    setWarning(true);
  }
};

const checkIfPasswordContainsSpecialCharacters = (password, setWarning) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=[\]{}|;':",./<>?]{8,20}$/;
  if (password !== "" || regex.test(password)) {
    setWarning(false);
    return true;
  }
  setWarning(true);
  return false;
};

const checkCompanyName = (companyName, setWarning) => {
  if (companyName !== "") {
    setWarning(false);
    return true;
  }
  setWarning(true);
  return false;
};

const checkStreet = (street, setWarning) => {
  if (street !== "") {
    setWarning(false);
    return true;
  }
  setWarning(true);
  return false;
};

const checkCity = (city, setWarning) => {
  if (city !== "") {
    setWarning(false);
    return true;
  }
  setWarning(true);
  return false;
};

const checkZipCode = (zipCode, setWarning) => {
  if (zipCode !== "") {
    setWarning(false);
    return true;
  }
  setWarning(true);
  return false;
};

const checkUsername = (username, setWarning) => {
  if (username !== "") {
    setWarning(false);
    return true;
  }
  setWarning(true);
  return false;
};

const validateEmail = (email, setWarning) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email !== "" || regex.test(email)) {
    setWarning(false);
    return true;
  }
  setWarning(true);
  return false;
};

const checkPasswordEquality = (password, retypePassword, setWarning) => {
  if (password === retypePassword) {
    setWarning(false);
    return true;
  }
  setWarning(true);
  return false;
};

export {
  checkIfNumber,
  checkIfPasswordContainsSpecialCharacters,
  checkCompanyName,
  checkStreet,
  checkCity,
  checkZipCode,
  validateEmail,
  checkUsername,
  checkPasswordEquality,
};
