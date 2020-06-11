import React, { Component } from 'react';

import 'date-fns';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { PetsToolbar, PetsTable, PetsModal } from './components';

import { connect } from 'react-redux';

import { getPets , getPet } from 'actions/pets';



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



class PetList extends Component{
  
  
  constructor(props){
    super(props)
    console.log("petlist props",props)
    this.state = {
      pets:[],
      open:false
    }   
  }

  componentDidMount(){
    
    this.props.getPets((success,error)=>{
      this.setState({
        ...this.state,
        pets:this.props.petsState.pets,
        selectedPet:null,
      })
    })
    
    this.createButton = this.createButton.bind(this)
    this.editButton = this.editButton.bind(this)
    this.deleteButton = this.deleteButton.bind(this)
    this.filteredPets = this.filteredPets.bind(this)
    this.addSelectedPet = this.addSelectedPet.bind(this)
    this.medicalRecordsButton = this.medicalRecordsButton.bind(this)
    this.medicalAppointmentButton = this.medicalAppointmentButton.bind(this)

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)

  }

  addSelectedPet(id){

    let pet = this.state.pets.filter( pet =>  pet._id === id )[0]
    
    this.setState({
      ...this.state,
      selectedPet:pet,
    })

  }

  medicalRecordsButton(){
    console.log('medicalRecordsButton')
    this.props.history.push({
      pathname: '/medicalRecords',
      state: { id: this.state.selectedPet._id }
    })
  }

  medicalAppointmentButton(){
    console.log('medicalAppointmentButton')
    this.handleOpen()
  }

  createButton(){
    console.log("create Button");
    this.props.getPet(null)
    this.props.history.push('/pets/form')
  }

  editButton(){
    console.log("edit Button");
    let self = this
    this.props.getPet(this.state.selectedPet._id,(success, error)=>{
      if(success)
      {
        self.props.history.push('/pets/form')
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

  filteredPets(data){
    //console.log("data",data)
    //return this.props.petsState.pets
    
    if(data.length == 0)
    {
      this.setState({
        ...this.state,
        pets:this.props.petsState.pets
      })
    }else
    {
      data = data.toLowerCase()

        const filteredArray = this.props.petsState.pets.filter( pet => 
            pet.name.toLowerCase().includes(data) ||
            pet.species.toLowerCase().includes(data) ||
            pet.breed.toLowerCase().includes(data) ||
            pet.color.toLowerCase().includes(data) ||
            pet.age.includes(data)
        )

        this.setState({
            ...this.state,
            pets:filteredArray
        })

    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log("should update");
    return nextProps === this.props
  }

  render(){    
    const { classes } = this.props;

    

    return (
      <div className={classes.root}>
        <PetsToolbar
          medicalRecordsButton={this.medicalRecordsButton}
          medicalAppointmentButton={this.medicalAppointmentButton}
          selectedPet={this.state.selectedPet}  
          createButton={this.createButton} 
          editButton={this.editButton}
          deleteButton={this.deleteButton}
          filteredPets={this.filteredPets} />
        <div className={classes.content}>
          <PetsTable species={this.props.appState.species}  
          breeds={this.props.appState.breeds} 
          addSelectedPet={this.addSelectedPet} 
          pets={this.state.pets} />
        </div>
        <PetsModal  open={this.state.open} handleClose={this.handleClose} />
      </div>
    );  
  }
} 


const mapStateToProps = state => {
 
  return {
    petsState: state.pets,  
    appState: state.app
  };
}

PetList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const componentDefinition =  withStyles(useStyles)(PetList);

export default  connect(mapStateToProps, { getPets , getPet } )(componentDefinition);
