import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  //Checkbox,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Tooltip
} from '@material-ui/core';

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const PetsTable = props => {
  const { className, pets, species, breeds, contacts, ...rest } = props;

  const classes = useStyles();

  const [selectedPet, setSelectedPet ] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectOne = (event) => {    
    setSelectedPet(event.target.value)
    props.addSelectedPet(event.target.value)
  };

  const handlePageChange = (event, page) => {
    console.log("handle change",event,page)
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    console.log("rows per page event")
    setRowsPerPage(event.target.value);
    setPage(0)
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                  
                  </TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Especie</TableCell>
                  <TableCell>Raza</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Sexo</TableCell>
                  <TableCell>Edad</TableCell>
                  <TableCell>Dueños</TableCell>
                  <TableCell>fecha de registro</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(pet => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={pet.id}
                    
                  >
                    <TableCell padding="checkbox">
                      <Radio
                        checked={selectedPet === pet._id}
                        color="primary"
                        name="selectedPet"
                        onChange={handleSelectOne}
                        value={pet._id}
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={  process.env.REACT_APP_SERVE_IMAGE + pet.picture}
                        >
                          {getInitials(pet.name)}
                        </Avatar>
                        <Typography variant="body1">{pet.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{pet.species}</TableCell>
                    <TableCell>{pet.breed}</TableCell>
                    <TableCell>{pet.color}</TableCell>
                    <TableCell>{pet.sex}</TableCell>
                    <TableCell>{pet.age}</TableCell>
                    <TableCell>
                    { pet?.contacts?.map( contact =>{ 
                      const sContact = contacts?.filter( element => element._id == contact )[0]
                      return (
                        <Tooltip title={sContact?.name} arrow>
                          <Avatar
                            className={classes.avatar}
                            src={  process.env.REACT_APP_SERVE_IMAGE + sContact?.picture}
                            key={ contact }
                            onClick={()=>{
                              props.getContact(sContact?._id,(success, error)=>{
                                if(success && !error)
                                {
                                  props.history.push('/contacts/form')
                                }
                              })
                            }}
                          >
                            {getInitials(sContact?.name)}
                          </Avatar>
                        </Tooltip>
                      )
                    })}
                    </TableCell>
                    <TableCell>
                      {/* moment(pet.date).format('DD/MM/YYYY') */}
                      { pet.date.split(" ")[0] }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={pets.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

PetsTable.propTypes = {
  className: PropTypes.string,
  pets: PropTypes.array.isRequired
};

export default PetsTable;
