export const checkIfTransactionNumberIsValid = (bankNumber, setWarning) => {
  if (bankNumber.length === 16) {
    const spliceNumber = bankNumber.split("");
    const zeroes = ["0", "0"];
    spliceNumber.splice(-2, 2, ...zeroes);
    const transformedNumber = parseInt(spliceNumber.join(""));
    const moduloRest = transformedNumber % 97;
    const lastNumbers = (97 + 1 - moduloRest).toString().split("");
    if (lastNumbers.length === 1) {
      lastNumbers.splice(0, 0, 0);
    }
    spliceNumber.splice(-2, 2, ...lastNumbers);
    if (bankNumber === spliceNumber.join("")) {
      setWarning(false);
      return true;
    }
    setWarning(true);
    return false;
  }
};
