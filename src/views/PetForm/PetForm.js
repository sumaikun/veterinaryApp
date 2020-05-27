import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { FormFile, FormDetails } from './components';

import { connect } from 'react-redux';

import { savePet } from 'actions/pets';

import { uploadFileToServer } from 'actions/app'

import Swal from 'sweetalert2' 

import { getBreeds } from "actions/app"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));




const PetForm = props => {
  const classes = useStyles();


  useEffect(() => {
    props.getBreeds()
  },[]);
  //

  console.log("props pet form",props.petsState.selectedPet)

  const [values, setValues] = useState({
    _id:  props.petsState.selectedPet._id || props.petsState.selectedPet.id,
    name: props.petsState.selectedPet.name,
    species: props.petsState.selectedPet.species,
    breed: props.petsState.selectedPet.breed,
    color: props.petsState.selectedPet.color,
    sex: props.petsState.selectedPet.sex,
    age: props.petsState.selectedPet.age,
    birthDate: props.petsState.selectedPet.birthDate,
    origin: props.petsState.selectedPet.origin,
    description: props.petsState.selectedPet.description,
    picture: props.petsState.selectedPet.picture ? props.petsState.selectedPet.picture : null,
    file: null
  });

  const changeValues = (key,value) =>
  {

    console.log(key,value);
    setValues({
      ...values,
      [key]: value
    });
  
    console.log(values)
  }

  const submitData = (errors) => {
    
    const pet = values;

    if(props.petsState.selectedPet.id)
    {
      pet._id = props.petsState.selectedPet.id
    }

    if( pet.name === "" || pet.species === "" ||  pet.breed === "" || pet.sex === ""
    || pet.age === "" ) 
    {
      return Swal.fire({
        icon: 'error',
        title: 'Espera',
        text: "Debe llenar todos los datos obligatorios para continuar",          
      })
    }

    for (var i = 0; i < errors.length; i++) {
        if(errors[i])
        {
          return Swal.fire({
            icon: 'error',
            title: 'Espera',
            text: "Existen errores de validación en el formulario",          
          })
        }
    }

    if(values.file != null)
    {
      console.log("send file")
      uploadFileToServer(values.file,(response,err)=>{
        if(response){
          values.picture = response.data.filename
          props.savePet(values,(res,err)=>{
           
            if(res){
              return Swal.fire({
                icon: 'success',
                title: 'Bien',
                text: "Datos registrados",          
              })
            }

          })
        }else{
          return Swal.fire({
            icon: 'error',
            title: 'Espera',
            text: "Hubo un error subiendo el archivo",          
          })
        }
      })
    }
    else{

      console.log("pet to save",values);

      props.savePet(values,(res,err)=>{
       
        
        if(res){
          return Swal.fire({
            icon: 'success',
            title: 'Bien',
            text: "Datos registrados",          
          })
        }
        
        
        
      })
    }

  } 

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >        
          <FormFile  petDetails={values} changeDetails={changeValues} />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >       
          <FormDetails  breeds={ props.appState.breeds } species={ props.appState.species }  changeDetails={changeValues} petDetails={values} submitData={submitData}  />
        </Grid>
      </Grid>
    </div>
  );
};


const mapStateToProps = state => {
 
  return {
    petsState: state.pets,
    appState: state.app  
  };
}


export default  connect(mapStateToProps, { savePet , getBreeds  } )(PetForm);
