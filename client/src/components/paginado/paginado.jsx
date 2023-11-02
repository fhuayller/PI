import React from "react";
import styles from './paginado.module.css'

export default function Paginado(props) {
  const { drOnPage, allDrivers, paginado } = props;
  const numPage = [];

  for (let i = 0; i <= Math.ceil(allDrivers / drOnPage); i++) { 
    numPage.push(i + 1);
  }

  return (
    <nav>
      <ul className= {styles.paginado} >
        {numPage.map((number, index) => (
          <React.Fragment key={index}>
            <a className= {styles.num} onClick={() => paginado(number)}>{number}</a>
            {/* </span> solo se renderiza si la condición index es true. Se agrega un guion después de cada número de página, excepto después del último número. */}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}