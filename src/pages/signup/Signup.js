import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../../axios/axios";
import "./Signup.css";

export default function Signup() {
  // fields to be filled with gett call
  const [currenciesSelect, setCurrenciesSelect] = useState("");
  const [municipalitySelect, setMunicipalitySelect] = useState("");
  const [countrySelect, setCountrySelect] = useState("");

  // recaptcha
  const [reCaptchaToken, setReCaptchaToken] = useState("");
  const [numericalWarning, setNumericalWarning] = useState(false);

  // fields to be sent with post call
  const [bankNumber, setBankNumber] = useState("1346101004539095");
  const [currency, setCurrency] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  useEffect(() => {
    getAll("/api/currency", setCurrenciesSelect);
    // getAll("/products", setMunicipality);
    // getAll("/products", setCountry);
  }, []);

  const getAll = async (path, setData) => {
    await axios
      .get(path)
      .then(function (response) {
        // handle success
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  const onCaptchaChange = (value) => {
    setReCaptchaToken(value);
  };

  const checkIsPasswordIdentical = () => {
    return password === retypePassword ? true : false;
  };

  const tokenRecieved = () => {
    return reCaptchaToken == "" ? true : false;
  };

  const checkIfNumber = (e) => {
    checkIfTransactionNumberIsValid();
    const regex = /^[0-9\b]+$/;
    // if value is not blank, then test the regex
    if (e.target.value === "" || regex.test(e.target.value)) {
      // setBankNumber(e.target.value);
      setNumericalWarning(false);
    } else {
      setNumericalWarning(true);
    }
  };

  const checkIfTransactionNumberIsValid = () => {
    if (bankNumber.length === 16) {
      const spliceNumber = bankNumber.split("");
      const modulo = 97;
      const zeroes = ["0", "0"];
      spliceNumber.splice(-2, 2, ...zeroes);
      const transformedNumber = parseInt(spliceNumber.join(""));
      const moduloRest = transformedNumber % modulo;
      const lastNumber = modulo + 1 - moduloRest;
    }
  };

  return (
    <div>
      <Card>
        <div className="hr2"></div>
        <form action="submit">
          <div className="bank-number-group">
            <input
              onChange={(e) => checkIfNumber(e)}
              type="text"
              placeholder="Broj bankovnog računa"
            />
            <div className="currency-select">
              <label htmlFor="currency">Valuta</label>
              {currenciesSelect.products && (
                <select
                  onChange={(e) => setCurrency(e.target.value)}
                  id="currency"
                >
                  {currenciesSelect.products.map((item) => {
                    return <option>{item.title}</option>;
                  })}
                </select>
              )}
            </div>
          </div>
          {numericalWarning && (
            <p className="number-warning">
              Ovo polje prima isključivo numeričku vrijednost
            </p>
          )}
          <input
            onChange={(e) => setCompanyName(e.target.value)}
            type="text"
            className="placeholder"
            placeholder="Naziv kompanije*"
          />
          <input
            onChange={(e) => setStreet(e.target.value)}
            type="text"
            placeholder="Ulica*"
          />
          <div className="address">
            <input
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="inner-address"
              placeholder="Grad*"
            />
            <input
              onChange={(e) => setZipCode(e.target.value)}
              type="text"
              placeholder="Poštanski broj*"
            />
          </div>
          <div className="select-group">
            <div className="select-group-inner">
              <label htmFor="municipality">Općina</label>
              <select
                onChange={(e) => {
                  console.log(reCaptchaToken);
                  setMunicipality(e.target.value);
                }}
                id="municipality"
              >
                <option>Novo Sarajevo</option>
                <option>Center</option>
              </select>
            </div>
            <div className="select-group-inner">
              <label htmlFor="country">Država</label>
              <select onChange={(e) => setCountry(e.target.value)} id="country">
                <option>Bosna i Hercegovina</option>
                <option>Njemacka</option>
              </select>
            </div>
          </div>
          <div className="hr"></div>
          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Korisničko ime"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Šifra"
            />
            <input
              onChange={(e) => setRetypePassword(e.target.value)}
              type="text"
              placeholder="Ponovite šifru"
            />
          </div>
          <div className="captcha">
            <ReCAPTCHA
              sitekey="6LeuDI8mAAAAADOuJuWK58qk80rNydsr27kn0yx4"
              onChange={onCaptchaChange}
            />
          </div>
          <p>
            Već imate korsnički račun?{" "}
            <Link to="/">
              <span>Logujte se</span>
            </Link>
          </p>
          <input
            className="button"
            type="submit"
            value="Register"
            disabled={tokenRecieved()}
          />
        </form>
      </Card>
    </div>
  );
}
