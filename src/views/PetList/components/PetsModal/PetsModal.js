import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Avatar,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { getInitials } from "helpers";

import "date-fns";

import moment from "moment";

import Swal from "sweetalert2";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
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

const PetsModal = (props) => {
  const { open, handleClose, openMedicinesModal, watch, watchValues } = props;

  const classes = useStyles();

  useEffect(() => {}, []);

  const [appointment, setAppointment] = useState({
    ReasonForConsultation: "",
    ResultsForConsultation: "",
    products: [],
  });

  // medicines functions

  const [medicines, setMedicines] = useState([
    {
      product: null,
      presentation: null,
      posology: null,
      administrationWay: null,
      duration: null,
    },
  ]);

  const presentationTypes = [
    "Jarabes",
    "Gotas",
    "Capsulas",
    "Polvo",
    "Granulado",
    "Emulsión",
    "Bebible",
  ];

  const administrationWaysTypes = [
    "Oral",
    "Intravenosa",
    "Intramuscular",
    "Subcutanea",
    "tópica",
    "inhalatoria",
  ];

  const handleChange = (event, key) => {
    if (key != null) {
      const copyArray = JSON.parse(JSON.stringify(medicines));

      copyArray[key] = {
        ...copyArray[key],
        [event.target.name]: event.target.value,
      };

      //console.log("copyArray",copyArray)

      setMedicines([...copyArray]);
    } else {
      setAppointment({
        ...appointment,
        [event.target.name]: event.target.value,
      });
    }
  };

  const addNewMedicament = () => {
    setMedicines([
      ...medicines,
      {
        product: null,
        presentation: null,
        posology: null,
        administrationWay: null,
        duration: null,
      },
    ]);
  };

  const deleteMedicine = (index) => {
    window
      .confirm({
        title: "¿Estas seguro?",
        description:
          "No podras recuperar la información y tendrias que reescribirla",
      })
      .then(() => {
        console.log("index", index);

        const copyArray = JSON.parse(JSON.stringify(medicines));

        console.log(
          "medicines.splice(index, 1)",
          copyArray.splice(index, 1),
          copyArray
        );

        setMedicines([...copyArray]);
      })
      .catch(() => {
        /* ... */
      });
  };

  /**  Dialogs for notifications */

  const [openDialog, setOpenDialog] = useState(false);

  const [openDialog2, setOpenDialog2] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen2 = () => {
    setOpenDialog2(true);
  };

  const handleDialogClose2 = () => {
    setOpenDialog2(false);
  };

  /**  Dialogs for notifications */

  /** services functions */

  const [errorTitle, setErrorTitle] = useState();

  const [appointmentErrors, setAppointmentErrors] = useState([]);

  const frmScheduleAppointment = useRef();

  const ScheduleAppointment = (e) => {
    e.preventDefault();

    if(moment().diff(moment(appointment.appointmentDate),'hours') > 0)
    {
      setErrorTitle("Espera no puedo guardar la cita");
      setAppointmentErrors(["La fecha de agendamiento debe ser mayor al dia de hoy"]);
      handleDialogOpen();
      return;
    }    

    const finalDate = appointment.appointmentDate || props.defaultDate;

    //console.log("finalDate",finalDate)

    const dataToSend = {
      patient: props.patient?._id || props.patient,
      state: "PENDING",
      appointmentDate: moment(finalDate).format("YYYY-MM-DD HH:mm:ss"),
      agendaAnnotation: appointment.agendaAnnotation,
    };

    props.saveAppointment(dataToSend, (success, error) => {
      if (success) {
        handleClose(true);

        window.setTimeout(() => {
          Swal.fire("ok", "cita agendada", "success");
        }, 300);
      }
      if (error) {
        setErrorTitle("Espera no puedo guardar la cita");
        setAppointmentErrors(["Sucedio un error con el servidor"]);
        handleDialogOpen();
      }
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Cita rapida"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            A continuación podra agendar citas, crear citas o verificar
            información de citas anteriores.
          </DialogContentText>
          <Divider></Divider>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Gestionar cita rapida
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Divider></Divider>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Motivo de la consulta"
                    margin="dense"
                    onChange={(event) => {
                      setAppointment({
                        ...appointment,
                        ReasonForConsultation: event.target.value,
                      });
                    }}
                    name="ReasonForConsultation"
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Incluir plan de diagnostico
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Grid container>
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            label="Tipo de examen"
                            margin="dense"
                            name="typeOfExam"
                            required
                            variant="outlined"
                          ></TextField>
                        </Grid>

                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            label="Descripción del examen"
                            margin="dense"
                            name="description"
                            variant="outlined"
                            multiline
                            rows={3}
                          />
                        </Grid>

                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              name="examDate"
                              margin="normal"
                              id="date-picker-dialog"
                              label="Fecha"
                              format="MM/dd/yyyy"
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            label="Laboratorio"
                            margin="dense"
                            name="laboratory"
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            label="Dirección del laboratorio"
                            margin="dense"
                            name="laboratoryAddress"
                            variant="outlined"
                          />
                        </Grid>
                        <Divider></Divider>
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          {/*<Button
                            color="primary"
                            variant="contained"
                            style={{ marginTop: "10px" }}
                          >
                            Guardar
                          </Button>*/}
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>

                <Grid item md={12} xs={12}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Incluir productos
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Grid container>
                        <Grid item md={12} xs={12}>
                          <Button
                            color="success"
                            fullWidth
                            variant="contained"
                            style={{ marginTop: "10px" }}
                            onClick={() => {
                              openMedicinesModal();
                            }}
                          >
                            Seleccionar producto
                          </Button>
                          <Divider></Divider>
                          <Grid container>
                            {props.selectedProducts?.map((product) => (
                              <Grid item md={3} xs={3}>
                                <Avatar
                                  src={
                                    process.env.REACT_APP_SERVE_IMAGE +
                                    product.picture
                                  }
                                  style={{ width: 100, height: 100 }}
                                >
                                  {getInitials(product.name)}
                                </Avatar>
                                <span style={{ fontSize: 13 }}>
                                  {product.name}
                                </span>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>

                <Grid item md={12} xs={12}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Incluir Medicamentos
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Grid container>
                        {medicines.map((currElement, index) => (
                          <Grid key={index} container>
                            <h4>Medicamento: {index + 1}</h4>
                            <CancelIcon
                              style={{ marginTop: "-3px" }}
                              onClick={() => {
                                deleteMedicine(index);
                              }}
                            ></CancelIcon>
                            <Grid item md={12} xs={12}>
                              <TextField
                                fullWidth
                                name="product"
                                onChange={(event) => {
                                  handleChange(event, index);
                                }}
                                label="Principio activo a administrar"
                                variant="outlined"
                                value={medicines[index].product}
                                disabled={watch}
                                margin="dense"
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                style={{ width: "99%" }}
                                onChange={(event) => {
                                  handleChange(event, index);
                                }}
                                variant="outlined"
                                name="presentation"
                                label="Presentación"
                                select
                                value={medicines[index].presentation}
                                disabled={watch}
                                margin="dense"
                                SelectProps={{ native: true }}
                              >
                                <option className={classes.boldOption}>
                                  Selecciona
                                </option>
                                {presentationTypes.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </TextField>
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                style={{ width: "99%" }}
                                name="posology"
                                variant="outlined"
                                onChange={(event) => {
                                  handleChange(event, index);
                                }}
                                disabled={watch}
                                label="Posología"
                                margin="dense"
                                value={medicines[index].posology}
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                style={{ width: "99%" }}
                                fullWidth
                                name="duration"
                                label="Frecuencia o duración"
                                variant="outlined"
                                disabled={watch}
                                onChange={(event) => {
                                  handleChange(event, index);
                                }}
                                margin="dense"
                                value={medicines[index].duration}
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                style={{ width: "99%" }}
                                name="administrationWay"
                                label="Via"
                                variant="outlined"
                                disabled={watch}
                                onChange={(event) => {
                                  handleChange(event, index);
                                }}
                                value={medicines[index].administrationWay}
                                margin="dense"
                                select
                                SelectProps={{ native: true }}
                              >
                                <option className={classes.boldOption}>
                                  Selecciona
                                </option>
                                {administrationWaysTypes.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </TextField>
                            </Grid>

                            <Divider></Divider>
                          </Grid>
                        ))}

                        <Divider></Divider>
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          {!watch && (
                            <Button
                              color="default"
                              variant="contained"
                              style={{ marginTop: "10px", marginLeft: "5px" }}
                              onClick={() => addNewMedicament()}
                            >
                              Añadir otro medicamento
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Resultados y o conclusiones de la consulta"
                    margin="dense"
                    onChange={(event) => {
                      setAppointment({
                        ...appointment,
                        ResultsForConsultation: event.target.value,
                      });
                    }}
                    name="ResultsForConsultation"
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                </Grid>

                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginTop: "10px" }}
                  >
                    Guardar detalles cita
                  </Button>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Agendar Cita</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Divider></Divider>
              <form ref={frmScheduleAppointment} onSubmit={ScheduleAppointment}>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <TextField
                      id="datetime-local"
                      label="Proxima cita"
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue={
                        props.defaultDate || moment().toISOString()
                      }
                      name="appointmentDate"
                      onChange={(event) => {
                        handleChange(event, null);
                      }}
                      required
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Información a tener en cuenta"
                      margin="dense"
                      name="description"
                      variant="outlined"
                      multiline
                      name="agendaAnnotation"
                      onChange={(event) => {
                        handleChange(event, null);
                      }}
                      rows={3}
                      required
                    />
                  </Grid>
                  <Grid tem md={12} xs={12}>
                    <Button
                      fullWidth
                      color="primary"
                      type="submit"
                      variant="contained"
                    >
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{errorTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ul>
              {appointmentErrors.map((aerror) => (
                <li>{aerror}</li>
              ))}
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog2}
        onClose={handleDialogClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{errorTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <h2>¡Datos registros!</h2>
              <span>
                ¿Deseas enviar un correo al paciente con el diagnostico general
                y los medicamentos?
              </span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose2} color="primary" autoFocus>
            Enviar
          </Button>
          <Button onClick={handleDialogClose2} color="primary" autoFocus>
            Terminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PetsModal;
