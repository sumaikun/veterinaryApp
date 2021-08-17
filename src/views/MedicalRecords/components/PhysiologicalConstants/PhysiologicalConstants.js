import "date-fns";
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
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
} from "@material-ui/core";
import Swal from "sweetalert2";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";

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

const doStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  floatingLabelFocusStyle: {
    color: "#C6C0BF",
  },
}));

const PhysiologicalConstants = (props) => {
  const classes = doStyles();

  const { saveOrUpdatePhysiologicalConstant, selectedPhysiologicalConstant } =
    props;

  const [values, setValues] = useState(selectedPhysiologicalConstant);

  useEffect(() => {
    if (selectedPhysiologicalConstant) {
      setValues(selectedPhysiologicalConstant);
    }
  }, [selectedPhysiologicalConstant]);

  const handleChange = (event) => {
    //console.log(event,event.target)
    if (event.target.type === "checkbox") {
      setData(event.target.name, event.target.checked);
    } else {
      setData(event.target.name, event.target.value);
    }
  };

  const [saveMode, setSaveMode] = useState();

  const frmCompleteService = useRef();

  const setData = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const errors = new Array(19);

  const rules = (key, value) => {
    switch (key) {
      case "tlic":
        errors[0] =
          value?.length > 0 && value?.length < 5
            ? "El T.LI.C debe tener mas de 5 carácteres"
            : false;

        return errors[0];

      case "heartRate":
        errors[1] =
          value?.length > 0 && value?.length < 5
            ? "La frecuencia cardiaca debe tener mas de 5 carácteres"
            : false;

        return errors[1];

      case "respiratoryRate":
        errors[2] =
          value?.length > 0 && value?.length < 5
            ? "La frecuencia respiratoria debe tener mas de 5 carácteres"
            : false;

        return errors[2];

      case "heartBeat":
        errors[3] =
          value?.length > 0 && value?.length < 5
            ? "La ritmo cardiaco debe tener mas de 5 carácteres"
            : false;

        return errors[3];

      case "temperature":
        errors[4] =
          value?.length > 0 && value?.length < 5
            ? "La temperatura debe tener mas de 5 carácteres"
            : false;

        return errors[4];

      case "weight":
        errors[5] =
          value?.length > 0 && value?.length < 5
            ? "El peso debe tener mas de 5 carácteres"
            : false;

        return errors[5];

      case "conjuntivalMucosa":
        errors[6] =
          value?.length > 0 && value?.length < 15
            ? "La mucosa conjuntival debe tener mas de 15 carácteres"
            : false;

        return errors[6];

      case "oralMucosa":
        errors[7] =
          value?.length > 0 && value?.length < 15
            ? "La mucosa oral debe tener mas de 15 carácteres"
            : false;

        return errors[7];

      case "vulvalMucosa":
        errors[8] =
          value?.length > 0 && value?.length < 15
            ? "La mucosa vulvar debe tener mas de 15 carácteres"
            : false;

        return errors[8];

      case "rectalMucosa":
        errors[9] =
          value?.length > 0 && value?.length < 15
            ? "La mucosa rectal debe tener mas de 15 carácteres"
            : false;

        return errors[9];

      case "physicalsEye":
        errors[10] =
          value?.length > 0 && value?.length < 15
            ? "El estado de los ojos debe tener mas de 15 carácteres"
            : false;

        return errors[10];

      case "physicalsEars":
        errors[11] =
          value?.length > 0 && value?.length < 15
            ? "El estado de los oidos debe tener mas de 15 carácteres"
            : false;

        return errors[11];

      case "physicalsLinfaticmodules":
        errors[12] =
          value?.length > 0 && value?.length < 15
            ? "El estado de los modulos linfaticos debe tener mas de 15 carácteres"
            : false;

        return errors[12];

      case "physicalsSkinandanexes":
        errors[13] =
          value?.length > 0 && value?.length < 15
            ? "El estado de la piel y anexos debe tener mas de 15 carácteres"
            : false;

        return errors[13];

      case "physicalsLocomotion":
        errors[14] =
          value?.length > 0 && value?.length < 15
            ? "El estado de la locomoción debe tener mas de 15 carácteres"
            : false;

        return errors[14];

      case "physicalsMusclesqueletal":
        errors[15] =
          value?.length > 0 && value?.length < 15
            ? "El estado de musculo esquelético debe tener mas de 15 carácteres"
            : false;

        return errors[15];

      case "physicalsNervoussystem":
        errors[16] =
          value?.length > 0 && value?.length < 15
            ? "El estado del sistema nervioso debe tener mas de 15 carácteres"
            : false;

        return errors[16];

      case "physicalsCardiovascularsystem":
        errors[17] =
          value?.length > 0 && value?.length < 15
            ? "El estado del sistema cardiovascular debe tener mas de 15 carácteres"
            : false;

        return errors[17];

      case "physicalsRespiratorysystem":
        errors[18] =
          value?.length > 0 && value?.length < 15
            ? "El estado del sistema respiratorio debe tener mas de 15 carácteres"
            : false;

        return errors[18];

      case "physicalsDigestivesystem":
        errors[18] =
          value?.length > 0 && value?.length < 15
            ? "El estado del sistema digestivo debe tener mas de 15 carácteres"
            : false;

        return errors[18];

      case "physicalsGenitourinarysystem":
        errors[19] =
          value?.length > 0 && value?.length < 15
            ? "El estado del sistema genitourinario debe tener mas de 15 carácteres"
            : false;

        return errors[19];

      default:
        return true;
    }
  };

  return (
    <Grid lg={12} md={12} xs={12}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("form submit");
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
            console.log("saveMode", saveMode);

            if (saveMode === 1) {
              saveOrUpdatePhysiologicalConstant({
                ...values,
                _id: values._id || selectedPhysiologicalConstant.id,
              });
            }
          }
        }}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid lg={4} md={4} xs={12}>
            <TextField
              className={classes.paper}
              fullWidth
              label="T.LI.C"
              margin="dense"
              name="tlic"
              variant="outlined"
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              onChange={handleChange}
              value={values?.tlic}
              helperText={rules("tlic", values?.tlic)}
              error={rules("tlic", values?.tlic)}
            />
          </Grid>
          <Grid lg={4} md={4} xs={12}>
            <TextField
              className={classes.paper}
              fullWidth
              label="F.C"
              margin="dense"
              name="heartRate"
              variant="outlined"
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              onChange={handleChange}
              value={values?.heartRate}
              helperText={rules("heartRate", values?.heartRate)}
              error={rules("heartRate", values?.heartRate)}
            />
          </Grid>
          <Grid lg={4} md={4} xs={12}>
            <TextField
              className={classes.paper}
              fullWidth
              label="F.R"
              margin="dense"
              name="respiratoryRate"
              variant="outlined"
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              onChange={handleChange}
              value={values?.respiratoryRate}
              helperText={rules("respiratoryRate", values?.respiratoryRate)}
              error={rules("respiratoryRate", values?.respiratoryRate)}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid lg={4} md={4} xs={12}>
            <TextField
              className={classes.paper}
              fullWidth
              label="PULSO"
              margin="dense"
              name="heartBeat"
              variant="outlined"
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              onChange={handleChange}
              value={values?.heartBeat}
              helperText={rules("heartBeat", values?.heartBeat)}
              error={rules("heartBeat", values?.heartBeat)}
            />
          </Grid>
          <Grid lg={4} md={4} xs={12}>
            <TextField
              className={classes.paper}
              fullWidth
              label="TEMPERATURA"
              margin="dense"
              name="temperature"
              variant="outlined"
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              onChange={handleChange}
              value={values?.temperature}
              helperText={rules("temperature", values?.temperature)}
              error={rules("temperature", values?.temperature)}
            />
          </Grid>
          <Grid lg={4} md={4} xs={12}>
            <TextField
              className={classes.paper}
              fullWidth
              label="PESO"
              margin="dense"
              name="weight"
              variant="outlined"
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              onChange={handleChange}
              value={values?.weight}
              helperText={rules("weight", values?.weight)}
              error={rules("weight", values?.weight)}
            />
          </Grid>
        </Grid>
        <Typography variant="subtitle2">Actitud</Typography>
        <Divider />
        <Grid container direction="row" justify="center" alignItems="center">
          <FormControl component="fieldset">
            <RadioGroup
              style={useStyles.horizontalGroup}
              name="attitude"
              onChange={handleChange}
              value={values?.attitude}
              aria-label="attitude"
            >
              <FormControlLabel
                value="Astenico"
                control={<Radio />}
                label="Asténico"
              />
              <FormControlLabel
                value="Apopletico"
                control={<Radio />}
                label="Apoplético"
              />
              <FormControlLabel
                value="Linfatico"
                control={<Radio />}
                label="Linfático"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Typography variant="subtitle2">Condición corporal</Typography>
        <Divider />
        <Grid container direction="row" justify="center" alignItems="center">
          <FormControl component="fieldset">
            <RadioGroup
              style={useStyles.horizontalGroup}
              name="bodyCondition"
              onChange={handleChange}
              value={values?.bodyCondition}
              aria-label="bodyCondition"
            >
              <FormControlLabel
                value="Caquetico"
                control={<Radio />}
                label="Caquético"
              />
              <FormControlLabel
                value="Delgado"
                control={<Radio />}
                label="Delgado"
              />
              <FormControlLabel
                value="Normal"
                control={<Radio />}
                label="Normal"
              />
              <FormControlLabel
                value="Obeso"
                control={<Radio />}
                label="Obeso"
              />
              <FormControlLabel
                value="Sobrepeso"
                control={<Radio />}
                label="Sobrepeso"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Typography variant="subtitle2">Estado de hidratación</Typography>
        <Divider />
        <Grid container direction="row" justify="center" alignItems="center">
          <FormControl component="fieldset">
            <RadioGroup
              style={useStyles.horizontalGroup}
              name="hidrationStatus"
              onChange={handleChange}
              value={values?.hidrationStatus}
              aria-label="customerBenefit"
            >
              <FormControlLabel
                value="Normal"
                control={<Radio />}
                label="Normal"
              />
              <FormControlLabel
                value="0-5%"
                control={<Radio />}
                label="Deshidr. 0-5%"
              />
              <FormControlLabel
                value="6-7%"
                control={<Radio />}
                label="Deshidr. 6-7%"
              />
              <FormControlLabel
                value="8-9%"
                control={<Radio />}
                label="Deshidr. 8-9%"
              />
              <FormControlLabel
                value="+10%"
                control={<Radio />}
                label="Deshidr. +10%"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Typography variant="subtitle2">Mucosas</Typography>
        <Divider />

        <Grid lg={12} md={12} xs={12}>
          <TextField
            fullWidth
            label="Mucosa Conjuntival"
            margin="dense"
            name="conjuntivalMucosa"
            variant="outlined"
            multiline
            rows={3}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            onChange={handleChange}
            value={values?.conjuntivalMucosa}
            helperText={rules("conjuntivalMucosa", values?.conjuntivalMucosa)}
            error={rules("conjuntivalMucosa", values?.conjuntivalMucosa)}
          />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
          <TextField
            fullWidth
            label="Mucosa Oral"
            margin="dense"
            name="oralMucosa"
            variant="outlined"
            multiline
            rows={3}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            onChange={handleChange}
            value={values?.oralMucosa}
            helperText={rules("oralMucosa", values?.oralMucosa)}
            error={rules("oralMucosa", values?.oralMucosa)}
          />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
          <TextField
            fullWidth
            label="Mucosa Vulvar/prepucial"
            margin="dense"
            name="vulvalMucosa"
            variant="outlined"
            multiline
            rows={3}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            onChange={handleChange}
            value={values?.vulvalMucosa}
            helperText={rules("vulvalMucosa", values?.vulvalMucosa)}
            error={rules("vulvalMucosa", values?.vulvalMucosa)}
          />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
          <TextField
            fullWidth
            label="Mucosa Rectal"
            margin="dense"
            name="rectalMucosa"
            variant="outlined"
            multiline
            rows={3}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            onChange={handleChange}
            value={values?.rectalMucosa}
            helperText={rules("rectalMucosa", values?.rectalMucosa)}
            error={rules("rectalMucosa", values?.rectalMucosa)}
          />
        </Grid>

        <Typography variant="subtitle2">Estado físico</Typography>
        <Divider />

        <TextField
          fullWidth
          label="Ojos"
          margin="dense"
          name="physicalsEye"
          variant="outlined"
          multiline
          rows={3}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
          onChange={handleChange}
          value={values?.physicalsEye}
          helperText={rules("physicalsEye", values?.physicalsEye)}
          error={rules("physicalsEye", values?.physicalsEye)}
        />

        <TextField
          fullWidth
          label="Oidos"
          margin="dense"
          name="physicalsEars"
          variant="outlined"
          multiline
          rows={3}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
          onChange={handleChange}
          value={values?.physicalsEars}
          helperText={rules("physicalsEars", values?.physicalsEars)}
          error={rules("physicalsEars", values?.physicalsEars)}
        />

        <TextField
          fullWidth
          label="Modulos Linfáticos"
          margin="dense"
          name="physicalsLinfaticmodules"
          variant="outlined"
          multiline
          rows={3}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
          onChange={handleChange}
          value={values?.physicalsLinfaticmodules}
          helperText={rules(
            "physicalsLinfaticmodules",
            values?.physicalsLinfaticmodules
          )}
          error={rules(
            "physicalsLinfaticmodules",
            values?.physicalsLinfaticmodules
          )}
        />

        <TextField
          fullWidth
          label="Piel y anexos"
          margin="dense"
          name="physicalsSkinandanexes"
          variant="outlined"
          multiline
          rows={3}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
          onChange={handleChange}
          value={values?.physicalsSkinandanexes}
          helperText={rules(
            "physicalsSkinandanexes",
            values?.physicalsSkinandanexes
          )}
          error={rules(
            "physicalsSkinandanexes",
            values?.physicalsSkinandanexes
          )}
        />

        <TextField
          fullWidth
          label="Locomoción"
          margin="dense"
          name="physicalsLocomotion"
          variant="outlined"
          multiline
          rows={3}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
          onChange={handleChange}
          value={values?.physicalsLocomotion}
          helperText={rules("physicalsLocomotion", values?.physicalsLocomotion)}
          error={rules("physicalsLocomotion", values?.physicalsLocomotion)}
        />

        <TextField
          fullWidth
          label="Musculo esqueletico"
          margin="dense"
          name="physicalsMusclesqueletal"
          variant="outlined"
          multiline
          rows={3}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
          onChange={handleChange}
          value={values?.physicalsMusclesqueletal}
          helperText={rules(
            "physicalsMusclesqueletal",
            values?.physicalsMusclesqueletal
          )}
          error={rules(
            "physicalsMusclesqueletal",
            values?.physicalsMusclesqueletal
          )}
        />

        <TextField
          fullWidth
          label="Sistema nervioso"
          margin="dense"
          name="physicalsNervoussystem"
          variant="outlined"
          multiline
          rows={3}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
          onChange={handleChange}
          value={values?.physicalsNervoussystem}
          helperText={rules(
            "physicalsNervoussystem",
            values?.physicalsNervoussystem
          )}
          error={rules(
            "physicalsNervoussystem",
            values?.physicalsNervoussystem
          )}
        />

        <TextField
          fullWidth
          label="Sistema cardiovascular"
          margin="dense"
          name="physicalsCardiovascularsystem"
          variant="outlined"
          multiline
          rows={3}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
          onChange={handleChange}
          value={values?.physicalsCardiovascularsystem}
          helperText={rules(
            "physicalsCardiovascularsystem",
            values?.physicalsCardiovascularsystem
          )}
          error={rules(
            "physicalsCardiovascularsystem",
            values?.physicalsCardiovascularsystem
          )}
        />

        <TextField
          fullWidth
          label="Sistema respiratorio"
          margin="dense"
          name="physicalsRespiratorysystem"
          variant="outlined"
          multiline
          rows={3}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
          onChange={handleChange}
          value={values?.physicalsRespiratorysystem}
          helperText={rules(
            "physicalsRespiratorysystem",
            values?.physicalsRespiratorysystem
          )}
          error={rules(
            "physicalsCardiovascularsystem",
            values?.physicalsCardiovascularsystem
          )}
        />

        <TextField
          fullWidth
          label="Sistema digestivo"
          margin="dense"
          name="physicalsDigestivesystem"
          variant="outlined"
          multiline
          rows={3}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
          onChange={handleChange}
          value={values?.physicalsDigestivesystem}
          helperText={rules(
            "physicalsDigestivesystem",
            values?.physicalsDigestivesystem
          )}
          error={rules(
            "physicalsDigestivesystem",
            values?.physicalsDigestivesystem
          )}
        />

        <TextField
          fullWidth
          label="Sistema genitourinario"
          margin="dense"
          name="physicalsGenitourinarysystem"
          variant="outlined"
          multiline
          rows={3}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
          }}
          onChange={handleChange}
          value={values?.physicalsGenitourinarysystem}
          helperText={rules(
            "physicalsGenitourinarysystem",
            values?.physicalsGenitourinarysystem
          )}
          error={rules(
            "physicalsGenitourinarysystem",
            values?.physicalsGenitourinarysystem
          )}
        />
        <Typography variant="subtitle2">
          Lista de constantes registradas
        </Typography>
        <Divider />

        <Grid lg={12} md={12} xs={12}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Actitud</TableCell>
                    <TableCell>Condición corporal</TableCell>
                    <TableCell>Hidratación</TableCell>
                    <TableCell>Pulso</TableCell>
                    <TableCell>Temperatura</TableCell>
                    <TableCell>Peso</TableCell>
                    <TableCell>Opciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.physiologicalConstants
                    ? props.physiologicalConstants
                        .slice(0)
                        .reverse()
                        .map((constant) => (
                          <TableRow>
                            <TableCell>{constant.date.split(" ")[0]}</TableCell>
                            <TableCell>{constant.attitude}</TableCell>
                            <TableCell>{constant.bodyCondition}</TableCell>
                            <TableCell>{constant.hidrationStatus}</TableCell>
                            <TableCell>{constant.heartBeat}</TableCell>
                            <TableCell>{constant.temperature}</TableCell>
                            <TableCell>{constant.weight}</TableCell>
                            <TableCell>
                              <Button
                                color="secondary"
                                onClick={() => {
                                  Swal.fire({
                                    title: "¿ Esta seguro ?",
                                    text: "Esto modificara los datos del formulario, si esta creando una constante y no ha guardado cambios, guardelos",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Ok",
                                  }).then((result) => {
                                    if (result.value) {
                                      setValues(constant);
                                    }
                                  });
                                }}
                              >
                                Ver info completa
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    : null}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </Grid>
        <button
          ref={frmCompleteService}
          style={{ visibility: "hidden" }}
          type="submit"
        >
          {" "}
          click here{" "}
        </button>
      </form>

      <Typography variant="subtitle2">Opciones</Typography>
      <Divider />
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Button
          color="primary"
          variant="contained"
          style={{ marginTop: "10px" }}
          onClick={() => {
            setSaveMode(1);
            window.setTimeout(() => {
              frmCompleteService.current.click();
            }, 600);
          }}
        >
          Guardar
        </Button>
        <Button
          color="primary"
          variant="contained"
          style={{ marginTop: "10px" }}
          onClick={() => {
            let checkDay;

            props.physiologicalConstants.map((pConstant) => {
              checkDay = moment(pConstant.date?.split(" ")[0]).isSame(
                moment(),
                "day"
              );
            });

            if (checkDay) {
              return Swal.fire(
                "Espera",
                "Ya hubo una constante fisiológica creada hoy no puede crear mas pero si editarla",
                "warning"
              );
            }

            if (props.physiologicalConstants.length == 0) {
              return Swal.fire(
                "Espera",
                "Debe haber al menos una constante fisiológica guardada para continuar",
                "warning"
              );
            }

            Swal.fire({
              title: "¿Esta seguro?",
              text: "Esto creara un nuevo registro de constante fisiológicas si desea cambiar el actual solo haga click en guardar",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, adelante",
            }).then((result) => {
              if (result.isConfirmed) {
                setSaveMode(2);
                props.setIdPCToSave(null);
                window.setTimeout(() => {
                  frmCompleteService.current.click();
                }, 600);
              }
            });
          }}
        >
          Crear nuevas constantes fisiológicas
        </Button>
      </Grid>
    </Grid>
  );
};

PhysiologicalConstants.propTypes = {
  className: PropTypes.string,
};

export default PhysiologicalConstants;
