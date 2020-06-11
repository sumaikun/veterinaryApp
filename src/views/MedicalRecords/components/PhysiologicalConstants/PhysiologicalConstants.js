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


const doStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    floatingLabelFocusStyle: {
        color: "#C6C0BF"
    }
  }));

const PhysiologicalConstants = props => {

    
  const classes = doStyles();

  useEffect(() => {
  },[]); 
  
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
    tlic:"",
    heartRate:"",
    respiratoryRate:"",
    HeartBeat:"",
    temperature:"",
    weight:"",
    attitude:null,
    bodyCondition:null,
    hidrationStatus:null,
    conjuntivalMucosa:"",
    oralMucosa:"",
    vulvallMucosa:"",
    rectalMucosa:"",
    physicalsEye:"",
    physicalsEars:"",
    physicalsLinfaticmodules:"",
    physicalsSkinandanexes:"",
    physicalsLocomotion:"",
    physicalsMusclesqueletal:"",
    physicalsNervoussystem:"",
    physicalsCardiovascularsystem:"",
    physicalsRespiratorysystem:"",
    physicalsDigestivesystem:"",
    physicalsGenitourinarysystem:""
  })

  const setData = (key , value) => {
    setValues({
        ...values,
        [key]:value
    })
    
  }

  return (
    <Grid lg={12} md={12} xs={12}>
         <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="T.LI.C"
                    margin="dense"
                    name="tlic"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.tlic}
                />
            </Grid>
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="F.C"
                    margin="dense"
                    name="heartRate"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.heartRate}
                />
            </Grid>
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="F.R"
                    margin="dense"
                    name="respiratoryRate"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.respiratoryRate}
                />
            </Grid>
        </Grid>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="PULSO"
                    margin="dense"
                    name="HeartBeat"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.HeartBeat}
                />
            </Grid>
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="TEMPERATURA"
                    margin="dense"
                    name="temperature"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.temperature}
                />
            </Grid>
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="PESO"
                    margin="dense"
                    name="weight"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.weight}
                />
            </Grid>
        </Grid>
        <Typography variant="subtitle2">Actitud</Typography>
        <Divider/> 
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={useStyles.horizontalGroup} 
                name="attitude" onChange={handleChange}
                aria-label="attitude">
                    
                    <FormControlLabel value="Astenico" control={<Radio/>} 
                    label="Asténico" />
                    <FormControlLabel value="Apopletico" control={<Radio/>}
                    label="Apoplético" />
                    <FormControlLabel value="Linfatico" control={<Radio/>} 
                    label="Linfático" />
                
                </RadioGroup>
            </FormControl>
        </Grid>
        <Typography variant="subtitle2">Condición corporal</Typography>
        <Divider/>
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={useStyles.horizontalGroup} 
                     name="bodyCondition" onChange={handleChange}
                    aria-label="bodyCondition">
                    
                    <FormControlLabel value="Caquetico" control={<Radio/>} 
                    label="Caquético" />
                    <FormControlLabel value="Delgado" control={<Radio/>}
                    label="Delgado" />
                    <FormControlLabel value="Normal" control={<Radio/>} 
                    label="Normal" />
                    <FormControlLabel value="Obeso" control={<Radio/>} 
                    label="Obeso" />
                    <FormControlLabel value="Sobrepeso" control={<Radio/>} 
                    label="Sobrepeso" />
                
                </RadioGroup>
            </FormControl>
        </Grid>
        <Typography variant="subtitle2">Estado de hidratación</Typography>
        <Divider/>
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={useStyles.horizontalGroup}
                    name="hidrationStatus" onChange={handleChange}
                    aria-label="customerBenefit">
                    
                    <FormControlLabel value="Normal" control={<Radio/>} 
                    label="Normal" />
                    <FormControlLabel value="0-5%" control={<Radio/>}
                    label="Deshidr. 0-5%" />
                    <FormControlLabel value="6-7%" control={<Radio/>} 
                    label="Deshidr. 6-7%" />
                    <FormControlLabel value="8-9%" control={<Radio/>} 
                    label="Deshidr. 8-9%" />
                    <FormControlLabel value="+10%" control={<Radio/>} 
                    label="Deshidr. +10%" />
                
                </RadioGroup>
            </FormControl>
        </Grid>
        <Typography variant="subtitle2">Mucosas</Typography>
        <Divider/>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Mucosa Conjuntival"
                margin="dense"
                name="conjuntivalMucosa"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.conjuntivalMucosa}
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Mucosa Oral"
                margin="dense"
                name="oralMucosa"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.oralMucosa}
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Mucosa Vulvar/prepucial"
                margin="dense"
                name="vulvallMucosa"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.vulvallMucosa}
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Mucosa Rectal"
                margin="dense"
                name="rectalMucosa"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.rectalMucosa}
            />
        </Grid>

        <Typography variant="subtitle2">Estado físico</Typography>            
        <Divider/>

        <TextField
                fullWidth
                label="Ojos"
                margin="dense"
                name="physicalsEye"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsEye}
        />

        <TextField
                fullWidth
                label="Oidos"
                margin="dense"
                name="physicalsEars"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsEars}
        />

        <TextField
                fullWidth
                label="Modulos Linfáticos"
                margin="dense"
                name="physicalsLinfaticmodules"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsLinfaticmodules}
        />

        <TextField
                fullWidth
                label="Piel y anexos"
                margin="dense"
                name="physicalsSkinandanexes"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsSkinandanexes}
        />

        <TextField
                fullWidth
                label="Locomoción"
                margin="dense"
                name="physicalsLocomotion"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsLocomotion}
        />

        <TextField
                fullWidth
                label="Musculo esqueletico"
                margin="dense"
                name="physicalsMusclesqueletal"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsMusclesqueletal}
        />

        <TextField
                fullWidth
                label="Sistema nervioso"
                margin="dense"
                name="physicalsNervoussystem"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsNervoussystem}
        />

        <TextField
                fullWidth
                label="Sistema cardiovascular"
                margin="dense"
                name="physicalsCardiovascularsystem"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsCardiovascularsystem}
        />

        <TextField
                fullWidth
                label="Sistema respiratorio"
                margin="dense"
                name="physicalsRespiratorysystem"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsRespiratorysystem}
        />

        <TextField
                fullWidth
                label="Sistema digestivo"
                margin="dense"
                name="physicalsDigestivesystem"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsDigestivesystem}
        />

        <TextField
                fullWidth
                label="Sistema genitourinario"
                margin="dense"
                name="physicalsGenitourinarysystem"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsGenitourinarysystem}
        />
            
        <Typography variant="subtitle2">Opciones</Typography>
        <Divider/>        
        <Grid  container direction="row" justify="space-evenly" alignItems="center">        
            <Button color="primary" variant="contained" style={{marginTop:"10px"}}  >
                Guardar
            </Button>
            <Button color="primary" variant="contained" style={{marginTop:"10px"}} >
                Crear nuevas constantes fisiológicas
            </Button>
        </Grid>

    </Grid>  
  );
};

PhysiologicalConstants.propTypes = {
  className: PropTypes.string
};

export default PhysiologicalConstants;
