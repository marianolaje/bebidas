import React, {createContext, useState, useEffect} from 'react'
import Axios from 'axios'

//Crear context
export const ModalContext = createContext();

//Provider es donde se encuentran las funciones y state
const ModalProvider = (props) => {

    const [ idReceta, setIdReceta ] = useState(null)
    const [ detalles, setDetalles ] = useState({})

    useEffect(()=>{
        const buscarDetalles = async () => {
            if(idReceta===null){return}
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`
            const result = await Axios.get(url)
            setDetalles(result.data.drinks[0])
        }
        buscarDetalles()
    },[idReceta])

    return(
        <ModalContext.Provider
            value={{
                detalles,
                setDetalles,
                setIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )

}

export default ModalProvider

