import React from "react";
import Card from "../../components/card/Card";
import "./Message.css";

export default function Message() {
  return (
    <div>
      <Card>
        <hr />
        <div className="message">
          {" "}
          <p>
            Poštovani korisniče, <br />
            <br />
            Sa zadovoljstvom vam javljamo da je vaša registracija na naš sistem
            uspješno procesirana. Da biste aktivirali svoj korisnički račun i
            pristupili svim funkcijama naše platforme, molimo vas da kliknete na
            link koji je poslan na email adresu navedenu u prijavi. Ukoliko
            imate bilo kakva pitanja ili vam je potrebna podrška prilikom
            registracije, slobodno nas kontaktirajte putem našeg korisničkog
            servisa. <br />
            <br />
            +387 33 770 991
            <br /> info@forspace.ba <br /> <br />S poštovanjem, Vaš tim za
            podršku <br /> <br />
            Forspace Solutions
          </p>
        </div>
      </Card>
    </div>
  );
}
