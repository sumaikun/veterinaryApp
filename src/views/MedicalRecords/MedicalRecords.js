import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails
    } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import Swal from 'sweetalert2' 
import { PatientReview, PhysiologicalConstants, DiagnosticPlan,
  TherapeuticPlan, Appointments  } from './components'
import 'date-fns';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));


const MedicalRecords = props => {
  
  const classes = useStyles();

  const [values,setValues] = useState({})

  const changeValues = (key,value) =>
  {

    console.log(key,value);
    setValues({
      ...values,
      [key]: value
    });
  
    console.log(values)
  }

 

  return (
    <div className={classes.root} style={{marginTop:"25px"}}>
        <Typography variant={"h3"} style={{textAlign:"center"}}>Historial Medico</Typography>
      <div className={classes.root}>
        
        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>Reseña del paciente</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <PatientReview/>            
            </ExpansionPanelDetails>
        </ExpansionPanel>
        
        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Constantes fisiológicas</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <PhysiologicalConstants/>
            </ExpansionPanelDetails>            
        </ExpansionPanel>

        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Planes de diagnostico</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <DiagnosticPlan/>
            </ExpansionPanelDetails>
            
        </ExpansionPanel>

        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Planes terapeuticos</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TherapeuticPlan/>
            </ExpansionPanelDetails>
            
        </ExpansionPanel>

        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Citas</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Appointments/>
            </ExpansionPanelDetails>
            
        </ExpansionPanel>
       
       </div>
    </div>
  );
};


const mapStateToProps = state => {
 
  return {
    petsState: state.pets,
    appState: state.app  
  };
}


export default  connect(mapStateToProps, {} )(MedicalRecords);
