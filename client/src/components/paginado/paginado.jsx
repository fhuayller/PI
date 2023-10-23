import React from "react";

export default function Paginado(props) {
  const { drOnPage, allDrivers, paginado } = props;
  const numPage = [];

  for (let i = 0; i <= Math.ceil(allDrivers / drOnPage); i++) { //Math.ceil me redondea el resultado para arriba.
    numPage.push(i + 1);
  }

  return (
    <nav>
      <ul className="paginado">
        {numPage.map((number, index) => (
          <React.Fragment key={index}>
            <a className="num" onClick={() => paginado(number)}>{number}</a>
            {index < numPage.length - 1 && <span>-</span>} {/* </span> solo se renderiza si la condición index es true. Se agrega un guion después de cada número de página, excepto después del último número. */}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}