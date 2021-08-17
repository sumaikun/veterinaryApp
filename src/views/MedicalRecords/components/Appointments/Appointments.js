import "date-fns";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
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
} from "@material-ui/core";
import Swal from "sweetalert2";
import { Appointment as AppointmentModel } from "models/Appointment";

const doStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const useStyles = {
  root: {},
  horizontalGroup: {
    width: "auto",
    height: "auto",
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
  },
};

const Appointments = (props) => {
  const classes = doStyles();

  const [open, setOpen] = useState(false);

  useEffect(() => {}, []);

  const closeDialog = () => {
    setOpen(false);
  };

  const errors = new Array(1);

  const rules = (key, value) => {
    switch (key) {
      case "reasonForConsultation":
        errors[0] =
          value.length > 0 && value.length < 80
            ? "La razón de consulta debe tener mas de 80 carácteres"
            : false;

        return errors[0];

      case "resultsForConsultation":
        errors[1] =
          value.length > 0 && value.length < 80
            ? "Los resultados de consulta debe tener mas de 80 carácteres"
            : false;

        return errors[1];

      default:
        return true;
    }
  };

  const handleChange = (event) => {
    //console.log(event,event.target)
    //console.log(event.target.name,event.target.value,event.target.checked,event.target.type)
    if (event.target.type === "checkbox") {
      setData(event.target.name, event.target.checked);
    } else {
      setData(event.target.name, event.target.value);
    }
  };

  const [values, setValues] = useState(new AppointmentModel());

  const setData = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  return (
    <Grid lg={12} md={12} xs={12}>
      <Grid container direction="row" justify="center" alignItems="center">
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Veterinario/a</TableCell>
                  <TableCell>Anotación</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Motivo de la consulta</TableCell>
                  <TableCell>Resultados de la consulta</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.appointments
                  .slice(0)
                  .reverse()
                  .map((appointment) => (
                    <TableRow>
                      <TableCell>
                        {appointment?.doctorDetails &&
                          `${appointment?.doctorDetails[0].name} ${appointment?.doctorDetails[0].lastName}`}
                      </TableCell>
                      <TableCell>
                        {appointment?.agendaAnnotation ||
                          "sin anotación de agenda"}
                      </TableCell>
                      <TableCell>{appointment?.state}</TableCell>
                      <TableCell>
                        {appointment?.reasonForConsultation}
                      </TableCell>
                      <TableCell>
                        {appointment?.resultsForConsultation}
                      </TableCell>
                      <TableCell>{appointment?.date.split(" ")[0]}</TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          onClick={() => {
                            if (appointment?.state !== "DONE") {
                              return Swal.fire(
                                "Espera",
                                "Solo las citas completamente terminadas permiten ver la información completa",
                                "warning"
                              );
                            }
                            props.seeCompleteInfo(appointment);
                          }}
                        >
                          Ver info completa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </Grid>

      <Typography variant="subtitle2">Opciones</Typography>
      <Divider />
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          color="primary"
          variant="contained"
          style={{ marginTop: "10px" }}
          onClick={() => props.manageNewAppointment()}
        >
          Gestionar cita
        </Button>
      </Grid>
    </Grid>
  );
};

Appointments.propTypes = {
  className: PropTypes.string,
};

export default Appointments;
