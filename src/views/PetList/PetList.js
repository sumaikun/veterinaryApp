import React, { Component } from "react";

import "date-fns";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

import {
  PetsToolbar,
  PetsTable,
  PetsModal,
  PetsMedicine,
  PetsOwner,
} from "./components";

import { connect } from "react-redux";

import { getPets, getPet } from "actions/pets";

import { getProducts } from "actions/products";

import { getContacts, getContact } from "actions/contacts";

import Swal from "sweetalert2";

import { setCurrentPatient } from "actions/app";

const useStyles = (theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class PetList extends Component {
  constructor(props) {
    super(props);
    console.log("petlist props", props);
    this.state = {
      pets: [],
      open: false,
      open2: false,
      open3: false,
    };
  }

  componentDidMount() {
    this.props.getPets((success, error) => {
      this.setState({
        ...this.state,
        pets: this.props.petsState.pets,
        selectedPet: null,
      });
    });

    this.props.getProducts((success, error) => {
      this.setState({
        ...this.state,
        products: this.props.productsState.products,
        selectedProducts: [],
      });
    });

    this.props.getContacts((success, error) => {
      this.setState({
        ...this.state,
        contacts: this.props.contactsState.contacts,
        selectedContacts: [],
      });
    });

    this.createButton = this.createButton.bind(this);
    this.editButton = this.editButton.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.filteredPets = this.filteredPets.bind(this);
    this.addSelectedPet = this.addSelectedPet.bind(this);
    this.medicalRecordsButton = this.medicalRecordsButton.bind(this);
    this.medicalAppointmentButton = this.medicalAppointmentButton.bind(this);
    this.ownersButton = this.ownersButton.bind(this);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleOpen2 = this.handleOpen2.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);

    this.selectProduct = this.selectProduct.bind(this);
  }

  addSelectedPet(id) {
    let pet = this.state.pets.filter((pet) => pet._id === id)[0];

    this.setState({
      ...this.state,
      selectedPet: pet,
    });
  }

  medicalRecordsButton() {
    console.log("medicalRecordsButton");

    this.props.setCurrentPatient(this.state.selectedPet._id);

    this.props.history.push({
      pathname: "/medicalRecords",
      state: { id: this.state.selectedPet._id },
    });
  }

  medicalAppointmentButton() {
    console.log("medicalAppointmentButton");
    this.handleOpen();
  }

  ownersButton() {
    console.log("ownersButton");
    this.handleOpen3();
  }

  createButton() {
    console.log("create Button");
    this.props.getPet(null);
    this.props.history.push("/pets/form");
  }

  editButton() {
    console.log("edit Button");
    let self = this;
    this.props.getPet(this.state.selectedPet._id, (success, error) => {
      if (success) {
        self.props.history.push("/pets/form");
      }
    });
  }

  deleteButton() {
    console.log("delete Button");
  }

  handleOpen = () => {
    this.setState({
      ...this.state,
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      open: false,
    });
  };

  handleOpen2 = () => {
    this.setState({
      ...this.state,
      open2: true,
    });
  };

  handleClose2 = () => {
    this.setState({
      ...this.state,
      open2: false,
    });
  };

  handleOpen3 = () => {
    this.setState({
      ...this.state,
      open3: true,
    });
  };

  handleClose3 = () => {
    this.setState({
      ...this.state,
      open3: false,
    });
  };

  filteredPets(data) {
    //console.log("data",data)
    //return this.props.petsState.pets

    if (data.length == 0) {
      this.setState({
        ...this.state,
        pets: this.props.petsState.pets,
      });
    } else {
      data = data.toLowerCase();

      const filteredArray = this.props.petsState.pets.filter(
        (pet) =>
          pet.name.toLowerCase().includes(data) ||
          pet.species.toLowerCase().includes(data) ||
          pet.breed.toLowerCase().includes(data) ||
          pet.color.toLowerCase().includes(data) ||
          pet.age.includes(data)
      );

      this.setState({
        ...this.state,
        pets: filteredArray,
      });
    }
  }

  selectProduct(product) {
    console.log("select product", product);

    const index = this.state.selectedProducts.findIndex(
      (element) => element._id == product._id
    );

    if (index == -1) {
      const copyProducts = JSON.parse(
        JSON.stringify(this.state.selectedProducts)
      );

      copyProducts.push(product);

      this.setState({
        ...this.state,
        selectedProducts: copyProducts,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log("should update");
    return nextProps === this.props;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PetsToolbar
          medicalRecordsButton={this.medicalRecordsButton}
          medicalAppointmentButton={this.medicalAppointmentButton}
          ownersButton={this.ownersButton}
          selectedPet={this.state.selectedPet}
          createButton={this.createButton}
          editButton={this.editButton}
          //deleteButton={this.deleteButton}
          filteredPets={this.filteredPets}
        />
        <div className={classes.content}>
          <PetsTable
            getContact={this.props.getContact}
            history={this.props.history}
            contacts={this.state.contacts}
            addSelectedPet={this.addSelectedPet}
            pets={this.state.pets}
          />
        </div>
        <PetsModal
          selectedProducts={this.state.selectedProducts}
          openMedicinesModal={this.handleOpen2}
          open={this.state.open}
          handleClose={this.handleClose}
        />

        {this.state.products ? (
          <PetsMedicine
            selectProduct={this.selectProduct}
            products={this.state.products}
            open={this.state.open2}
            handleClose={this.handleClose2}
          />
        ) : null}

        {this.state.contacts ? (
          <PetsOwner
            contacts={this.state.contacts}
            open={this.state.open3}
            selectedPet={this.state.selectedPet}
            handleClose={this.handleClose3}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    petsState: state.pets,
    appState: state.app,
    productsState: state.products,
    contactsState: state.contacts,
  };
};

PetList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const componentDefinition = withStyles(useStyles)(PetList);

export default connect(mapStateToProps, {
  getPets,
  getPet,
  getProducts,
  setCurrentPatient,
  getContacts,
  getContact,
})(componentDefinition);
