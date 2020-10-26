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

import Autocomplete from '@material-ui/lab/Autocomplete'; 
  
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CancelIcon from '@material-ui/icons/Cancel';

import  api  from 'middleware/api'

import 'date-fns';

import Swal from 'sweetalert2'

import { useConfirm } from 'material-ui-confirm';

import moment from 'moment';

import * as cie10 from 'cie10';

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
  },
  boldOption: {
      fontWeight: 'bold'
  },
  notchedOutline: {
    color:"white !important",
    borderColor: "white !important"
  },
  floatingLabelFocusStyle: {
    color: "white !important"
  }
}));

const PatientsModal = props => {

  const confirm = useConfirm();

  const {  open, handleClose, handleOpen,  doctors, ...rest } = props;

  console.log("props",props)

  const classes = useStyles();

  const cie10Codes = cie10('array');

  const [ medicines , setMedicines ] = useState([
      {
        product:null,
        presentation:null,
        posology:null,
        totalDose:null,
        administrationWay:null,
        duration:null
      }
  ]) 

  const [appointment, setAppointment] = useState({
    ReasonForConsultation:"",
    ResultsForConsultation:"",
    medicines:[],
    doctor:null
  })

  const addNewMedicament = () => {

    setMedicines([...medicines , {
        product:null,
        presentation:null,
        posology:null,
        totalDose:null,
        administrationWay:null,
        duration:null
    }])

  }

  const deleteMedicine = (index) => {
    confirm({  title:'¿Estas seguro?'  ,description: 'No podras recuperar la información y tendrias que reescribirla' })
      .then(() => {  

        console.log("index",index)

        const copyArray = JSON.parse( JSON.stringify( medicines ) );

        console.log("medicines.splice(index, 1)",copyArray.splice(index, 1),copyArray)

        setMedicines([ ...copyArray ])


      })
      .catch(() => { /* ... */ });
  };



  //console.log("medicines",medicines)

  const presentationTypes = [ "Jarabes", "Gotas", "Capsulas", "Polvo", "Granulado", "Emulsión", "Bebible" ]

  const administrationWaysTypes = [ "Jarabes", "Gotas", "Capsulas", "Polvo", "Granulado", "Emulsión", "Bebible" ]

  const handleChange = ( event , key ) => {
    //console.log(event.target.name, event.target.value, key)

    if(key != null)
    {
        const copyArray = JSON.parse( JSON.stringify( medicines ) );

        copyArray[ key ] = { ...copyArray[ key ] , [event.target.name]:event.target.value }

        //console.log("copyArray",copyArray)

        setMedicines([ ...copyArray ])


    }else{
        setAppointment({
            ...appointment,
            [event.target.name]:event.target.value
        })
    }

  }

  const AutoCompleteChange = (event, complete, name) => {

    console.log("autocomplete changed",event,complete,name)
    
    /*if(values){
      setValues({
        ...values,
        [name]: complete.value
      });
      //props.changeDetails(name,values.value)
    }*/

  }


  //useEffect(() => {

 
    /*
    const getPlanTypes = async () => {
        const response = await api.getData("planTypes") 
  
        let arrayData = [{label:"",value:""}]
        console.log(response.data)
        response.data.forEach( data => arrayData.push({label:data.name,value:data._id}) )
        setPlanTypes(arrayData) 
  
      }
  
    getPlanTypes()*/

  //},[]); 

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const [ appointmentErrors , setAppointmentErrors ] = useState([])

  const [ errorTitle , setErrorTitle ] = useState(null)

  const saveAppointment = () => {

      console.log("appintment",appointment)

      console.log("medicines",medicines)

      const copyArray = []

      //setAppointmentErrors(["testing error"])

      if( !appointment.ReasonForConsultation || appointment.ReasonForConsultation < 15 ){
        copyArray.push("La razón de consulta debe tener por lo menos 15 carácteres")
      }

      if( !appointment.ResultsForConsultation || appointment.ReasonForConsultation < 15 ){
        copyArray.push("El resultado de la consulta debe tener por lo menos 15 carácteres")
      }

      let medicinesValidation = false

      medicines.forEach(  medicine => {
          if( !medicine.product || !medicine.presentation || !medicine.posology || !medicine.totalDose || !medicine.administrationWay 
            || medicine.duration ){

                medicinesValidation = true

          }

          if( medicine.product && medicine.product.length < 5 || medicine.posology && medicine.posology.length < 5 || 
            medicine.totalDose && medicine.totalDose.length < 5  )
            {
                medicinesValidation = true
            }
      })

      if( medicinesValidation )
      {
        copyArray.push("Deben llenarse todos los campos de cada medicamento con valores validos (minimo 5 carácteres) ")
      }

      if( !appointment.doctor ){
        copyArray.push("debes poner un doctor para asociar la cita")
      }

      if(copyArray.length > 0)
      {
        setErrorTitle("Espera no puedo guardar la cita")
        setAppointmentErrors(  copyArray  )  
        return handleDialogOpen()
      }

      
      
  }


  
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
                A continuación podra agendar citas o crear citas nuevas.
                </DialogContentText>
                <Divider></Divider>

                <ExpansionPanel style={{ backgroundColor:"#1b2458" }} >  
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography  style={{ color:"white" }} className={classes.heading}>Gestionar cita</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Divider></Divider>
                        <Grid  container spacing={3}>

                            <Grid item md={12} xs={12}>
                                <TextField  fullWidth  label="Anamnesis (Motivo de la consulta)" margin="dense"
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    },
                                    style:{ color:"white"  }
                                }}
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                                onChange={(event)=>{ handleChange(event , null)  }}    
                                name="ReasonForConsultation"  variant="outlined"
                                multiline rows={3} />
                            </Grid>

                            <Grid item md={12} xs={12}>
                                <TextField  fullWidth  label="Analísis medico (del Motivo de la consulta)" margin="dense"
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    },
                                    style:{ color:"white"  }
                                }}
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                                onChange={(event)=>{ handleChange(event , null)  }}    
                                name="medicalReasonForConsultation"  variant="outlined"
                                multiline rows={3} />
                            </Grid>
                            
                            <Grid item md={12} xs={12}>
                            <ExpansionPanel>  
                                <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography className={classes.heading}>Incluir Medicamentos</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                
                                    <Grid  container>

                                        {medicines.map( (currElement, index)  => (
                                        <Grid  key={index} container>
                                            <h4>Medicamento: { (index + 1 ) }</h4> 
                                            <CancelIcon style={{ marginTop:"-3px" }}  onClick={ () => { deleteMedicine(index)  } } ></CancelIcon>
                                            <Grid item md={12} xs={12}>
                                                <TextField  fullWidth name="product"
                                                onChange={(event)=>{ handleChange(event , index)  }}
                                                label="Principio activo a administrar" variant="outlined"  margin="dense"  />
                                            </Grid>

                                            <Grid item md={6} xs={12}>
                                                <TextField  style={{width:"99%"}} onChange={(event)=>{ handleChange(event , index)  }}
                                                variant="outlined" name="presentation"  label="Presentación" select  
                                                margin="dense" SelectProps={{ native: true }} >
                                                    <option className={classes.boldOption} >Selecciona</option>
                                                    {presentationTypes.map(option => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    ))}
                                                </TextField>
                                            </Grid>

                                            <Grid  item md={6} xs={12}>
                                                <TextField style={{width:"99%"}} name="posology"  variant="outlined"
                                                onChange={(event)=>{ handleChange(event , index)  }}
                                                label="Posología"  margin="dense"  />
                                            </Grid>

                                            <Grid item md={6} xs={12}>
                                                <TextField style={{width:"99%"}} fullWidth name="duration" label="Frecuencia o duración" variant="outlined" 
                                                onChange={(event)=>{ handleChange(event , null)  }} margin="dense"  />
                                            </Grid> 

                                            <Grid item md={6} xs={12}>
                                                <TextField  style={{width:"99%"}} name="administrationWay" label="Via" variant="outlined"
                                                onChange={(event)=>{ handleChange(event , index)  }}  margin="dense" select  SelectProps={{ native: true }} >
                                                    <option className={classes.boldOption} >Selecciona</option>
                                                    {administrationWaysTypes.map(option => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    ))}
                                                </TextField>
                                            </Grid>                                            

                                            <Divider></Divider>            
                                        
                                        </Grid>

                                        ))}
                                    
                                        <Divider></Divider>
                                        <Grid container direction="row" justify="center" alignItems="center">
                                            <Button color="default" variant="contained" style={{marginTop:"10px",marginLeft:"5px"}} 
                                                onClick={()=> addNewMedicament() }
                                            > 
                                                Añadir otro medicamento
                                            </Button>
                                        </Grid>                                

                                    </Grid>

                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                id="combo-box-demo2"
                                //searchText="example"
                                options={cie10Codes}
                                getOptionLabel={(option) => option.d }
                                
                                onChange={(event, values) => 
                                {
                                    setAppointment({
                                        ...appointment,
                                        diagnosticCode:values?.c || null
                                    })
                                }}
                                renderInput={(params) => 
                                    <TextField {...params} label="Diagnostico tecnico"
                                        margin="dense"
                                        InputProps={{
                                            ...params.InputProps ,
                                            classes: {
                                                notchedOutline: classes.notchedOutline
                                            },
                                            style:{ color:"white"  }
                                        }}                            
                                        InputLabelProps={{
                                            classes:{
                                                root: classes.floatingLabelFocusStyle,
                                                focused: classes.floatingLabelFocusStyle,
                                            }                                    
                                        }}                               
                                        variant="outlined" />}                                
                            />
                        </Grid>
                        
                     

                        <Grid item md={12} xs={12}>
                            <TextField  fullWidth  label="Resultados o conclusiones de la consulta" margin="dense"
                                onChange={(event)=>{ handleChange(event , null)  }}  
                                InputProps={{
                                    classes: {
                                      notchedOutline: classes.notchedOutline
                                    },
                                    style:{ color:"white"  }
                                }}
                                InputLabelProps={{
                                    classes:{
                                        root: classes.floatingLabelFocusStyle,
                                        focused: classes.floatingLabelFocusStyle,
                                    }                                    
                                }}
                                name="ResultsForConsultation"  variant="outlined"
                                multiline rows={3} />          
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                id="combo-box-demo"
                                //searchText="example"
                                options={doctors}
                                getOptionLabel={(option) => option.name +" "+option.lastName+", id: "+option.identification+" ,cel: "+option.phone }
                                
                                onChange={(event, values) => 
                                {
                                    //console.log(event,values)
                                    setAppointment({
                                        ...appointment,
                                        doctor:values?.id || null
                                    })
                                }}
                                renderInput={(params) => 
                                    <TextField {...params} label="Médico"
                                        margin="dense"
                                        InputProps={{
                                            ...params.InputProps ,
                                            classes: {
                                                notchedOutline: classes.notchedOutline
                                            },
                                            style:{ color:"white"  }
                                        }}                            
                                        InputLabelProps={{
                                            classes:{
                                                root: classes.floatingLabelFocusStyle,
                                                focused: classes.floatingLabelFocusStyle,
                                            }                                    
                                        }}                               
                                        variant="outlined" />}                                
                            />
                        </Grid>

                        <Grid  container direction="row" justify="center" alignItems="center">        
                            <Button color="primary" variant="contained" style={{marginTop:"10px"}} onClick={saveAppointment}    >
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
                            defaultValue={ moment().toISOString() }
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
                        <Grid item xs={12}>
                                <Autocomplete
                                    id="combo-box-demo"
                                    //searchText="example"
                                    options={doctors}
                                    getOptionLabel={(option) => option.name +" "+option.lastName+",id:"+option.identification+",cel:"+option.phone }
                                    //onChange={(event, values)=>AutoCompleteChange(event, values,"laboratory")}
                                    renderInput={(params) => 
                                        <TextField {...params} label="Médico"
                                            margin="dense"                           
                                            variant="outlined" />}                                
                                        />
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




            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{errorTitle}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <ul>{

                    appointmentErrors.map( aerror  => (
                        
                    <li>{ aerror }</li>
                        
                    ))
                }</ul> 
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDialogClose} color="primary" autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>


        </div>
      
    );
};


export default PatientsModal;
