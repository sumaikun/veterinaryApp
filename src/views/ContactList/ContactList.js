import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { ContactsToolbar, ContactsTable } from './components';

import { connect } from 'react-redux';

import { getContacts , getContact } from 'actions/contacts';

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});



class ContactList extends Component{
  
  
  constructor(props){
    super(props)
    console.log("contactlist props",props)
    this.state = {
      contacts:[]
    }   
  }

  componentDidMount(){
    
    this.props.getContacts((success,error)=>{
      this.setState({
        ...this.state,
        contacts:this.props.contactsState.contacts,
        selectedContact:null,
      })
    })
    
    this.createButton = this.createButton.bind(this)
    this.editButton = this.editButton.bind(this)
    this.deleteButton = this.deleteButton.bind(this)
    this.filteredContacts = this.filteredContacts.bind(this)
    this.addSelectedContact = this.addSelectedContact.bind(this)
  
  }

  addSelectedContact(id){

    let contact = this.state.contacts.filter( contact =>  contact._id === id )[0]
    
    this.setState({
      ...this.state,
      selectedContact:contact,
    })

  }

  createButton(){
    console.log("create Button");
    this.props.getContact(null)
    this.props.history.push('/contacts/form')
  }

  editButton(){
    console.log("edit Button");
    let self = this
    this.props.getContact(this.state.selectedContact._id,(success, error)=>{
      if(success)
      {
        self.props.history.push('/contacts/form')
      }
    })
  }

  deleteButton(){
    console.log("delete Button");
  }

  filteredContacts(data){
    //console.log("data",data)
    //return this.props.contactsState.contacts
    
    if(data.length == 0)
    {
      this.setState({
        ...this.state,
        contacts:this.props.contactsState.contacts
      })
    }else
    {
      data = data.toLowerCase()

      const filteredArray = this.props.contactsState.contacts.filter( contact => 
        contact.name.toLowerCase().includes(data) ||
        contact.email.toLowerCase().includes(data) || 
        contact.phone.includes(data) || 
        contact.date.includes(data) ||
        contact.address.toLowerCase().includes(data)||
        contact.identification.includes(data)||
        contact.stratus.toLowerCase().includes(data) ||
        contact.city.toLowerCase().includes(data) ||
        contact.ocupation.toLowerCase().includes(data) )

        this.setState({
            ...this.state,
            contacts:filteredArray
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
        <ContactsToolbar
          selectedContact={this.state.selectedContact}  
          createButton={this.createButton} 
          editButton={this.editButton}
          deleteButton={this.deleteButton}
          filteredContacts={this.filteredContacts} />
        <div className={classes.content}>
          <ContactsTable  addSelectedContact={this.addSelectedContact} contacts={this.state.contacts} />
        </div>
      </div>
    );  
  }
} 


const mapStateToProps = state => {
 
  return {
    contactsState: state.contacts,  
  };
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const componentDefinition =  withStyles(useStyles)(ContactList);

export default  connect(mapStateToProps, { getContacts , getContact } )(componentDefinition);
