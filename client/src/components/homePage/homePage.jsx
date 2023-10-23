import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers, filterStatus,orderAscDesc, postDrivers } from "../../actions";
import { Link } from 'react-router-dom'
import Card from "../Card/card";
import Paginado from "../paginado/paginado";
import SearchBar from "../searchBar/searchBar";

export default function Home(){
    const dispatch = useDispatch();
    const allDr = useSelector((state) => state.drivers) //accedemos al estado global de la aplicación y obtenemos la lista de conductores en allDrivers.
    const [orden, setOrden] = ('')
    const [page, setPage] = useState(1) //estado local seteado en 1 porque arranca en la primera pagina, es decir, mi pagina empezará en 1
    const [drOnPage, setDrOnPage] = useState(9) //estado local seteado en 9 ya que hacemos 9 drivers por pagina
    const indexLastDr = page * drOnPage
    const indexFirstDr = indexLastDr - drOnPage
    console.log("allDr:", allDr);
console.log("indexFirstDr:", indexFirstDr);
console.log("indexLastDr:", indexLastDr);
    const currentDr = allDr.slice(indexFirstDr, indexLastDr) //renderiza los personajes dependiendo de la página
    

    const paginado = (numPage) =>{
        setPage(numPage)
    }

    useEffect(() =>{ //Me trae todos los drivers del estado global una vez que el componente Home se monta.
        dispatch(getDrivers()) //usamos el dispatch para despachar la acción
    }, [])

    function handleFilter (e){
        dispatch(filterStatus(e.target.value)) //despacho la accion
    }

    function handleAscDesc(e) {
        dispatch(orderAscDesc(e.target.value));
        //setPage(1);
    }

    return (
        <div>
            <Link to={'/drivers'}>
                <button>Añadir driver</button>
            </Link>
            <h1>Conductores</h1>
            <SearchBar/>
            <div>
                <select onChange={e => handleAscDesc(e)}>
                    <option value='asc'>Ascendente</option> {/* es necesario un value en 'option' para posteriormente acceder por valor y hacer una u otra cosa en base a ese 'value'*/}
                    <option value='desc'>Descendente</option>
                </select>
                <select onChange={e => handleFilter(e)}>
                    <option value='todos'>Todos</option>
                    <option value='existente'>Existentes</option>
                    <option value='createdInDb'>Creados</option>
                </select>
                <Paginado drOnPage={drOnPage} allDrivers={allDr.length} paginado={paginado}/>
                {
                    currentDr?.map((driver) =>{ //paso datos específicos de los drivers en la pagina como props. Estos datos se pasan como props al componente Card.
                        return(
                            <Fragment key={driver.id}>
                                <Card name={driver.name.forename} lastname={driver.name.surname} img={driver.image} teams= {driver.teams} id= {driver.id} />
                            </Fragment>
                        )
                    })
                }
                
            </div>
        </div>
    )

}

//NOTA: los datos fluyen desde un componente superior (componente Home) hacia componentes secundarios (componente Card). 
//Los componentes secundarios reciben datos como props y renderizan su contenido basándose en esas props.