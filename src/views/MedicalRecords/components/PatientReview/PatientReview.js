import "date-fns";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
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
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import Swal from "sweetalert2";

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

const PatientReview = (props) => {
  const { saveOrUpdatePatientReview, pet, patientReview } = props;

  const handleWindowSizeChange = () => {
    console.log("window size changed", screenWidth);
    setscreenWidth(window.innerWidth);
  };

  const handleChange = (event) => {
    if (event.target.type === "checkbox") {
      setData(event.target.name, event.target.checked);
    } else {
      setData(event.target.name, event.target.value);
    }
  };

  const [values, setValues] = useState(props.patientReview);

  const setData = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  window.addEventListener("resize", handleWindowSizeChange);

  useEffect(() => {}, []);

  const [screenWidth, setscreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    setValues({ ...patientReview });
  }, [patientReview]);

  const errors = new Array(3);

  const rules = (key, value) => {
    switch (key) {
      case "desparasitationProduct":
        errors[0] =
          value.length > 0 && value.length < 12
            ? "El producto de desparasitación debe tener mas de 12 carácteres"
            : false;

        return errors[0];

      case "previousIllnesses":
        errors[1] =
          value.length > 0 && value.length < 15
            ? "Las enfermedades anteriores deben tener mas de 15 carácteres"
            : false;

        return errors[1];

      case "surgeris":
        errors[2] =
          value.length > 0 && value.length < 15
            ? "La información de cirugias debe tener mas de 15 carácteres"
            : false;

        return errors[2];

      case "familyBackground":
        errors[3] =
          value.length > 0 && value.length < 15
            ? "La información de antecedentes familiares debe tener mas de 15 carácteres"
            : false;

        return errors[3];

      default:
        return true;
    }
  };

  const frmCompleteService = useRef();

  return (
    <form
      ref={frmCompleteService}
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Event: Form Submit");
        console.info("values", values);
        let errorValidation = false;

        errors.forEach((data) => {
          if (data != false) {
            errorValidation = true;
          }
        });

        if (errorValidation) {
          Swal.fire({
            icon: "warning",
            title: "Espera",
            text: "Tienes error en los datos suministrados, revisalos",
          });
        } else {
          saveOrUpdatePatientReview(values);
        }
      }}
    >
      <Grid container>
        <Typography variant="subtitle2">Vacunación</Typography>
        <Grid lg={12} md={12} xs={12}>
          <Divider />
        </Grid>

        {pet?.species === "Dog" ? (
          <Grid lg={6} md={6} xs={12}>
            <FormControlLabel
              control={<Checkbox name="pvcVaccine" />}
              label="PVC"
              onChange={handleChange}
              checked={values.pvcVaccine}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="pvcVaccineDate"
                margin="normal"
                id="date-picker-dialog"
                label="Fecha pvc"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                onChange={(date) =>
                  setData(
                    "pvcVaccineDate",
                    moment(date).add("days", 1).format("YYYY-MM-DD")
                  )
                }
                value={values.pvcVaccineDate}
                maxDate={moment()}
                disabled={!values.pvcVaccine}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        ) : (
          <Grid lg={6} md={6} xs={12}>
            <FormControlLabel
              control={<Checkbox name="tripleVaccine" />}
              label="TRIPLE"
              onChange={handleChange}
              checked={values.tripleVaccine}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="tripleVaccineDate"
                margin="normal"
                id="date-picker-dialog"
                label="Fecha triple"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                onChange={(date) =>
                  setData(
                    "tripleVaccineDate",
                    moment(date).add("days", 1).format("YYYY-MM-DD")
                  )
                }
                value={values.tripleVaccineDate}
                maxDate={moment()}
                disabled={!values.tripleVaccine}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        )}

        <Grid lg={6} md={6} xs={12}>
          <FormControlLabel
            control={<Checkbox name="rabiesVaccine" />}
            label="RABIA"
            onChange={handleChange}
            checked={values.rabiesVaccine}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="rabiesVaccineDate"
              margin="normal"
              id="date-picker-dialog"
              label="Fecha rabia"
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              onChange={(date) =>
                setData(
                  "rabiesVaccineDate",
                  moment(date).add("days", 1).format("YYYY-MM-DD")
                )
              }
              value={values.rabiesVaccineDate}
              maxDate={moment()}
              disabled={!values.rabiesVaccine}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid lg={12} md={12} xs={12}>
          <Typography variant="subtitle2">Ultima desparacitación</Typography>
          <Divider />
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid lg={6} md={6} xs={6}>
            <TextField
              fullWidth
              onChange={handleChange}
              label="Producto"
              margin="dense"
              name="desparasitationProduct"
              variant="outlined"
              value={values.desparasitationProduct}
              helperText={rules(
                "desparasitationProduct",
                values.desparasitationProduct
              )}
              error={rules(
                "desparasitationProduct",
                values.desparasitationProduct
              )}
            />
          </Grid>
          <Grid lg={6} md={6} xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="lastDesparasitation"
                style={{ marginLeft: "25px" }}
                margin="normal"
                id="date-picker-dialog"
                label="Fecha"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                onChange={(date) =>
                  setData(
                    "lastDesparasitation",
                    moment(date).add("days", 1).format("YYYY-MM-DD")
                  )
                }
                value={values.lastDesparasitation}
                maxDate={moment()}
                disabled={!values.desparasitationProduct}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>

        <Grid lg={12} md={12} xs={12}>
          <Typography variant="subtitle2">Alimentación</Typography>
          <Divider />
        </Grid>

        <Grid container direction="row" justify="center" alignItems="center">
          <FormControl component="fieldset">
            <RadioGroup
              style={screenWidth > 550 ? useStyles.horizontalGroup : null}
              aria-label="feedingType"
              onChange={handleChange}
              value={values.feedingType}
              name="feedingType"
            >
              <FormControlLabel
                value="Balanceada"
                control={<Radio />}
                label="Balanceada"
              />
              <FormControlLabel
                value="Casera"
                control={<Radio />}
                label="Casera"
              />
              <FormControlLabel
                value="Mixta"
                control={<Radio />}
                label="Mixta"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid lg={12} md={12} xs={12}>
          <Typography variant="subtitle2">Estado reproductivo</Typography>
          <Divider />
        </Grid>

        <Grid container direction="row" justify="center" alignItems="center">
          <FormControl component="fieldset">
            <RadioGroup
              style={screenWidth > 550 ? useStyles.horizontalGroup : null}
              value={values.reproductiveState}
              aria-label="customerBenefit"
              name="reproductiveState"
              onChange={handleChange}
            >
              <FormControlLabel
                value="Castrado"
                control={<Radio />}
                label="Castrado"
              />
              <FormControlLabel
                value="Gestacion"
                control={<Radio />}
                label="Gestación"
              />
              <FormControlLabel
                value="Entero"
                control={<Radio />}
                label="Entero"
              />
              <FormControlLabel
                value="Lactancia"
                control={<Radio />}
                label="Lactancia"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid lg={12} md={12} xs={12}>
          <TextField
            fullWidth
            label="Enfermedades Anteriores"
            margin="dense"
            name="previousIllnesses"
            variant="outlined"
            multiline
            rows={3}
            onChange={handleChange}
            value={values.previousIllnesses}
            helperText={rules("previousIllnesses", values.previousIllnesses)}
            error={rules("previousIllnesses", values.previousIllnesses)}
            required
          />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
          <TextField
            fullWidth
            label="Cirugías"
            margin="dense"
            name="surgeris"
            variant="outlined"
            multiline
            rows={3}
            onChange={handleChange}
            value={values.surgeris}
            helperText={rules("surgeris", values.surgeris)}
            error={rules("surgeris", values.surgeris)}
            required
          />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
          <TextField
            fullWidth
            label="Antecedentes familiares"
            margin="dense"
            name="familyBackground"
            variant="outlined"
            multiline
            rows={3}
            onChange={handleChange}
            value={values.familyBackground}
            helperText={rules("familyBackground", values.familyBackground)}
            error={rules("familyBackground", values.familyBackground)}
            required
          />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
          <Typography variant="subtitle2">Habitat</Typography>
          <Divider />
        </Grid>

        <Grid container direction="row" justify="center" alignItems="center">
          <FormControl component="fieldset">
            <RadioGroup
              style={screenWidth > 550 ? useStyles.horizontalGroup : null}
              onChange={handleChange}
              name="habitat"
              value={values.habitat}
              aria-label="habitat"
            >
              <FormControlLabel value="Casa" control={<Radio />} label="Casa" />
              <FormControlLabel value="Lote" control={<Radio />} label="Lote" />
              <FormControlLabel
                value="Finca"
                control={<Radio />}
                label="Finca"
              />
              <FormControlLabel
                value="Taller"
                control={<Radio />}
                label="Taller"
              />
              <FormControlLabel
                value="Apartamento"
                control={<Radio />}
                label="Apartamento"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid lg={12} md={12} xs={12}>
          <Typography variant="subtitle2">Opciones</Typography>
          <Divider />
        </Grid>

        <Grid container direction="row" justify="center" alignItems="center">
          <Button
            color="primary"
            variant="contained"
            style={{ marginTop: "10px" }}
            onClick={() => {
              //console.info("values", values);

              //console.log("errors", errors);

              let errorValidation = false;

              errors.forEach((data) => {
                if (data != false) {
                  errorValidation = true;
                }
              });

              if (errorValidation) {
                Swal.fire({
                  icon: "warning",
                  title: "Espera",
                  text: "Tienes error en los datos suministrados, revisalos",
                });
              } else {
                if (
                  values.feedingType === null ||
                  values.habitat === null ||
                  values.reproductiveState === null ||
                  values.previousIllnesses === "" ||
                  values.surgeris === "" ||
                  values.familyBackground === ""
                ) {
                  Swal.fire({
                    icon: "warning",
                    title: "Espera",
                    text: "No has puesto los datos obligatorios (tipo de alimentación, estado reproductivo, enfermedades anteriores, cirugias, habitat, antecedentes familiares)",
                  });
                } else {
                  console.log("time to send");
                  props.saveOrUpdatePatientReview(values);
                }
              }
            }}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

PatientReview.propTypes = {
  className: PropTypes.string,
};

export default PatientReview;
