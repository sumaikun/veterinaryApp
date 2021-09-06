import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

import PetsTable from "views/PetList/components/PetsTable";

import { SearchInput } from "components";

import "date-fns";

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
  dialogPaper: {
    width: "200%",
  },
}));

const PetsModal = (props) => {
  const { open, pets, selectPet, handleClose, ...rest } = props;

  //console.log("patient props",props)

  const [selectedPet, setSelectedPet] = useState(null);

  const [filteredPets, setFilteredPets] = useState([]);

  const [openPetConfirmation, setOpenPetConfirmation] = useState(false);

  useEffect(() => {
    setFilteredPets(pets);
  }, [pets]);

  const addFilterText = (event) => {
    //console.log("filter text",event.target.value)

    const data = event.target.value.toLowerCase();

    if (data.length == 0) {
      setFilteredPets(pets);
    } else {
      const filteredArray = pets.filter(
        (patient) =>
          (patient.name ? patient.name.toLowerCase().includes(data) : false) ||
          (patient.value ? patient.value.includes(data) : false) ||
          (patient.administrationWay
            ? patient.administrationWay.toLowerCase().includes(data)
            : false) ||
          (patient.presentation
            ? patient.presentation.toLowerCase().includes(data)
            : false)
      );

      setFilteredPets(filteredArray);
    }
  };

  const confirmPet = () => {
    setOpenPetConfirmation(false);

    selectPet(selectedPet);
    window.setTimeout(function () {
      handleClose();
    }, 500);
    //
  };

  const cancelPet = () => {
    setOpenPetConfirmation(false);
  };

  const addSelectedPet = (patient) => {
    console.log("addSelectedPet", patient);
    setSelectedPet(patient);
    setOpenPetConfirmation(true);
  };

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Pacientes"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Seleccione el medicamento
          </DialogContentText>
          <SearchInput
            className={classes.searchInput}
            placeholder="Buscar"
            onChange={addFilterText}
          />
          <PetsTable
            addSelectedPet={addSelectedPet}
            pets={filteredPets || []}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPetConfirmation}
        onClose={cancelPet}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>Desea seleccionar este paciente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Seleccionara este paciente para un proceso de cita
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={cancelPet} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmPet} color="primary">
            Afirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PetsModal;
