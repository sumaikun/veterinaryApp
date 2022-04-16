import React, { useState, useEffect } from "react";
//import { Link as RouterLink, withRouter } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { Facebook as FacebookIcon, Google as GoogleIcon } from "icons";

import { connect } from "react-redux";

import { loginUser } from "actions/auth";

import Swal from "sweetalert2";

const schema = {
  Username: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  Password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //backgroundImage: 'url(/images/auth.jpg)',
    backgroundImage: "url(https://placeimg.com/640/640/animals)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    opacity: 1,
    transition: "3s",
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px",
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
}));

const SignIn = (props) => {
  //console.log("props",props);

  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  useEffect(() => {
    const imagesArray = ["https://placeimg.com/640/640/animals"];

    /*setInterval(() => {
      //console.log("changed", document.querySelector("#quote-background"))
      //console.log("random",Math.floor(Math.random() * 4))
      const reloadElement = document.querySelector("#quote-background");
      if (reloadElement) {
        reloadElement.style.backgroundImage = `url(${
          imagesArray[Math.floor(Math.random() * 4)]
        })`;
      }
    }, 8000);*/
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    props.loginUser(formState.values, (success, error) => {
      if (success) {
        history.push("/");
      }
      if (error) {
        let errorText;

        try {
          errorText =
            error.response.status === 401
              ? "Las credenciales no son validas, vuelva a intentarlo"
              : "Hay un problema con el servidor";
        } catch (error) {
          errorText = "Hay un problema de conexión al servidor";
        }

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorText,
        });
      }
    });
    //
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div id="quote-background" className={classes.quote}>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(1,1,1,0.4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h1">
                  El mejor médico del mundo es el veterinario:
                </Typography>
                <div className={classes.person}>
                  <Typography
                    className={classes.name}
                    variant="body1"
                    style={{ fontWeight: "bold" }}
                  >
                    El no puede preguntarles a sus pacientes que les pasa,
                    simplemente lo tienen que saber
                  </Typography>
                  <Typography
                    className={classes.bio}
                    variant="body2"
                    style={{ fontWeight: "bold" }}
                  >
                    Will Rogers
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn}>
                <Typography className={classes.title} variant="h2">
                  Bienvenidos a su sistema de gestión
                </Typography>

                <Typography color="textSecondary" gutterBottom>
                  Veterinaria
                </Typography>
                <Grid className={classes.socialButtons} container spacing={2}>
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                      disabled
                    >
                      <FacebookIcon className={classes.socialIcon} />
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                      disabled
                    >
                      <GoogleIcon className={classes.socialIcon} />
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>

                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  Ingresa con tus credenciales
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError("Username")}
                  fullWidth
                  helperText={
                    hasError("Username") ? formState.errors.Username[0] : null
                  }
                  label="Correo electrónico"
                  name="Username"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.Username || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("Password")}
                  fullWidth
                  helperText={
                    hasError("Password") ? formState.errors.Password[0] : null
                  }
                  label="Contraseña"
                  name="Password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.Password || ""}
                  variant="outlined"
                />
                <Link
                  variant="body2"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    props.history.push("/forgot-password");
                  }}
                >
                  {"¿ Olvidaste la contraseña ? Haz click aqui"}
                </Link>
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  INGRESAR
                </Button>

                <Grid item>
                  <Link
                    variant="body2"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      props.history.push("/sign-up");
                    }}
                  >
                    {"¿ No tienes una cuenta ? Registrarse"}
                  </Link>
                </Grid>

                {/*  <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography> */}
                <br />
                <br />
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
