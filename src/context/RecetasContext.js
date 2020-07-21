import React, {createContext, useState, useEffect} from 'react'
import Axios from 'axios'

//Crear context
export const RecetasContext = createContext();

//Provider es donde se encuentran las funciones y state
const RecetasProvider = (props) => {

    const [recetas, setRecetas] = useState([])
    const [busquedaContext, setBusquedaContext] = useState({
        nombre: '',
        categoria: ''
    })
    const [consultar, setConsultar] = useState(false)

    const { nombre , categoria } = busquedaContext

    useEffect(()=>{
        if(consultar){
            const buscarRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`
                const result = await Axios.get(url)
                setRecetas(result.data.drinks)
            }
            buscarRecetas()
        }
    },[busquedaContext])

    return(
        <RecetasContext.Provider
            value={{
                setBusquedaContext,
                setConsultar,
                recetas
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )

}

export default RecetasProvider

