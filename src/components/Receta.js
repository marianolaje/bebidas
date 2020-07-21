import React, {useContext, useState} from 'react'
import {ModalContext} from '../context/ModalContext.js'

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));


const Receta = ({receta}) => {

    //extraer los valores del context
    const {setIdReceta, detalles, setDetalles} = useContext(ModalContext)

//MATERIAL-UI COMPONENTE
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false)
    }

    //muestra y formatea los ingredientes
    const mostrarIngredientes = detalles => {
        let ingredientes = [];
        for(let i = 1; i<16; i++){
            if( detalles[`strIngredient${i}`] ){
                ingredientes.push(
                    <li>
                        {detalles[`strIngredient${i}`]} - 
                        {detalles[`strMeasure${i}`]}
                    </li>
                )
            }
        }
        return ingredientes
    }

    return(
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`}></img>
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={()=>{
                            setIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >
                        Ver receta
                    </button>
                    <Modal
                        open={open}
                        onClose={()=>{
                            setIdReceta(null);
                            handleClose();
                            setDetalles({});
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{detalles.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>{detalles.strInstructions}</p>
                            <img className="img-fluid my-4" src={detalles.strDrinkThumb}></img>
                            <h3>Ingredientes y Cantidades</h3>
                            <ul>
                                {mostrarIngredientes(detalles)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Receta