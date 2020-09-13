import 'date-fns';
import React, { useState, useEffect } from 'react';
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


import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';



const useStyles = makeStyles(() => ({
  root: {}
}));

const FormDetails = props => {
  const { className, mode, ...rest } = props;

  const classes = useStyles();

  const handleDateChange = (key,date) => {
    
    props.changeDetails(key,date)
    
  };
 

  const handleChange = event => {
  
    props.changeDetails(event.target.name,event.target.value)

  };
  

  const [typesId, setTypesId ] = useState([]);

  const [cities, setCities ] = useState([]);

  const [specialistTypes, setSpecialistTypes ] = useState([]);

  useEffect(() => {

    const getDocumentsTypes = async () => {
      const response = await api.getData("contactDocumentType") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data,value:data}) )
      setTypesId(arrayData)
    }

    getDocumentsTypes() 
    
    const getCityTypes = async () => {
      const response = await api.getData("cityTypes") 
      setCities(response.data)
    }

    getCityTypes() 

    
    const getSpecialistTypes = async () => {
      const response = await api.getData("specialistTypes") 
      setSpecialistTypes(response.data)
    }

    getSpecialistTypes()

    

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

      case "lastName":

        errors[4] = value.length > 0 && value.length < 3 ?
          "El nombre debe tener mas de tres digitos" : false       

        return  errors[4]

      case "phone2":

        errors[5] = value.length > 0 && (value.length > 10 || value.length < 7)   ?
        "El número telefónico debe tener entre 7 a 10 dígitos":false
      
        return  errors[5]



      default:
        return false
    } 
  }

  const saveDoctor = () =>{
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
          subheader="Ingresar información del medico"
          title="Médico"
        />
        <Divider />
        <CardContent>
          <Grid  container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("name",props.doctorDetails.name)}
                error = {rules("name",props.doctorDetails.name)}            
                label="Nombres"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={props.doctorDetails.name}
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("lastName",props.doctorDetails.lastName)}
                error = {rules("lastName",props.doctorDetails.lastName)}            
                label="Apellidos"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={props.doctorDetails.lastName}
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Ciudad"
                margin="dense"
                name="city"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!props.doctorDetails.city }}
                value={props.doctorDetails.city}  
                variant="outlined"
                disabled={ mode === "watch" }
              >
                <option></option>
                {cities.map(option => (
                  <option
                    key={option._id}
                    value={option._id}
                  >
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("address",props.doctorDetails.address)}
                error = {rules("address",props.doctorDetails.address)}
                label="Dirección"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={props.doctorDetails.address}
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("email",props.doctorDetails.email)}
                error = {rules("email",props.doctorDetails.email)}
                label="Correo electrónico"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={props.doctorDetails.email}
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("phone",props.doctorDetails.phone)}
                error = {rules("phone",props.doctorDetails.phone)}
                label="Número de teléfono"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={props.doctorDetails.phone}
                required
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("phone2",props.doctorDetails.phone2)}
                error = {rules("phone2",props.doctorDetails.phone2)}
                label="Número de teléfono 2"
                margin="dense"
                name="phone2"
                onChange={handleChange}
                type="number"
                value={props.doctorDetails.phone2}
                required
                variant="outlined"
                disabled={ mode === "watch" }
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
                InputLabelProps={{ shrink: !!props.doctorDetails.typeId }}
                value={props.doctorDetails.typeId}  
                variant="outlined"
                disabled={ mode === "watch" }
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
                helperText={rules("identification",props.doctorDetails.identification)}
                error = {rules("identification",props.doctorDetails.identification)}
                label="Número de identificación"
                margin="dense"
                name="identification"
                onChange={handleChange}
                type="number"
                value={props.doctorDetails.identification}
                required
                variant="outlined"
                disabled={ mode === "watch" }
              />
          
             </Grid>

             <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item md={6} xs={12} container justify="space-around">        

                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha de nacimiento"
                    format="MM/dd/yyyy"
                    value={props.doctorDetails.birthDate ?  props.doctorDetails.birthDate : null }
                    onChange={(date)=>handleDateChange("birthDate",date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    disabled={ mode === "watch" }
                />

              </Grid>
            </MuiPickersUtilsProvider>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tipo de especialización"
                margin="dense"
                name="specialistType"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!props.doctorDetails.specialistType }}
                value={props.doctorDetails.specialistType}  
                variant="outlined"
                disabled={ mode === "watch" }
              >
                <option></option>
                {specialistTypes.map(option => (
                  <option
                    key={option._id}
                    value={option._id}
                  >
                    {option.name}
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
            onClick={saveDoctor}
            disabled={ mode === "watch" }
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
