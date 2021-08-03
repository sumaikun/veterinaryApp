import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import {
  PatientReview,
  PhysiologicalConstants,
  Appointments,
  Diseases,
  PatientFiles,
} from "./components";
import "date-fns";
import { setCurrentPatient } from "actions/app";
import {
  getPatientReviewsByPatient,
  savePatientReview,
} from "actions/patientReviews";
import {
  getPhysiologicalConstantsByPatient,
  savePhysiologicalConstant,
} from "actions/pyshiologicalConstants";
import {
  getAppointmentsByPatient,
  saveAppointment,
  getAppointmentsByPatientAndDate,
} from "actions/appointments";
import {
  getPatientFilesByPatient,
  savePatientFile,
} from "actions/patientFiles";
import { saveMedicine, getMedicinesByAppointment } from "actions/medicines";
import {
  getAgendaAnnotations,
  saveAgendaAnnotation,
} from "actions/agendaAnnotations";
import {
  getDetectedDisease,
  saveDetectedDisease,
} from "actions/detectedDiseases";
import AppointmentsModal from "views/PetList/components/PetsModal";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const MedicalRecords = (props) => {
  const classes = useStyles();

  const [currentPatientId] = useState(props.history?.location?.state?.id);

  const [idPRToSave, setIdPRToSave] = useState();

  const [idPCToSave, setIdPCToSave] = useState();

  const [idPFToSave, setIdPFToSave] = useState();

  const [idDDToSave, setIdDDToSave] = useState();

  const [open, setOpen] = useState();

  const [appointmenWatch, setAppointmenWatch] = useState(false);

  const [watchValues, setWatchValues] = useState();

  const [pet, setPet] = useState();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      props.getPatientReviewsByPatient(currentPatientId);

      props.getPhysiologicalConstantsByPatient(currentPatientId);

      props.getAppointmentsByPatient(currentPatientId);

      props.getPatientFilesByPatient(currentPatientId);

      props.getDetectedDisease(currentPatientId);

      mounted = false;
    }
  }, []);

  useEffect(() => {
    const pet = props.pets.filter(
      (patient) => patient._id == props.history?.location?.state?.id
    )[0];

    setPet(pet);
  }, [props.pets]);

  const saveOrUpdatePatientReview = (values) => {
    //console.log("patientReview to save",values)

    values.patient = currentPatientId;

    if (idPRToSave) {
      if (!values._id) {
        values._id = idPRToSave;
      }
    }

    props.savePatientReview(values, (res, err) => {
      if (res) {
        console.log("res end point", res);

        if (res.data && res.data.id) {
          setIdPRToSave(res.data.id);
        }

        return Swal.fire({
          icon: "success",
          title: "Bien",
          text: "Datos registrados",
        });
      }
    });
  };

  const saveOrUpdatePhysiologicalConstant = (values) => {
    //console.log("constant to save",values)

    values.patient = currentPatientId;

    if (idDDToSave) {
      if (!values._id) {
        values._id = idDDToSave;
      }
    }

    props.save(values, (res, err) => {
      if (res) {
        console.log("res end point", res);

        if (res.data && res.data.id) {
          setIdPCToSave(res.data.id);
          props.getPhysiologicalConstantsByPatient(currentPatientId);
        }

        return Swal.fire({
          icon: "success",
          title: "Bien",
          text: "Datos registrados",
        });
      }
    });
  };

  const saveOrUpdatePatientFile = (values, cb) => {
    values.patient = currentPatientId;

    console.log("props.auth?.userType", props.auth);

    if (props.auth?.userType === 2) {
      values.doctor = props.auth?.user._id;
    }

    console.log("patientFile to save", values);

    if (idPFToSave) {
      if (!values._id) {
        values._id = idPFToSave;
      }
    }

    props.savePatientFile(values, (res, err) => {
      if (res) {
        console.log("res end point", res);

        if (res.data && res.data.id) {
          setIdPFToSave(res.data.id);
        }

        props.getPatientFilesByPatient(currentPatientId, (success, error) => {
          if (success) {
            props.getPatientFilesByPatient(currentPatientId);
          }
        });

        return Swal.fire({
          icon: "success",
          title: "Bien",
          text: "Datos registrados",
        }).then((any) => {
          if (cb) {
            cb();
          }
        });
      }
    });
  };

  const saveOrUpdateDetectedDisease = (values) => {
    //console.log("constant to save",values)

    values.patient = currentPatientId;

    if (idPCToSave) {
      if (!values._id) {
        values._id = idPCToSave;
      }
    }

    props.saveDetectedDisease(values, (res, err) => {
      if (res) {
        console.log("res end point", res);

        if (res.data && res.data.id) {
          setIdDDToSave(res.data.id);
          props.getDetectedDisease(currentPatientId);
        }

        return Swal.fire({
          icon: "success",
          title: "Bien",
          text: "Datos registrados",
        });
      }
    });
  };

  return (
    <>
      <div className={classes.root} style={{ marginTop: "25px" }}>
        <Typography variant={"h3"} style={{ textAlign: "center" }}>
          Historial Medico {` ${pet?.name} `}
        </Typography>

        <div className={classes.root}>
          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Reseña del paciente
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <PatientReview
                patientReview={props.selectedPatientReview}
                pet={pet}
                saveOrUpdatePatientReview={saveOrUpdatePatientReview}
              />{" "}
              :
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Constantes fisiológicas
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <PhysiologicalConstants
                setIdPCToSave={setIdPCToSave}
                saveOrUpdatePhysiologicalConstant={
                  saveOrUpdatePhysiologicalConstant
                }
                selectedPhysiologicalConstant={
                  props.selectedPhysiologicalConstant
                }
                physiologicalConstants={props.physiologicalConstants}
                patient={props.patient}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Citas</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Appointments
                appointments={props.appointments}
                manageNewAppointment={() => {
                  //console.log("manage new app")
                  setOpen(true);
                  setAppointmenWatch(false);
                }}
                seeCompleteInfo={(data) => {
                  //console.log("complete info", data)
                  setOpen(true);
                  setAppointmenWatch(true);
                  setWatchValues(data);
                }}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Enfermedades detectadas
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Diseases
                detectedDiseases={props.detectedDiseases}
                saveOrUpdateDetectedDisease={saveOrUpdateDetectedDisease}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Archivos</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <PatientFiles
                patientFiles={props.patientFiles}
                saveOrUpdatePatientFile={saveOrUpdatePatientFile}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>

      <AppointmentsModal
        open={open}
        auth={props.auth}
        doctors={[]}
        handleClose={() => setOpen(false)}
        saveAppointment={props.saveAppointment}
        saveMedicine={props.saveMedicine}
        getAppointmentsByPatientAndDate={props.getAppointmentsByPatientAndDate}
        getMedicinesByAppointment={props.getMedicinesByAppointment}
        patient={props.patient}
        watch={appointmenWatch}
        watchValues={watchValues}
        saveCb={() => {
          props.getAppointmentsByPatient(currentPatientId);
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  
  console.log("state mr",state)

  const { pets } = state.pets;

  const { selectedPatientReview } = state.patientReviews;

  const { physiologicalConstants, selectedPhysiologicalConstant } =
    state.physiologicalConstants;

  const { appointments } = state.appointments;

  const { patientFiles } = state.patientFiles;

  const { detectedDiseases } = state.detectedDiseases;

  //console.log("selectedPatientReview",selectedPatientReview)

  return {
    //petsState: state.pets,
    pets,
    appState: state.app,
    selectedPatientReview,
    physiologicalConstants,
    selectedPhysiologicalConstant,
    appointments,
    auth: state.auth,
    patientFiles,
    detectedDiseases
  };
};

export default connect(mapStateToProps, {
  setCurrentPatient,
  getPatientReviewsByPatient,
  getPhysiologicalConstantsByPatient,
  savePatientReview,
  savePhysiologicalConstant,
  getAppointmentsByPatient,
  saveAppointment,
  saveMedicine,
  getMedicinesByAppointment,
  getPatientFilesByPatient,
  getAgendaAnnotations,
  saveAgendaAnnotation,
  getAppointmentsByPatientAndDate,
  savePatientFile,
  getDetectedDisease,
  saveDetectedDisease,
})(MedicalRecords);
