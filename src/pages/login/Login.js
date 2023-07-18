import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import "./Login.css";

export default function Login() {
  const login = () => {};

  return (
    <div>
      <Card>
        <form onSubmit={login}>
          <div className="hr1"></div>

          <div>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Lozinka" />
          </div>
          <p>
            Nemate korsnički račun?{" "}
            <Link to="/signup">
              <span>Registrujte se</span>
            </Link>
          </p>

          <input className="button" type="submit" value="Login" />
        </form>
      </Card>
    </div>
  );
}
