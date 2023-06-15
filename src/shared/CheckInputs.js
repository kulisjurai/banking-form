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
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (password === "" || regex.test(password)) {
    setWarning(false);
    return true;
  }
  setWarning(true);
  return false;
};

const validateEmail = (email, setWarning) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "" || regex.test(email)) {
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
  checkPasswordEquality,
  checkIfPasswordContainsSpecialCharacters,
  validateEmail,
};
