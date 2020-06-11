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

  const handleWindowSizeChange = () => {
    console.log("window size changed",screenWidth)
    setscreenWidth(window.innerWidth)

  };

  const handleChange = event => {
    
    //console.log(event,event.target)
    console.log(event.target.name,event.target.value,event.target.checked,event.target.type)
    if( event.target.type === "checkbox" )
    {
        setData(event.target.name,event.target.checked)
    }
    else{
        setData(event.target.name,event.target.value)
    }

  };

  const [values, setValues] = useState({
    pvcVaccine:false,
    tripleVaccine:false,
    rabiesVaccine:false,
    pvcVaccineDate:null,
    tripleVaccineDate:null,
    rabiesVaccineDate:null,
    rabiesVaccineDate:null,
    desparasitationProduct:"",
    lastDesparasitation:null,
    feedingType:null,
    reproductiveState:null,
    previousIllnesses:"",
    surgeris:"",
    familyBackground:"",
  })

  const setData = (key , value) => {
    setValues({
        ...values,
        [key]:value
    })
    
  }

  window.addEventListener('resize', handleWindowSizeChange);

  useEffect(() => {
  },[]);

  const [screenWidth, setscreenWidth] = useState(window.innerWidth);

  //const screenWidth =  window.innerWidth

  //const isMobile = screenWidth <= 550;

  return (
    <Grid lg={12} md={12} xs={12}>
        <Typography variant="subtitle2">Vacunación</Typography>
        <Divider/>
        <Grid lg={12} md={12} xs={12}>
            <FormControlLabel
                control={<Checkbox  name="pvcVaccine" />}
                label="PVC"
                onChange={handleChange}
                checked={values.pvcVaccine}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    name="pvcVaccineDate"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha pvc"
                    format="MM/dd/yyyy"                   
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    onChange={(date)=>setData("pvcVaccineDate",date)}
                    value={values.pvcVaccineDate}
                   
                />              
            </MuiPickersUtilsProvider>
            <FormControlLabel
                control={<Checkbox  name="tripleVaccine" />}
                label="TRIPLE"
                onChange={handleChange}
                checked={values.pvcVaccine}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    name ="tripleVaccineDate"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha triple"
                    format="MM/dd/yyyy"                   
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    onChange={(date)=>setData("tripleVaccineDate",date)}
                    value={values.tripleVaccineDate}
                />              
            </MuiPickersUtilsProvider>
            <FormControlLabel
                control={<Checkbox  name="rabiesVaccine" />}
                label="RABIA"
                onChange={handleChange}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    name="rabiesVaccineDate"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha rabia"
                    format="MM/dd/yyyy"                   
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    onChange={(date)=>setData("rabiesVaccineDate",date)}
                    value={values.rabiesVaccineDate}
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
            <Grid lg={6} md={6} xs={6}>
                <TextField
                    fullWidth
                    onChange={handleChange}
                    label="Producto"
                    margin="dense"
                    name="desparasitationProduct"
                    variant="outlined"
                    value={ values.desparasitationProduct }
                />
            </Grid>
            <Grid lg={6} md={6} xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        name="lastDesparasitation"
                        style={{marginLeft:"25px"}}
                        margin="normal"
                        id="date-picker-dialog"
                        label="Fecha"
                        format="MM/dd/yyyy"                   
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        onChange={(date)=>setData("lastDesparasitation",date)}
                        value={values.lastDesparasitation}
                    />              
                </MuiPickersUtilsProvider>       
            </Grid>            
        </Grid>
        <Typography variant="subtitle2">Alimentación</Typography>
        <Divider/>
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={screenWidth > 550 ? useStyles.horizontalGroup : null} 
                 aria-label="feedingType" onChange={handleChange}
                 value={ values.feedingType } name="feedingType" >
                    
                    <FormControlLabel value="Balanceada" control={<Radio />} 
                    label="Balanceada"  />
                    <FormControlLabel value="Casera" control={<Radio />}
                    label="Casera"  />
                    <FormControlLabel value="Mixta" control={<Radio />} 
                    label="Mixta"  />
                
                </RadioGroup>
            </FormControl>
        </Grid>
        <Typography variant="subtitle2">Estado reproductivo</Typography>
        <Divider/>
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={screenWidth > 550 ? useStyles.horizontalGroup : null}
                value={ values.reproductiveState }  
                aria-label="customerBenefit" name="reproductiveState" onChange={handleChange}>
                    
                    <FormControlLabel value="Castrado" control={<Radio />} 
                    label="Castrado"  />
                    <FormControlLabel value="Gestacion" control={<Radio />}
                    label="Gestación"  />
                    <FormControlLabel value="Entero" control={<Radio />} 
                    label="Entero"  />
                    <FormControlLabel value="Lactancia" control={<Radio />} 
                    label="Lactancia"  />
                
                </RadioGroup>
            </FormControl>
        </Grid>
        
        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Enfermedades Anteriores"
                margin="dense"
                name="previousIllnesses"
                variant="outlined"
                multiline
                rows={3}
                onChange={handleChange}
                value={ values.previousIllnesses }
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Cirugías"
                margin="dense"
                name="surgeris"
                variant="outlined"
                multiline
                rows={3}
                onChange={handleChange}
                value={ values.surgeris }
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Antecedentes familiares"
                margin="dense"
                name="familyBackground"
                variant="outlined"
                multiline
                rows={3}
                onChange={handleChange}
                value={ values.familyBackground }
            />
        </Grid>

        <Typography variant="subtitle2">Habitat</Typography>
        <Divider/>
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={screenWidth > 550 ? useStyles.horizontalGroup : null}
                onChange={handleChange} name="habitat" value={ values.habitat }
                aria-label="habitat">
                    
                    <FormControlLabel value="Casa" control={<Radio />} 
                    label="Casa" />
                    <FormControlLabel value="Lote" control={<Radio />}
                    label="Lote" />
                    <FormControlLabel value="Finca" control={<Radio />} 
                    label="Finca" />
                    <FormControlLabel value="Taller" control={<Radio />} 
                    label="Taller" />
                    <FormControlLabel value="Apartamento" control={<Radio />} 
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
