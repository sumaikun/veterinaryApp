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
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import  api  from 'middleware/api'

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

const DiagnosticPlan = props => {

  const classes = doStyles(); 

  const [ examTypes, setExamTypes ] = useState([]);



  useEffect(() => {

    const getExamTypes = async () => {
      const response = await api.getData("examTypes") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data.name,value:data._id}) )
      setExamTypes(arrayData) 

    }

    getExamTypes()

  },[])


  const [open, setOpen] = useState(false);

  const closeDialog = () =>{
    setOpen(false)
  }

  const createPlan = () =>{

  }

  return (
    <Grid lg={12} md={12} xs={12}>
 

        <Grid  container direction="row" justify="center" alignItems="center">
            <PerfectScrollbar>
            <div className={classes.inner}>
                <Table>
                <TableHead>
                    <TableRow>                  
                    <TableCell>Tipo de examen</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Fecha Realizado</TableCell>
                    <TableCell>Laboratorio</TableCell>
                    <TableCell>Resultados</TableCell>
                    <TableCell>Opciones</TableCell>
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
                    </TableRow>
                </TableBody>
                </Table>
            </div>
            </PerfectScrollbar>
        </Grid>   
        <Typography variant="subtitle2">Opciones</Typography>
        <Divider/>    
        <Grid  container direction="row" justify="center" alignItems="center">        
            <Button color="primary" variant="contained" style={{marginTop:"10px"}}
             onClick={()=>{
               setOpen(true)
             }}>
                Crear nuevo plan de diagnostico
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
                          fullWidth label="Tipo de examen"
                          margin="dense" name="typeOfExam"
                          required
                          select                                   
                          variant="outlined"
                          SelectProps={{ native: true }}
                      >
                          {examTypes.map(option => (
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
                      <TextField  fullWidth  label="Descripción del examen" margin="dense"
                      name="description"  variant="outlined"
                      multiline rows={3} />
                  </Grid>
                  
                  <Grid container direction="row" justify="center" alignItems="center">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                              name ="examDate"
                              margin="normal"
                              id="date-picker-dialog"
                              label="Fecha"
                              format="MM/dd/yyyy"                   
                              KeyboardButtonProps={{
                                  'aria-label': 'change date',
                              }}
                              
                          />              
                      </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item md={12} xs={12}>
                      <TextField  fullWidth  label="Laboratorio" margin="dense"
                      name="laboratory"  variant="outlined"
                  />
                  </Grid>

                  <Grid item md={12} xs={12}>
                      <TextField  fullWidth  label="Dirección del laboratorio" margin="dense"
                      name="laboratoryAddress"  variant="outlined"
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

    </Grid>  
  );
};

DiagnosticPlan.propTypes = {
  className: PropTypes.string
};

export default DiagnosticPlan;
