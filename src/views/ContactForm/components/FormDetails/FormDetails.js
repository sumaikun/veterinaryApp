import React, { useState  , useEffect  } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

import  api  from '../../../../middleware/api'



const useStyles = makeStyles(() => ({
  root: {}
}));

const FormDetails = props => {

  const { className, ...rest } = props;

  const classes = useStyles();

 

  const handleChange = event => {
  
    props.changeDetails(event.target.name,event.target.value)

  };

  const [contactStratus, setContactStratus ] = useState([]);

  const [typesId, setTypesId ] = useState([]); 

  useEffect(() => {
    
    const getStratus = async () => {
      const response = await api.getData("contactStratus") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data,value:data}) )
      setContactStratus(arrayData) 
    }

    getStratus()

    const getDocumentsTypes = async () => {
      const response = await api.getData("contactDocumentType") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data,value:data}) )
      setTypesId(arrayData)
    }

    getDocumentsTypes()    
  

  },[]);

  const errors =  new Array(5)

  const rules = (key,value) =>{
    switch(key){
      case "name":

        errors[0] = value.length > 0 && value.length < 3 ?
         "El nombre debe tener mas de tres digitos" : false       

        return  errors[0]

      case "address":

        errors[1] = value.length > 0 && ( value.length < 7 || !value.match(/\w*[a-zA-Z]\w*/) ) ?
         "La dirección debe tener al menos un número y una letra y por lo menos 7 digitos" : false

        return  errors[1]
         
      case "email":

        errors[2] = value.length > 0 && ( !value.match(/\S+@\S+\.\S+/) ) ?
          "No es un correo valido":false
        
          return  errors[2]

      case "phone":

        errors[3] = value.length > 0 && (value.length > 10 || value.length < 7)   ?
        "El número telefónico debe tener entre 7 a 10 dígitos":false
      
        return  errors[3]

      case "identification":

        errors[4] = value.length > 0 && (value.length > 10 || value.length < 5)   ?
        "El número telefónico debe tener entre 5 a 10 dígitos":false
      
        return  errors[4]
        
      case "city":

        errors[5] = value.length > 0 && (value.length < 4)   ?
        "La ciudad debe tener al menos 4 dígitos":false
      
        return  errors[5] 
        
      case "ocupation":

        errors[6] = value.length > 0 && (value.length < 5)   ?
        "La ocupación debe tener al menos 5 dígitos":false
      
        return  errors[6] 


      default:
        return true
    } 
  }

  const saveContact = () =>{
    props.submitData(errors)
  }


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="Ingresar la información del contacto"
          title="Contacto"
        />
        <Divider />
        <CardContent>
          <Grid  container spacing={3}>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("name",props.contactDetails.name)}
                error = {rules("name",props.contactDetails.name)}            
                label="Nombre"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={props.contactDetails.name}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("address",props.contactDetails.address)}
                error = {rules("address",props.contactDetails.address)}
                label="Dirección"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={props.contactDetails.address}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("email",props.contactDetails.email)}
                error = {rules("email",props.contactDetails.email)}
                label="Correo electrónico"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={props.contactDetails.email}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("phone",props.contactDetails.phone)}
                error = {rules("phone",props.contactDetails.phone)}
                label="Número de teléfono"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={props.contactDetails.phone}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tipo de identificación"
                margin="dense"
                name="typeId"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!props.contactDetails.typeId }}
                value={props.contactDetails.typeId}  
                variant="outlined"
              >
                {typesId.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>         

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("identification",props.contactDetails.identification)}
                error = {rules("identification",props.contactDetails.identification)}
                label="Número de identificación"
                margin="dense"
                name="identification"
                onChange={handleChange}
                type="number"
                value={props.contactDetails.identification}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("city",props.contactDetails.city)}
                error = {rules("city",props.contactDetails.city)}
                label="Ciudad"
                margin="dense"
                name="city"
                onChange={handleChange}
                type="text"
                value={props.contactDetails.city}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("ocupation",props.contactDetails.ocupation)}
                error = {rules("ocupation",props.contactDetails.ocupation)}
                label="Ocupación"
                margin="dense"
                name="ocupation"
                onChange={handleChange}
                type="text"
                value={props.contactDetails.ocupation}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Estrato"
                margin="dense"
                name="stratus"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!props.contactDetails.stratus }}
                value={props.contactDetails.stratus}  
                variant="outlined"
              >
                {contactStratus.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            
          
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={saveContact}
          >
            Guardar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

FormDetails.propTypes = {
  className: PropTypes.string
};

export default FormDetails;
