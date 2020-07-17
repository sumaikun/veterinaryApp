import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { FormFile, FormDetails } from './components';

import { connect } from 'react-redux';

import { saveContact } from 'actions/contacts';

import { uploadFileToServer, deleteFile } from 'actions/app'

import Swal from 'sweetalert2' 

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));



const ContactForm = props => {
  const classes = useStyles();


  console.log("props contact form",props.contactsState.selectedContact)

  const [values, setValues] = useState({
    _id:  props.contactsState.selectedContact._id || props.contactsState.selectedContact.id,
    name: props.contactsState.selectedContact.name,
    email: props.contactsState.selectedContact.email,
    phone: props.contactsState.selectedContact.phone,
    address: props.contactsState.selectedContact.address,
    typeId: props.contactsState.selectedContact.typeId,
    identification: props.contactsState.selectedContact.identification,
    city: props.contactsState.selectedContact.city,
    ocupation: props.contactsState.selectedContact.ocupation,
    stratus: props.contactsState.selectedContact.stratus,
    picture: props.contactsState.selectedContact.picture ? props.contactsState.selectedContact.picture : null,
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
    
    const contact = values;

    if(props.contactsState.selectedContact.id)
    {
      contact._id = props.contactsState.selectedContact.id
    }

    if(contact.name === "" || contact.email === "" ||  contact.phone === "" || contact.address === ""
    || contact.identification === "" || contact.stratus === "" || contact.city === ""
    || contact.ocupation === "" || contact.typeId === "") 
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

          if(values.picture)
          {
            deleteFile(values.picture)
          }

          values.picture = response.data.filename
          props.saveContact(values,(res,err)=>{
           
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

      console.log("contact to save",values);

      props.saveContact(values,(res,err)=>{
       
        
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
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >        
          <FormFile  contactDetails={values} changeDetails={changeValues} />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >      
          <FormDetails changeDetails={changeValues} contactDetails={values} submitData={submitData}  />
        </Grid>
      </Grid>
    </div>
  );
};


const mapStateToProps = state => {
 
  return {
    contactsState: state.contacts,  
  };
}


export default  connect(mapStateToProps, { saveContact  } )(ContactForm);
