import 'date-fns';
import React, { useState  , useEffect  } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Divider,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  RadioGroup,
  Radio,
  FormControl,
  Button 
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';



const useStyles = {
  root: {},
  horizontalGroup:{width: 'auto', height: 'auto', display: 'flex', flexWrap: 'nowrap',
  flexDirection: 'row'}
};

const PatientReview = props => {

 

  useEffect(() => {
  },[]);

  

  return (
    <Grid lg={12} md={12} xs={12}>
        <Typography variant="subtitle2">Vacunación</Typography>
        <Divider/>
        <Grid lg={12} md={12} xs={12}>
            <FormControlLabel
                control={<Checkbox  name="checkedA" />}
                label="PVC"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha"
                    format="MM/dd/yyyy"                   
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />              
            </MuiPickersUtilsProvider>
            <FormControlLabel
                control={<Checkbox  name="checkedA" />}
                label="TRIPLE"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha"
                    format="MM/dd/yyyy"                   
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />              
            </MuiPickersUtilsProvider>
            <FormControlLabel
                control={<Checkbox  name="checkedA" />}
                label="RABIA"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha"
                    format="MM/dd/yyyy"                   
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />              
            </MuiPickersUtilsProvider>
        </Grid>
        <Typography variant="subtitle2">Ultima desparacitación</Typography>
        <Divider/>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid lg={6} md={6} xs={12}>
                <TextField
                    fullWidth
                    label="Producto"
                    margin="dense"
                    name="name"
                    variant="outlined"
                />
            </Grid>
            <Grid lg={6} md={6} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        style={{marginLeft:"25px"}}
                        margin="normal"
                        id="date-picker-dialog"
                        label="Fecha"
                        format="MM/dd/yyyy"                   
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />              
                </MuiPickersUtilsProvider>       
            </Grid>            
        </Grid>
        <Typography variant="subtitle2">Alimentación</Typography>
        <Divider/>
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={useStyles.horizontalGroup}  aria-label="customerBenefit">
                    
                    <FormControlLabel value="PL" control={<Radio />} 
                    label="Balanceada" />
                    <FormControlLabel value="DP" control={<Radio />}
                    label="Casera" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Mixta" />
                
                </RadioGroup>
            </FormControl>
        </Grid>
        <Typography variant="subtitle2">Estado reproductivo</Typography>
        <Divider/>
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={useStyles.horizontalGroup}  aria-label="customerBenefit">
                    
                    <FormControlLabel value="PL" control={<Radio />} 
                    label="Castrado" />
                    <FormControlLabel value="DP" control={<Radio />}
                    label="Gestación" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Entero" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Lactancia" />
                
                </RadioGroup>
            </FormControl>
        </Grid>
        
        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Enfermedades Anteriores"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Cirugías"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Antecedentes familiares"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
            />
        </Grid>

        <Typography variant="subtitle2">Habitat</Typography>
        <Divider/>
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={useStyles.horizontalGroup}  aria-label="customerBenefit">
                    
                    <FormControlLabel value="PL" control={<Radio />} 
                    label="Casa" />
                    <FormControlLabel value="DP" control={<Radio />}
                    label="Lote" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Finca" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Taller" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Apartamento" />
                
                </RadioGroup>
            </FormControl>
        </Grid>

        <Typography variant="subtitle2">Opciones</Typography>
        <Divider/>        
        <Grid  container direction="row" justify="center" alignItems="center">        
            <Button color="primary" variant="contained" style={{marginTop:"10px"}} >
                Guardar
            </Button>
        </Grid>

    </Grid>  
  );
};

PatientReview.propTypes = {
  className: PropTypes.string
};

export default PatientReview;
