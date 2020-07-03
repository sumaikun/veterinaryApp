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
  TherapeuticPlan, Appointments, Diseases, PatientFiles  } from './components'
import 'date-fns';
import { getProducts  } from 'actions/products';
import { setCurrentPatient } from 'actions/app';
import { getPatientReviewsByPatient, savePatientReview } from 'actions/patientReviews';
import { getPhysiologicalConstantsByPatient } from 'actions/pyshiologicalConstants';
import { PatientReview as PatientReviewModel } from "models/patientReview";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));


const MedicalRecords = props => {

  
  //console.log("history id",props.history.location.state.id)

  try{
    setCurrentPatient(props.history.location.state.id)
  }catch(e){
    console.error(e)
  }

  
  
  const classes = useStyles();

  const [currentPatientId, setCurrentPatientId] = useState(props.appState.currentPatient) 

  //const [values,setValues] = useState({})

  const [products,setProducts] = useState(null)

  const [patientReview, setPatientReview] = useState(null)

  const [currentConstants, setCurrentConstants] = useState({})

  const [ idToSave, setIdToSave ] = useState(null)

  useEffect(() => {

    let mounted = true;   

    if(mounted)
    {
      props.getProducts((success,error)=>{
        if(success)
        {
          setProducts(props.productsState.products)
        }
        if(error){
          alert("Sucedio un error trayendo los productos")
        }
      })
  
      props.getPatientReviewsByPatient(currentPatientId,(success,error)=>{
        
        if(success)
        {
            //if(props.patienReviewState.patientReviews[0])
            if(success[0])
            {
              setPatientReview(success[0])
            }
            else{
              setPatientReview(new PatientReviewModel())
            }    
            
           
        }
        if(error){
            alert("Sucedio un error trayendo las reseñas del paciente")
        }

      })
  
      props.getPhysiologicalConstantsByPatient(currentPatientId,(success,error)=>{
        
        if(success)
        {
            console.info("physiological constants",props.constantsState)
        }
        if(error){
          alert("Sucedio un error trayendo las constantes fisiológicas")
        }

      })

      mounted = false
    } 


  },[]);  

  

  /*const changeValues = (key,value) =>
  {

    console.log(key,value);
    setValues({
      ...values,
      [key]: value
    });
  
    console.log(values)

    
  }*/

 
  const saveOrUpdatePatientReview = (values) =>{
    console.log("patientReview to save",values)

    values.patient = currentPatientId
    
    if(idToSave)
    {
      if(!values._id)
      {
        values._id = idToSave
      }
      
    }

    console.log("props.patienReviewState.selectedPatientReview",props.patienReviewState)

   
    props.savePatientReview(values,(res,err)=>{       
        
      if(res){
        console.log("res end point",res)
        
        setIdToSave(res.data.id)
        
        return Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: "Datos registrados",          
        })
      }      
      
    })
    
  }

  return (
    <div className={classes.root} style={{marginTop:"25px"}}>
        <Typography variant={"h3"} style={{textAlign:"center"}}>Historial Medico { " "+currentPatientId }</Typography>
       
      <div className={classes.root}>
        
        <ExpansionPanel  >  
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>Reseña del paciente</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

                {
                  
                  patientReview ?

                  <PatientReview  patientReview={ patientReview }
                  saveOrUpdatePatientReview={saveOrUpdatePatientReview} /> :
                  null

                }                    

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
              {
                products ? <TherapeuticPlan products={products} /> : false
              }
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


        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Enfermedades detectadas</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Diseases/>
            </ExpansionPanelDetails>
            
        </ExpansionPanel>

        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Archivos</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <PatientFiles/>
            </ExpansionPanelDetails>
            
        </ExpansionPanel>
       
       </div>
    </div>
  );
};


const mapStateToProps = state => {
 
  return {
    //petsState: state.pets,
    appState: state.app,
    productsState: state.products,  
    patienReviewState: state.patientReviews,
    constantsState: state.physiologicalConstants
  };
}


export default  connect(mapStateToProps, {
  getProducts,
  setCurrentPatient,
  getPatientReviewsByPatient,
  getPhysiologicalConstantsByPatient,
  savePatientReview,
} )(MedicalRecords);
