import React, { useState } from 'react';
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
  const {  open, handleClose, ...rest } = props;

  const classes = useStyles();

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
            <DialogTitle id="alert-dialog-slide-title">{"Citas"}</DialogTitle>
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
                    <Typography className={classes.heading}>Gestionar citas</Typography>
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
                                <span>Plan de diagnostico</span>                  
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
                                <span>Plan terapeutico</span>                  
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
                                Guardar
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
                        label="Next appointment"
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
