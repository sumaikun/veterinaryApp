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

import CancelIcon from '@material-ui/icons/Cancel';

import  api  from 'middleware/api'

import 'date-fns';

import Swal from 'sweetalert2'

import { useConfirm } from 'material-ui-confirm';


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
  }
}));

const PatientsModal = props => {

  const confirm = useConfirm();

  const {  open, handleClose, handleOpen, ...rest } = props;

  const classes = useStyles();

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

  const [appointment, setAppointment] = useState({
    ReasonForConsultation:"",
    ResultsForConsultation:"",
    medicines:[]
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
                A continuación podra agendar citas o crear citas nuevas.
                </DialogContentText>
                <Divider></Divider>

                <ExpansionPanel>  
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Gestionar cita</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Divider></Divider>
                        <Grid  container spacing={3}>

                            <Grid item md={12} xs={12}>
                                <TextField  fullWidth  label="Motivo de la consulta" margin="dense"
                                onChange={(event)=>{ handleChange(event , null)  }}    
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
                                <Typography className={classes.heading}>Incluir Medicamentos</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                
                                <Grid  container>

                                    {

                                    medicines.map( (currElement, index)  => (
                                    <Grid  container>
                                        <h4>Medicamento: { (index + 1 ) }</h4> <CancelIcon onClick={ () => { deleteMedicine(index)  } } ></CancelIcon>
                                        <Grid item md={12} xs={12}>
                                            <TextField  fullWidth name="product"
                                            label="Principio activo a administrar" variant="outlined"  margin="dense"  />
                                        </Grid>

                                        <Grid item md={6} xs={6}>
                                            <TextField  style={{width:"99%"}}
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

                                        <Grid  item md={6} xs={6}>
                                            <TextField style={{width:"99%"}} name="posology"  variant="outlined"  label="Posología"  margin="dense"  />
                                        </Grid>

                                        <Grid item md={6} xs={6}>
                                            <TextField  style={{width:"99%"}} name="totalDose"  label="Dosis total" variant="outlined"  margin="dense"  />
                                        </Grid>

                                        <Grid item md={6} xs={6}>
                                            <TextField  style={{width:"99%"}} name="administrationWay" label="Via" variant="outlined"  margin="dense" select  SelectProps={{ native: true }} >
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

                                        <Grid item md={6} xs={6}>
                                            <TextField  fullWidth name="duration" label="Frecuencia y duración" variant="outlined"  margin="dense"  />
                                        </Grid> 

                                        <Divider></Divider>            
                                    
                                    </Grid>                                    
                                    ))
                                    
                                    }


                                   
                                    <Divider></Divider>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Button color="default" variant="contained" style={{marginTop:"10px",marginLeft:"5px"}} 
                                            onClick={()=> addNewMedicament() }
                                        > 
                                            Añadir 
                                        </Button>
                                    </Grid>                                

                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        </Grid>
                        
                     

                        <Grid item md={12} xs={12}>
                            <TextField  fullWidth  label="Resultados y o conclusiones de la consulta" margin="dense"
                                onChange={(event)=>{ handleChange(event , null)  }}  
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


export default PatientsModal;
