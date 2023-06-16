import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import ReCAPTCHA from "react-google-recaptcha";
import { axiosInstance } from "../../services/instance";
import { checkIfTransactionNumberIsValid } from "../../shared/TransactionNumberCheck";
import {
  checkIfNumber,
  checkPasswordEquality,
  checkIfPasswordContainsSpecialCharacters,
  validateEmail,
} from "../../shared/CheckInputs";
import "./Signup.css";

export default function Signup() {
  // fields to be filled with get call
  const [currenciesSelect, setCurrenciesSelect] = useState("");
  const [municipalitySelect, setMunicipalitySelect] = useState("");
  const [countrySelect, setCountrySelect] = useState("");
  const [response, setResponse] = useState({});

  //
  const [reCaptchaToken, setReCaptchaToken] = useState("");
  const [nonNumericalWarning, setNonNumericalWarning] = useState(false);
  const [transactionNumberWarning, setTransactionNumberWarning] =
    useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [passwordCharacterWarning, setPasswordCharacterWarning] =
    useState(false);
  const [passwordInequalityWarning, setPasswordInequalityWarning] =
    useState(false);

  // fields to be sent with post call
  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [currencyIso4217Code, setcurrencyIso4217Code] = useState("EUR");
  const [companyName, setCompanyName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [municipalityId, setMunicipalityId] = useState("1");
  const [countryId, setCountryId] = useState("1");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  useEffect(() => {
    axiosInstance("GET", "/currency", setCurrenciesSelect);
    axiosInstance("GET", "/municipality", setMunicipalitySelect);
    axiosInstance("GET", "/country", setCountrySelect);
  }, []);

  const onCaptchaChange = (value) => {
    setReCaptchaToken(value);
  };

  const tokenRecieved = () => {
    return reCaptchaToken === "" ? true : false;
  };

  const fetchCountryIdRelatedMunicipalities = (id) => {
    axiosInstance(
      "GET",
      `/municipality?countryId=${id}`,
      setMunicipalitySelect
    );
  };

  const submitForm = (e) => {
    e.preventDefault();

    const checkIfValid = [
      checkIfTransactionNumberIsValid(
        bankAccountNumber,
        setTransactionNumberWarning
      ),
      validateEmail(email, setEmailWarning),
      checkIfPasswordContainsSpecialCharacters(
        password,
        setPasswordCharacterWarning
      ),
      checkPasswordEquality(
        password,
        retypePassword,
        setPasswordInequalityWarning
      ),
    ].map((item) => {
      return item;
    });
    const isValid = !checkIfValid.includes(false);
    if (isValid) {
      console.log("post call successful");
      axiosInstance("POST", "/token/request", setResponse, {
        bankAccountNumber,
        currencyIso4217Code,
        companyName,
        street,
        city,
        postalCode,
        municipalityId,
        countryId,
        email,
        username,
        password,
      });
      return;
    }
    console.log("post call failed");
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
                checkIfNumber(e, setbankAccountNumber, setNonNumericalWarning);
              }}
              type="text"
              placeholder="Broj bankovnog računa"
            />
            <div className="currencyIso4217Code-select">
              <label htmlFor="currencyIso4217Code">Valuta</label>
              {currenciesSelect && (
                <select
                  onChange={(e) => {
                    setcurrencyIso4217Code(e.target.value);
                  }}
                  id="currencyIso4217Code"
                >
                  {currenciesSelect.items.map((item, i) => {
                    return <option key={i}>{item}</option>;
                  })}
                </select>
              )}
            </div>
          </div>
          {
            <p
              className={`warning ${
                nonNumericalWarning ? "active-warning" : "deactive-warning"
              }`}
            >
              Ovo polje prima isključivo numeričku vrijednost
            </p>
          }
          {transactionNumberWarning && (
            <p
              className={`warning ${
                transactionNumberWarning ? "active-warning" : "deactive-warning"
              }`}
            >
              Transakcijski broj nije ispravan
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
              onChange={(e) => setPostalCode(e.target.value)}
              type="text"
              placeholder="Poštanski broj*"
            />
          </div>
          <div className="select-group">
            <div className="select-group-inner">
              <label htmlFor="municipality">Općina</label>
              {municipalitySelect && (
                <select
                  onChange={(e) => {
                    setMunicipalityId(e.target.value);
                  }}
                  id="municipality"
                >
                  {municipalitySelect.items.map((item, i) => {
                    return (
                      <option value={item.id} key={i}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
            <div className="select-group-inner">
              <label htmlFor="country">Država</label>
              {countrySelect && (
                <select
                  onChange={(e) => {
                    fetchCountryIdRelatedMunicipalities(e.target.value);
                    setCountryId(e.target.value);
                  }}
                  id="country"
                >
                  {countrySelect.items.map((item, i) => {
                    return (
                      <option value={item.id} key={i}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>
          <div className="hr"></div>
          <div>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailWarning(email.length < 1 ? false : "");
              }}
              type="email"
              placeholder="Email"
            />
            {
              <p
                className={`warning ${
                  emailWarning ? "active-warning" : "deactive-warning"
                }`}
              >
                Unos email adrese nije valjan
              </p>
            }
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Korisničko ime"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordCharacterWarning(password.length < 1 ? false : "");
                setPasswordInequalityWarning(password.length < 1 ? false : "");
              }}
              type="password"
              placeholder="Šifra"
            />
            {
              <p
                className={`warning ${
                  passwordCharacterWarning
                    ? "active-warning"
                    : "deactive-warning"
                }`}
              >
                Lozinka treba sadržavati minimalno 8 karaktera, uključujući
                velika i mala slova, specijalne karaktere i brojeve
              </p>
            }
            <input
              onChange={(e) => setRetypePassword(e.target.value)}
              type="password"
              placeholder="Ponovite šifru"
            />
            {
              <p
                className={`warning extend ${
                  passwordInequalityWarning
                    ? "active-warning"
                    : "deactive-warning"
                }`}
              >
                Lozinke se ne podudaraju
              </p>
            }
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
