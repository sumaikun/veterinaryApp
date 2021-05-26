import 'date-fns';
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

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

import  api  from '../../../../middleware/api'



const useStyles = makeStyles(() => ({
  root: {}
}));

const FormDetails = props => {

  const { className, ...rest } = props;

  const classes = useStyles(); 

  
  const handleDateChange = (key,date) => {
    
    props.changeDetails(key,date)
    
  };

  const handleChange = event => {
  
    props.changeDetails(event.target.name,event.target.value)

  };

  useEffect(() => {
    
    /*const getStratus = async () => {
      const response = await api.getData("petStratus") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data,value:data}) )
      setPetStratus(arrayData) 
    }

    getStratus()*/

  

  },[]);

  const errors =  new Array(5)

  const rules = (key,value) =>{
    switch(key){
      
      case "name":

        errors[0] = value.length > 0 && value.length < 3 ?
         "El nombre debe tener mas de tres digitos" : false       

        return  errors[0]
        
      case "color":

        errors[1] = value.length > 0 && value.length < 3 ?
          "El color debe tener mas de tres digitos" : false       

        return  errors[1]
      
      case "age":

        errors[2] = value.length > 0 && value.length < 1 ?
          "La edad debe tener información" : false       

        return  errors[2]

      case "description":

        errors[3] = value.length > 0 && value.length < 10 ?
          "La descripción debe tener mas de 10 dígitos":false
        
          return  errors[3]

      case "breed":

        errors[1] = value.length > 0 && value.length < 3 ?
          "La raza debe tener mas de tres digitos" : false       

        return  errors[1]
          


      default:
        return true
    } 
  }

  const savePet = () =>{
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
          subheader="Ingresar la información de la  mascota"
          title="Paciente"
        />
        <Divider />
        <CardContent>
          <Grid  container spacing={3}>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("name",props.petDetails.name)}
                error = {rules("name",props.petDetails.name)}            
                label="Nombre"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={props.petDetails.name}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Especie"
                margin="dense"
                name="species"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!props.petDetails.species }}
                value={props.petDetails.species}  
                variant="outlined"
              >
                <option></option>
                <option
                    key={"Dog"}
                    value={"Dog"}
                  >
                    {"Perro"}
                </option>
                <option
                    key={"Cat"}
                    value={"Cat"}
                  >
                    {"Gato"}
                </option>                
                
              </TextField>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("breed",props.petDetails.breed)}
                error = {rules("breed",props.petDetails.breed)}            
                label="Raza"
                margin="dense"
                name="breed"
                onChange={handleChange}
                required
                value={props.petDetails.breed}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("color",props.petDetails.color)}
                error = {rules("color",props.petDetails.color)}            
                label="Color"
                margin="dense"
                name="color"
                onChange={handleChange}
                required
                value={props.petDetails.color}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Sexo"
                margin="dense"
                name="sex"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!props.petDetails.sex }}
                value={props.petDetails.sex}  
                variant="outlined"
              >
                <option></option>
                <option
                    key={"Masculino"}
                    value={"M"}
                  >
                    {"Masculino"}
                </option>
                <option
                    key={"Femenino"}
                    value={"F"}
                  >
                    {"Femenino"}
                </option>
                
              </TextField>
            </Grid>


            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("age",props.petDetails.age)}
                error = {rules("age",props.petDetails.age)}            
                label="Edad"
                margin="dense"
                name="age"
                onChange={handleChange}
                required
                value={props.petDetails.age}
                variant="outlined"
                type="number"
              />
            </Grid>
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item md={6} xs={12} container justify="space-around">        

                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha de nacimiento"
                    format="MM/dd/yyyy"
                    value={props.petDetails.birthDate ?  props.petDetails.birthDate : null }
                    onChange={(date)=>handleDateChange("birthDate",date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                />

              </Grid>
            </MuiPickersUtilsProvider>

            <Grid item md={6} xs={12}>        
              <TextField
                  fullWidth
                  helperText={rules("description",props.petDetails.description)}
                  error = {rules("description",props.petDetails.description)}            
                  label="Señales particulares"
                  margin="dense"
                  name="description"
                  onChange={handleChange}
                  value={props.petDetails.description}
                  variant="outlined"
                  multiline
                  rows={3}
                />
            </Grid>


            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Procedencia (lugar actual)"
                margin="dense"
                name="origin"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!props.petDetails.origin }}
                value={props.petDetails.origin}  
                variant="outlined"
              >
                <option></option>
                <option
                    key={"Urbana"}
                    value={"urban"}
                  >
                    {"Urbana"}
                </option>
                <option
                    key={"Rural"}
                    value={"rural"}
                  >
                    {"Rural"}
                </option>
                
              </TextField>
            </Grid>
          
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={savePet}
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
