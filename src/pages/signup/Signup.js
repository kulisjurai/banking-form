import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import ReCAPTCHA from "react-google-recaptcha";
import { axiosInstance } from "../../axios/instance";
import { checkIfTransactionNumberIsValid } from "../../shared/TransactionNumberCheck";
import {
  checkIfNumber,
  checkIsPasswordIdentical,
} from "../../shared/CheckInputs";
import "./Signup.css";

export default function Signup() {
  // fields to be filled with get call
  const [currenciesSelect, setCurrenciesSelect] = useState("");
  const [municipalitySelect, setMunicipalitySelect] = useState("");
  const [countrySelect, setCountrySelect] = useState("");

  //
  const [reCaptchaToken, setReCaptchaToken] = useState("");
  const [numericalWarning, setNumericalWarning] = useState(false);
  const [transactionNumberWarning, setTransactionNumberWarning] =
    useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  // fields to be sent with post call
  const [bankNumber, setBankNumber] = useState("");
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
    axiosInstance("GET", "/albums", setCurrenciesSelect);
    // axiosInstance("GET", "/albums", setMunicipality);
    // axiosInstance("GET", "/albums", setCountry);
  }, [setBankNumber]);

  const onCaptchaChange = (value) => {
    setReCaptchaToken(value);
  };

  const tokenRecieved = () => {
    return reCaptchaToken == "" ? true : false;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (
      checkIfTransactionNumberIsValid(bankNumber, setTransactionNumberWarning)
    ) {
      console.log("form is submtted");
      axiosInstance("POST", "/albums", {
        bankNumber,
        currency,
        companyName,
        street,
        city,
        zipCode,
        municipality,
        country,
        email,
        username,
        password,
      });
      return;
    }
    console.log("form submission failed");
    return;
  };

  return (
    <div>
      <Card>
        <div className="hr2"></div>
        <form>
          <div className="bank-number-group">
            <input
              onChange={(e) => {
                checkIfNumber(e, setBankNumber, setNumericalWarning);
              }}
              type="text"
              placeholder="Broj bankovnog računa"
            />
            <div className="currency-select">
              <label htmlFor="currency">Valuta</label>
              {currenciesSelect && (
                <select
                  // onChange={(e) => setCurrency(e.target.value)}
                  id="currency"
                >
                  {currenciesSelect.map((item) => {
                    console.log(item);
                    return <option>{item.id}</option>;
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
          {transactionNumberWarning && (
            <p className="number-warning">Transakcijski broj nije ispravan</p>
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
          <button
            className="button"
            value="Register"
            disabled={tokenRecieved()}
            onClick={(e) => submitForm(e)}
          >
            Register
          </button>
        </form>
      </Card>
    </div>
  );
}
