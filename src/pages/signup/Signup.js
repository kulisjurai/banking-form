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

  const fetchCountryRelatedMunicipalities = (name) => {
    countrySelect.items.find((item) => {
      if (item.name === name) {
        axiosInstance(
          "GET",
          `/municipality?countryId=${item.id}`,
          setMunicipalitySelect
        );
      }
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const validityCollection = [
      checkIfTransactionNumberIsValid(bankNumber, setTransactionNumberWarning),
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
    ];
    const checkIfValid = validityCollection.map((item) => {
      return item;
    });
    const isValid = !checkIfValid.includes(false);
    if (isValid) {
      axiosInstance("POST", "/posts/add", setResponse, {
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
                checkIfNumber(e, setBankNumber, setNonNumericalWarning);
              }}
              type="text"
              placeholder="Broj bankovnog računa"
              autocomplete="off"
            />
            <div className="currency-select">
              <label htmlFor="currency">Valuta</label>
              {currenciesSelect && (
                <select
                  onChange={(e) => {
                    setCurrency(e.target.value);
                  }}
                  id="currency"
                >
                  {currenciesSelect.items.map((item) => {
                    return <option>{item}</option>;
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
              onChange={(e) => setZipCode(e.target.value)}
              type="text"
              placeholder="Poštanski broj*"
            />
          </div>
          <div className="select-group">
            <div className="select-group-inner">
              <label htmFor="municipality">Općina</label>
              {municipalitySelect && (
                <select
                  onChange={(e) => {
                    setMunicipality(e.target.value);
                  }}
                  id="municipality"
                >
                  {municipalitySelect.items.map((item) => {
                    return <option>{item.name}</option>;
                  })}
                </select>
              )}
            </div>
            <div className="select-group-inner">
              <label htmlFor="country">Država</label>
              {countrySelect && (
                <select
                  onChange={(e) => {
                    fetchCountryRelatedMunicipalities(e.target.value);
                    setCountry(e.target.value);
                  }}
                  id="country"
                >
                  {countrySelect.items.map((item) => {
                    return <option>{item.name}</option>;
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
