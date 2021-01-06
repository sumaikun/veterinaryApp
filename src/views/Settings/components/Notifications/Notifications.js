import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Typography,
  Button,
  Switch,
  TextField,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const Notifications = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Configuración para agenda"
          title=""
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={12}
              sm={12}
              xs={12}
            >
              <Typography
                gutterBottom
                variant="h6"
              >
                Horas de atención
              </Typography>

              <div style={{display:"flex",justifyContent:"space-around"}} >

                <TextField
                  id="time"
                  label="Desde"
                  type="time"
                  defaultValue="07:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
                
                <TextField
                  id="time"
                  label="Hasta"
                  type="time"
                  defaultValue="07:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />

              </div>              
             
            </Grid>

            <Grid  
              className={classes.item}
              item
              md={12}
              sm={12}
              xs={12}
            >
              <Typography
                gutterBottom
                variant="h6"
              >
                Dias de atención
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Lunes"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Martes"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Miercoles"
              />


              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Jueves"
              />


              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Viernes"
              />


              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Sabado"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Domingo"
              />

            </Grid>

            <Grid
              className={classes.item}
              item
              md={12}
              sm={12}
              xs={12}
            >
              <Typography
                gutterBottom
                variant="h6"
              >
                ¿ En este momento estas atendiendo citas ?
              </Typography>

              <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>No</Grid>
                    <Grid item>
                        <AntSwitch  name="havePreviousIllness" />
                    </Grid>
                    <Grid item>Si</Grid>
                </Grid>
             
            </Grid>
            
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
          >
            Guardar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
