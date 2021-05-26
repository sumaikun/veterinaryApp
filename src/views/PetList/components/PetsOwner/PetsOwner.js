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
    Typography  
  } from '@material-ui/core'
  

import ContactsTable from 'views/ContactList/components/ContactsTable'

import { SearchInput } from 'components';

import  api  from 'middleware/api'

import 'date-fns';

import Swal from 'sweetalert2'

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
  dialogPaper: {
    width: '200%',
  },
}));

const PetsOwner = props => {
  
  const {  open, contacts, selectedPet, handleClose } = props;
   
  const [filteredContacts, setFilteredContacts] = useState([]);

  const [ openDialog, setOpenDialog ] = useState(open)

  const [ selectedContacts, setSelectedContacts ] = useState([])

  useEffect(() => {
    setFilteredContacts(contacts)
  },[]);

  useEffect(() => {
    setSelectedContacts(selectedPet?.contacts || [])
  },[selectedPet]);
  
  useEffect(() => {
    setOpenDialog(open)
  },[open]);
  
  const addFilterText = event => {
    //console.log("filter text",event.target.value)

    const data = event.target.value.toLowerCase()

    if(data.length == 0)
    {
        setFilteredContacts(contacts)
    }else
    {

      const filteredArray = contacts.filter( contact => 
        (contact.name ? contact.name.toLowerCase().includes(data) : false) ||
        (contact.identification ? contact.identification.includes(data) : false) ||
        (contact.email ? contact.email.toLowerCase().includes(data) : false) ||
        (contact.ocupation ? contact.ocupation.toLowerCase().includes(data) : false)
      )

      setFilteredContacts(filteredArray)      

    }
  }

  const addContactsSelected = (contacts) => {
    setSelectedContacts(contacts)
  }
  
  const classes = useStyles();

    return (
        <div>
            <Dialog
                open={openDialog}              
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth="lg"
            >
            <DialogTitle id="alert-dialog-slide-title">{"Contactos"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                Seleccione el contacto
                </DialogContentText>    
                <SearchInput
                    className={classes.searchInput}
                    placeholder="Buscar"
                    onChange={addFilterText}
                />  
                <ContactsTable addContactsSelected={addContactsSelected} selectMultiple={true} contacts={filteredContacts || []} 
                 selectedContacts={selectedContacts} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" onClick={()=>{

                  api.putData(`updatePetContactsEndPoint/${selectedPet._id}`,{ contacts:selectedContacts  })
                  .then( () => {

                    setOpenDialog(false)

                    Swal.fire({
                      icon: 'success',
                      title: '',
                      text: 'Fueron asociados los dueños al sistema',          
                    }).then( () => {
                      setOpenDialog(true)
                    })  
                                  
                  })
                  .catch( error => {
                    console.error("error",error)
                    return Swal.fire({
                      icon: 'error',
                      title: 'Ooops',
                      text: 'Sucedio un error en el servidor',          
                    })
                  })

                }} >
                  Guardar
                </Button>
                <Button onClick={handleClose} color="primary">
                  Cerrar
                </Button>       
            </DialogActions>
            </Dialog>
      
        </div>
      
    );
};


export default PetsOwner;
