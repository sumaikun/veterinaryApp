import 'date-fns';
import React, { useState  , useEffect  } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Divider,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  RadioGroup,
  Radio,
  FormControl,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,  
} from '@material-ui/core';
import  api  from 'middleware/api'

import PetsMedicine from 'views/PetList/components/PetsMedicine'

const doStyles = makeStyles(theme => ({
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

const useStyles = {
  root: {},
  horizontalGroup:{width: 'auto', height: 'auto', display: 'flex', flexWrap: 'nowrap',
  flexDirection: 'row'}
};

const TherapeuticPlan = props => {

  const classes = doStyles(); 

  const {  products,  ...rest } = props;

  const [ planTypes, setPlanTypes ] = useState([]);

  useEffect(() => {
    
    const getPlanTypes = async () => {
      const response = await api.getData("planTypes") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data.name,value:data._id}) )
      setPlanTypes(arrayData) 

    }

  getPlanTypes()
  },[]);  

  //Terapia de sosten
  //Tratamiento preventivo
  //Tratamiento sintomatico
  //Tratamiento etiologico 

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const closeDialog = () =>{
    setOpen(false)
  }

  const openMedicinesModal = () => {
    setOpen2(true)
  }

  const selectProduct = (data) => {

  }

  const handleClose2 = () => {
    setOpen2(false)
  }




  return (
    <Grid lg={12} md={12} xs={12}>   

        <Grid  container direction="row" justify="center" alignItems="center">
            <PerfectScrollbar>
            <div className={classes.inner}>
                <Table>
                <TableHead>
                    <TableRow>                  
                        <TableCell>Tipo de plan</TableCell>
                        <TableCell>Principio activo a administrar</TableCell>
                        <TableCell>Presentación</TableCell>
                        <TableCell>Posologia</TableCell>
                        <TableCell>Dosis total</TableCell>
                        <TableCell>Via</TableCell>
                        <TableCell>Frecuencia y duración</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </div>
            </PerfectScrollbar>
        </Grid>
        <Typography variant="subtitle2">Opciones</Typography>
        <Divider/>    
        <Grid  container direction="row" justify="center" alignItems="center">        
            <Button color="primary" variant="contained" style={{marginTop:"10px"}}  onClick={()=>{
              setOpen(true)
            }} >
                Crear nuevo plan terapeutico
            </Button>
        </Grid>       

        <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>
                Plan terapeutico
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                   Información de plan terapeutico
                </DialogContentText>

               
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




                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={closeDialog} color="primary">
                    Cancelar
                </Button>
           
            </DialogActions>
        </Dialog> 

        <PetsMedicine selectProduct={selectProduct}  products={products} open={open2} handleClose={handleClose2} />

    </Grid>  
  );
};

TherapeuticPlan.propTypes = {
  className: PropTypes.string
};

export default TherapeuticPlan;
