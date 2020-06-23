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

const PatientFiles = props => {

  const classes = doStyles(); 

  const [open, setOpen] = useState(false);

  useEffect(() => {
  },[]);  

  const closeDialog = () =>{
    setOpen(false)
  }

  return (
    <Grid lg={12} md={12} xs={12}>    

        <Grid  container direction="row" justify="center" alignItems="center">
            <PerfectScrollbar>
            <div className={classes.inner}>
                <Table>
                <TableHead>
                    <TableRow>                  
                        <TableCell>Veterinario/a</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descargar</TableCell>
                        <TableCell>Descripción</TableCell>
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
                    </TableRow>
                </TableBody>
                </Table>
            </div>
            </PerfectScrollbar>
        </Grid>

        <Typography variant="subtitle2">Opciones</Typography>
        <Divider/>    
        <Grid  container direction="row" justify="center" alignItems="center">        
            <Button color="primary" variant="contained" style={{marginTop:"10px"}} onClick={()=>{
              setOpen(true)
            }}>
                  Subir nuevo archivo
            </Button>
        </Grid>


        <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>
                Enfermedad detectada
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                   Información de enfermedad y diagnostico
                </DialogContentText>               
                  
                  <Grid  container>

                  

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  label="Nombre del archivo" margin="dense"
                            name="ResultsForConsultation"  variant="outlined"
                             />          
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  type="file" margin="dense"
                            name="ResultsForConsultation"  variant="outlined"
                             />          
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  label="Descripción" margin="dense"
                            name="ResultsForConsultation"  variant="outlined"
                            multiline rows={3} />          
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

PatientFiles.propTypes = {
  className: PropTypes.string
};

export default PatientFiles;
