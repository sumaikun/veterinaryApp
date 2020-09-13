import React, { Component } from 'react';

import 'date-fns';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { PatientsToolbar, PatientsTable,  PatientsMedicine, PatientsModal  } from './components';

import { connect } from 'react-redux';

import { getPatients , getPatient } from 'actions/patients';

import { getProducts  } from 'actions/products';

import Swal from 'sweetalert2' 

import { setCurrentPatient } from 'actions/app';


const useStyles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
});



class PatientList extends Component{
  
  
  constructor(props){
    super(props)
    console.log("patientlist props",props)
    this.state = {
      patients:[],
      open:false,
      open2:false,
      open3:false
    }   
  }

  componentDidMount(){
    
    this.props.getPatients((success,error)=>{
      this.setState({
        ...this.state,
        patients:this.props.patientsState.patients,
        selectedPatient:null,
      })
    })

    /*this.props.getProducts((success,error)=>{
      this.setState({
        ...this.state,
        products:this.props.productsState.products,
        selectedProduct:null,
      })
    })*/
    
    this.createButton = this.createButton.bind(this)
    this.editButton = this.editButton.bind(this)
    this.deleteButton = this.deleteButton.bind(this)
    this.watchButton = this.watchButton.bind(this)
    this.filteredPatients = this.filteredPatients.bind(this)
    this.addSelectedPatient = this.addSelectedPatient.bind(this)
    this.medicalRecordsButton = this.medicalRecordsButton.bind(this)
    this.medicalAppointmentButton = this.medicalAppointmentButton.bind(this)

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.handleOpen2 = this.handleOpen2.bind(this)
    this.handleClose2 = this.handleClose2.bind(this)

    this.selectProduct = this.selectProduct.bind(this) 


  }

  addSelectedPatient(id){

    let patient = this.state.patients.filter( patient =>  patient._id === id )[0]
    
    this.setState({
      ...this.state,
      selectedPatient:patient,
    })

  }

  medicalRecordsButton(){
    console.log('medicalRecordsButton')

    if( !this.state.selectedPatient.stratus || !this.state.selectedPatient.address || !this.state.selectedPatient.ocupation )
    {
      return Swal.fire("Espera","Para poder agendar una cita necesitas los datos de estrato, dirección y ocupación","warning")
    }

    this.props.setCurrentPatient(this.state.selectedPatient._id)
    
    this.props.history.push({
      pathname: '/medicalRecords',
      state: { id: this.state.selectedPatient._id }
    })   

  }

  medicalAppointmentButton(){
    console.log('medicalAppointmentButton',this.state.selectedPatient)
    if( !this.state.selectedPatient.stratus || !this.state.selectedPatient.address || !this.state.selectedPatient.ocupation )
    {
      return Swal.fire("Espera","Para poder agendar una cita necesitas los datos de estrato, dirección y ocupación","warning")
    }
    
    this.handleOpen()
  }

  createButton(){
    console.log("create Button");
    this.props.getPatient(null)    
    this.props.history.push({pathname: '/patients/form',state: { mode: "form" }})
  }

  editButton(){
    console.log("edit Button");
    let self = this
    this.props.getPatient(this.state.selectedPatient._id,(success, error)=>{
      //console.log("success",success)
      if(success)
      {
        self.props.history.push({pathname: '/patients/form',state: { mode: "form" }})
      }
      
    })
  }

  watchButton(){
    console.log("watch Button");
    let self = this
    this.props.getPatient(this.state.selectedPatient._id,(success, error)=>{
      //console.log("success",success)
      if(success)
      {
        self.props.history.push({pathname: '/patients/form',state: { mode: "watch" }})
      }
      
    })
  }

  deleteButton(){
    console.log("delete Button");
  }

  handleOpen = () => {
    this.setState({
      ...this.state,
      open:true
    })
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      open:false
    })
  };

  handleOpen2 = () => {
    this.setState({
      ...this.state,
      open2:true
    })
  };

  handleClose2 = () => {
    this.setState({
      ...this.state,
      open2:false
    })
  };

  handleOpen3 = () => {
    this.setState({
      ...this.state,
      open3:true
    })
  };

  handleClose3 = () => {
    this.setState({
      ...this.state,
      open3:false
    })
  };

  filteredPatients(data){
    //console.log("data",data)
    //return this.props.patientsState.patients
    
    if(data.length == 0)
    {
      this.setState({
        ...this.state,
        patients:this.props.patientsState.patients
      })
    }else
    {
      data = data.toLowerCase()

        const filteredArray = this.props.patientsState.patients.filter( patient => 
            patient.name.toLowerCase().includes(data) ||
            patient.species.toLowerCase().includes(data) ||
            patient.breed.toLowerCase().includes(data) ||
            patient.color.toLowerCase().includes(data) ||
            patient.age.includes(data)
        )

        this.setState({
            ...this.state,
            patients:filteredArray
        })

    }

  }

  selectProduct(product){
    
    console.log("select product",product)

    this.setState({
      ...this.state,
      selectedProduct:product
    })
  }



  shouldComponentUpdate(nextProps, nextState) {
    //console.log("should update");
    return nextProps === this.props
  }

  render(){    
    const { classes } = this.props;

    

    return (
      <div className={classes.root}>
        <PatientsToolbar
          medicalRecordsButton={this.medicalRecordsButton}
          medicalAppointmentButton={this.medicalAppointmentButton}
          ownersButton={this.ownersButton}
          selectedPatient={this.state.selectedPatient}  
          createButton={this.createButton} 
          editButton={this.editButton}
          watchButton={this.watchButton}
          deleteButton={this.deleteButton}
          filteredPatients={this.filteredPatients} />
        <div className={classes.content}>
          <PatientsTable species={this.props.appState.species}  
          breeds={this.props.appState.breeds} 
          addSelectedPatient={this.addSelectedPatient} 
          patients={this.state.patients} />
        </div>
        <PatientsModal open={ this.state.open } handleClose={ this.handleClose } handleOpen={ this.handleOpen }  ></PatientsModal>
        {
          this.state.products ?  
            <PatientsMedicine  selectProduct={this.selectProduct}  products={this.state.products} open={this.state.open2} handleClose={this.handleClose2}  />:
          null
        }

      </div>
    );  
  }
} 


const mapStateToProps = state => {
 
  return {
    patientsState: state.patients,  
    appState: state.app,
    productsState: state.products,
    contactsState: state.contacts,  
  };
}

PatientList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const componentDefinition =  withStyles(useStyles)(PatientList);

export default  connect(mapStateToProps, { getPatients,
   getPatient,
   getProducts,
   setCurrentPatient } )(componentDefinition);
