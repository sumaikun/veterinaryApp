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
import  PictureModal  from 'components/PictureModal'

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

const UsersTable = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [selectedUser, setSelectedUser ] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [openPm, setOpenPm] = useState(false);

  const [picturePm, setPicturePm] = useState(null);

  const openPictureModal = (picture) => {
    setPicturePm(process.env.REACT_APP_SERVE_IMAGE+picture)
    setOpenPm(true)
  }

  const closePictureModal = () => {
    setOpenPm(false)
  }

  const handleSelectOne = (event) => {    
    setSelectedUser(event.target.value)
    props.addSelectedUser(event.target.value)
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
    <div>
      <PictureModal open={openPm}  picture={picturePm} handleClose={closePictureModal} ></PictureModal>
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
                    <TableCell>Nombres</TableCell>
                    <TableCell>Apellidos</TableCell>
                    <TableCell>Rol</TableCell>
                    <TableCell>Correo</TableCell>                  
                    <TableCell>Telefóno</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>fecha de registro</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.id}
                      
                    >
                      <TableCell padding="checkbox">
                        <Radio
                          checked={selectedUser === user._id}
                          color="primary"
                          name="selectedUser"
                          onChange={handleSelectOne}
                          value={user._id}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameContainer}>
                          <Avatar
                            onClick={()=>{ openPictureModal(user.picture)  }}
                            className={classes.avatar}
                            src={  process.env.REACT_APP_SERVE_IMAGE + user.picture}
                          >
                            {getInitials(user.name)}
                          </Avatar>
                          <Typography variant="body1">{user.name}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>{ user.lastName }</TableCell>
                      <TableCell>{ user.role }</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.state}</TableCell>
                      <TableCell>
                        {/* moment(user.date).format('DD/MM/YYYY') */}
                        { user.date.split(" ")[0] }
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
            count={users.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
    </div>    
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
