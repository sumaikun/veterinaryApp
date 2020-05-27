import 'date-fns';
import React, { useState  , useEffect  } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
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
  Button 
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';



const useStyles = {
  root: {},
  horizontalGroup:{width: 'auto', height: 'auto', display: 'flex', flexWrap: 'nowrap',
  flexDirection: 'row'}
};


const doStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    floatingLabelFocusStyle: {
        color: "#C6C0BF"
    }
  }));

const PhysiologicalConstants = props => {

    
  const classes = doStyles();

  useEffect(() => {
  },[]);  

  return (
    <Grid lg={12} md={12} xs={12}>
         <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="T.LI.C"
                    margin="dense"
                    name="name"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                />
            </Grid>
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="F.C"
                    margin="dense"
                    name="name"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                />
            </Grid>
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="F.R"
                    margin="dense"
                    name="name"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                />
            </Grid>
        </Grid>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="PULSO"
                    margin="dense"
                    name="name"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                />
            </Grid>
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="TEMPERATURA"
                    margin="dense"
                    name="name"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                />
            </Grid>
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="PESO"
                    margin="dense"
                    name="name"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                />
            </Grid>
        </Grid>
        <Typography variant="subtitle2">Actitud</Typography>
        <Divider/> 
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={useStyles.horizontalGroup}  aria-label="customerBenefit">
                    
                    <FormControlLabel value="Asténico" control={<Radio />} 
                    label="Asténico" />
                    <FormControlLabel value="Apoplético" control={<Radio />}
                    label="Apoplético" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Linfático" />
                
                </RadioGroup>
            </FormControl>
        </Grid>
        <Typography variant="subtitle2">Condición corporal</Typography>
        <Divider/>
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={useStyles.horizontalGroup}  aria-label="customerBenefit">
                    
                    <FormControlLabel value="Asténico" control={<Radio />} 
                    label="Caquético" />
                    <FormControlLabel value="Apoplético" control={<Radio />}
                    label="Delgado" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Normal" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Obeso" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Sobrepeso" />
                
                </RadioGroup>
            </FormControl>
        </Grid>
        <Typography variant="subtitle2">Estado de hidratación</Typography>
        <Divider/>
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={useStyles.horizontalGroup}  aria-label="customerBenefit">
                    
                    <FormControlLabel value="Asténico" control={<Radio />} 
                    label="Normal" />
                    <FormControlLabel value="Apoplético" control={<Radio />}
                    label="Deshidr. 0-5%" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Deshidr. 6-7%" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Deshidr. 8-9%" />
                    <FormControlLabel value="CE" control={<Radio />} 
                    label="Deshidr. +10%" />
                
                </RadioGroup>
            </FormControl>
        </Grid>
        <Typography variant="subtitle2">Mucosas</Typography>
        <Divider/>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Mucosa Conjuntival"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Mucosa Oral"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Mucosa Vulvar/prepucial"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Mucosa Rectal"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
            />
        </Grid>

        <Typography variant="subtitle2">Estado físico</Typography>            
        <Divider/>

        <TextField
                fullWidth
                label="Ojos"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
        />

        <TextField
                fullWidth
                label="Oidos"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
        />

        <TextField
                fullWidth
                label="Modulos Linfáticos"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
        />

        <TextField
                fullWidth
                label="Piel y anexos"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
        />

        <TextField
                fullWidth
                label="Locomoción"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
        />

        <TextField
                fullWidth
                label="Musculo esqueletico"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
        />

        <TextField
                fullWidth
                label="Sistema nervioso"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
        />

        <TextField
                fullWidth
                label="Sistema cardiovascular"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
        />

        <TextField
                fullWidth
                label="Sistema respiratorio"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
        />

        <TextField
                fullWidth
                label="Sistema digestivo"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
        />

        <TextField
                fullWidth
                label="Sistema genitourinario"
                margin="dense"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
        />
            
        <Typography variant="subtitle2">Opciones</Typography>
        <Divider/>        
        <Grid  container direction="row" justify="space-evenly" alignItems="center">        
            <Button color="primary" variant="contained" style={{marginTop:"10px"}}  >
                Guardar
            </Button>
            <Button color="primary" variant="contained" style={{marginTop:"10px"}} >
                Crear nuevas constantes fisiológicas
            </Button>
        </Grid>

    </Grid>  
  );
};

PhysiologicalConstants.propTypes = {
  className: PropTypes.string
};

export default PhysiologicalConstants;
