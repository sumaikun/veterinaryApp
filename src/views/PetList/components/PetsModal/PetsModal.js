import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Modal, Backdrop, Fade,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid, TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slide,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails
  } from '@material-ui/core'
  
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import  api  from 'middleware/api'

import 'date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const PetsModal = props => {
  const {  open, handleClose,openMedicinesModal, ...rest } = props;

  const classes = useStyles();

  const [ examTypes, setExamTypes ] = useState([]);

  const [ planTypes, setPlanTypes ] = useState([]);

  useEffect(() => {

    const getExamTypes = async () => {
      const response = await api.getData("examTypes") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data &&  response.data.forEach( data => arrayData.push({label:data.name,value:data._id}) )
      setExamTypes(arrayData) 

    }

    getExamTypes()

    const getPlanTypes = async () => {
        const response = await api.getData("planTypes") 
  
        let arrayData = [{label:"",value:""}]
        console.log(response.data)
        response.data && response.data.forEach( data => arrayData.push({label:data.name,value:data._id}) )
        setPlanTypes(arrayData) 
  
    }
  
    getPlanTypes()

  },[]); 

  const [appointment, setAppointment] = useState({
    ReasonForConsultation:"",
    ResultsForConsultation:"",
    products:[]
  })


  
    return (
        <div>
            <Dialog
                open={open}              
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">{"Cita rapida"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                A continuación podra agendar citas, crear citas o verificar información de citas anteriores.
                </DialogContentText>
                <Divider></Divider>

                <ExpansionPanel>  
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Gestionar cita rapida</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Divider></Divider>
                        <Grid  container spacing={3}>

                            <Grid item md={12} xs={12}>
                                <TextField  fullWidth  label="Motivo de la consulta" margin="dense"
                                onChange={(event)=>{
                                    setAppointment({
                                        ...appointment,
                                        "ReasonForConsultation":event.target.value   
                                    })
                                }}    
                                name="ReasonForConsultation"  variant="outlined"
                                multiline rows={3} />
                            </Grid>
                            
                            <Grid item md={12} xs={12}>
                            <ExpansionPanel>  
                                <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography className={classes.heading}>Incluir plan de diagnostico</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                
                                <Grid  container>

                                    <Grid item md={12} xs={12}>
                                        <TextField
                                            fullWidth label="Tipo de examen"
                                            margin="dense" name="typeOfExam"
                                            required
                                            select                                   
                                            variant="outlined"
                                            SelectProps={{ native: true }}
                                        >
                                            {examTypes.map(option => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item md={12} xs={12}>
                                        <TextField  fullWidth  label="Descripción del examen" margin="dense"
                                        name="description"  variant="outlined"
                                        multiline rows={3} />
                                    </Grid>
                                    
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                name ="examDate"
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

                                    <Grid item md={12} xs={12}>
                                        <TextField  fullWidth  label="Laboratorio" margin="dense"
                                        name="laboratory"  variant="outlined"
                                    />
                                    </Grid>

                                    <Grid item md={12} xs={12}>
                                        <TextField  fullWidth  label="Dirección del laboratorio" margin="dense"
                                        name="laboratoryAddress"  variant="outlined"
                                    />
                                    </Grid>
                                    <Divider></Divider>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Button color="primary" variant="contained" style={{marginTop:"10px"}} >
                                            Guardar
                                        </Button>
                                    </Grid>                                

                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        </Grid>
                        
                        <Grid item md={12} xs={12}>
                        <ExpansionPanel>  
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography className={classes.heading}>Incluir plan terapeutico</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                                <Grid  container>
                                    <Grid item md={12} xs={12}>
                                        <TextField
                                            fullWidth label="Tipo de plan"
                                            margin="dense" name="typeOfExam"
                                            required
                                            select                                   
                                            variant="outlined"
                                            SelectProps={{ native: true }}
                                        >
                                            {planTypes.map(option => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item md={12} xs={12}>
                                        <Button color="success" fullWidth variant="contained" style={{marginTop:"10px"}}
                                            onClick={ () => {
                                                openMedicinesModal()
                                            }}
                                        >
                                            Seleccionar medicamento
                                        </Button> 
                                        <Typography style={{ textAlign:"center" }} variant="button" >
                                            { props.selectedProduct ? "Producto seleccionado : "+props.selectedProduct.name : null }
                                        </Typography>                                   
                                    </Grid>

                                    <Grid item md={12} xs={12}>
                                        <TextField  fullWidth  label="Posología" margin="dense"
                                        name="laboratory"  variant="outlined"
                                    />
                                    </Grid>

                                    <Grid item md={12} xs={12}>
                                        <TextField  fullWidth  label="Dosis total" margin="dense"
                                        name="laboratory"  variant="outlined"
                                    />
                                    </Grid>

                                    <Grid item md={12} xs={12}>
                                        <TextField  fullWidth  label="Frecuencia y duración" margin="dense"
                                        name="laboratory"  variant="outlined"
                                    />
                                    </Grid>

                                    <Divider></Divider>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Button color="primary" variant="contained" style={{marginTop:"10px"}} >
                                            Guardar
                                        </Button>
                                    </Grid> 

                                </Grid>
                                              
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <TextField  fullWidth  label="Resultados y o conclusiones de la consulta" margin="dense"
                                onChange={(event)=>{
                                    setAppointment({
                                        ...appointment,
                                        "ResultsForConsultation":event.target.value   
                                    })
                                }}
                                name="ResultsForConsultation"  variant="outlined"
                                multiline rows={3} />          
                        </Grid>

                        <Grid  container direction="row" justify="center" alignItems="center">        
                            <Button color="primary" variant="contained" style={{marginTop:"10px"}} >
                                Guardar detalles cita
                            </Button>
                        </Grid>
                        
                    </Grid>
                    
                
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                
                <ExpansionPanel>  
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography className={classes.heading}>Agendar Cita</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Divider></Divider>
                    <Grid  container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <TextField
                        id="datetime-local"
                        label="Proxima cita"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  label="Información a tener en cuenta" margin="dense" name="description"  variant="outlined"
                            multiline rows={3} />          
                    </Grid>
                    <Grid tem md={12} xs={12}>
                        <Button fullWidth
                        color="primary"
                        variant="contained"                          
                        >
                        Guardar
                        </Button>
                    </Grid>
                    </Grid>
                </ExpansionPanelDetails>
                </ExpansionPanel>        

                



            
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cerrar
                </Button>       
            </DialogActions>
            </Dialog>
        </div>
      
    );
};


export default PetsModal;
