const checkIfNumber = (e, setNumber, setWarning) => {
  const regex = /^[0-9\b]+$/;
  console.log(e.target.value, "dssdssdsds");
  if (e.target.value === "" || regex.test(e.target.value)) {
    setNumber(e.target.value);
    setWarning(false);
  } else {
    setWarning(true);
  }
};

const checkIsPasswordIdentical = (password, retypePassword) => {
  return password === retypePassword ? true : false;
};

export { checkIfNumber, checkIsPasswordIdentical };
