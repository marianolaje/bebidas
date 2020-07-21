import React, {createContext, useState, useEffect} from 'react'
import Axios from 'axios'

//Crear context
export const CategoriasContext = createContext();

//Provider es donde se encuentran las funciones y state
const CategoriasProvider = (props) => {
    //crear el state del Context
    const [categorias, setCategorias] = useState([])

    //ejecutar llamado a la API con AXIOS
    useEffect(()=>{
        const obtenerCategorias = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
            const categorias = await Axios.get(url)

            setCategorias(categorias.data.drinks)
        }  
        obtenerCategorias()
    }, [])
    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )

}

export default CategoriasProvider

