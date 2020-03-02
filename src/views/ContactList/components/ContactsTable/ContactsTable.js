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
  TablePagination
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

const ContactsTable = props => {
  const { className, contacts, ...rest } = props;

  const classes = useStyles();

  const [selectedContact, setSelectedContact ] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);



  const handleSelectOne = (event) => {    
    setSelectedContact(event.target.value)
    props.addSelectedContact(event.target.value)
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
                  <TableCell>Identificación</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Dirección</TableCell>
                  <TableCell>Telefóno</TableCell>
                  <TableCell>Ocupación</TableCell>
                  <TableCell>fecha de registro</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(contact => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={contact.id}
                    
                  >
                    <TableCell padding="checkbox">
                      <Radio
                        checked={selectedContact === contact._id}
                        color="primary"
                        name="selectedContact"
                        onChange={handleSelectOne}
                        value={contact._id}
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={  process.env.REACT_APP_SERVE_IMAGE + contact.picture}
                        >
                          {getInitials(contact.name)}
                        </Avatar>
                        <Typography variant="body1">{contact.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{contact.identification}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>
                      {contact.address}
                    </TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.ocupation}</TableCell>
                    <TableCell>
                      {/* moment(contact.date).format('DD/MM/YYYY') */}
                      { contact.date.split(" ")[0] }
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
          count={contacts.length}
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

ContactsTable.propTypes = {
  className: PropTypes.string,
  contacts: PropTypes.array.isRequired
};

export default ContactsTable;
