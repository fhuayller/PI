import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers, filterStatus,orderAscDesc } from "../../actions";
import { Link } from 'react-router-dom'
import Card from "../Card/card";
import Paginado from "../paginado/paginado";
import SearchBar from "../searchBar/searchBar";
import styles from './homePage.module.css'

export default function Home(){
    const dispatch = useDispatch();
    const allDr = useSelector((state) => state.drivers)
    const [page, setPage] = useState(1) //estado local seteado en 1 porque arranca en la primera pagina, es decir, mi pagina empezará en 1
    const [drOnPage, setDrOnPage] = useState(9) //estado local seteado en 9 ya que hacemos 9 drivers por pagina
    const indexLastDr = page * drOnPage
    const indexFirstDr = indexLastDr - drOnPage
    console.log("allDr:", allDr);
    const currentDr = allDr.slice(indexFirstDr, indexLastDr) //renderiza los personajes dependiendo de la página
    

    const paginado = (numPage) =>{
        setPage(numPage)
    }

    useEffect(() =>{
        dispatch(getDrivers())
    }, [])

    function handleFilter (e){
        dispatch(filterStatus(e.target.value)) //despacho la accion
    }

    function handleAscDesc(e) {
        dispatch(orderAscDesc(e.target.value));
    }

    return (
      <div className={styles.container}>
        <Link to={'/drivers'}>
          <button>Añadir driver</button>
        </Link>
        <h1>Conductores</h1>
        <SearchBar className={styles.contain} />
        <div className= {styles.contain} >
          <select onChange={(e) => handleAscDesc(e)}>
            <option value='asc'>Ascendente</option>
            <option value='desc'>Descendente</option>
          </select>
          <select onChange={(e) => handleFilter(e)}>
            <option value='todos'>Todos</option>
            <option value='existente'>Existentes</option>
            <option value='createdInDb'>Creados</option>
          </select>
          <Paginado drOnPage={drOnPage} allDrivers={allDr.length} paginado={paginado} />
          <div className={styles.cardContainer}>
            {currentDr?.map((driver) => (
              <div className={styles.card} key={driver.id}>
                {driver.name ? (
                  <Card
                    forename={driver.name.forename}
                    surname={driver.name.surname}
                    image={driver.image}
                    Teams={driver.teams}
                    id={driver.id}
                  />
                ) : (
                  <Card
                    forename={driver.forename}
                    surname={driver.surname}
                    image={driver.image}
                    Teams={driver.Teams}
                    id={driver.id}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

}

//NOTA: los datos fluyen desde un componente superior (componente Home) hacia componentes secundarios (componente Card). 
//Los componentes secundarios reciben datos como props y renderizan su contenido basándose en esas props.