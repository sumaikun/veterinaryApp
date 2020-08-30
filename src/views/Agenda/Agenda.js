import React, { Component } from 'react';
import moment from 'moment';
import { ReactAgenda , ReactAgendaCtrl, guid , getUnique , getLast , getFirst , Modal } from 'react-agenda';
import { connect } from 'react-redux';
import Swal from 'sweetalert2' 
import { getAgendaAnnotations, saveAgendaAnnotation } from 'actions/agendaAnnotations'
import { getAppointments } from 'actions/appointments'
import { getPatients } from 'actions/patients'
import { Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Button,
TextField } from '@material-ui/core'
  import PerfectScrollbar from 'react-perfect-scrollbar';

var now = new Date();

require('moment/locale/es.js');
    var colors= {
      'color-1':"rgba(102, 195, 131 , 1)" ,
      "color-2":"rgba(242, 177, 52, 1)" ,
      "color-3":"rgba(235, 85, 59, 1)" ,
      "color-4":"rgba(70, 159, 213, 1)",
      "color-5":"rgba(170, 59, 123, 1)"
    }


var items = [
  /*{
   _id            :guid(),
    name          : 'Cita thara!',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1 color-4'
  }*/
];

class Agenda extends Component {

  constructor(props){

      super(props);



      this.state = {
        items:[],
        selected:[],
        cellHeight:(60 / 4),
        showModal:false,
        locale:"fr",
        rowsPerHour:4,
        numberOfDays:4,
        startDate: new Date(),
        open:false,
        open2:false,
        patiens:[],
        annotationToSave:{}
      }
      
      this.handleRangeSelection = this.handleRangeSelection.bind(this)
      this.handleItemEdit = this.handleItemEdit.bind(this)
      this.zoomIn = this.zoomIn.bind(this)
      this.zoomOut = this.zoomOut.bind(this)
      this._openModal = this._openModal.bind(this)
      this._closeModal = this._closeModal.bind(this)
      this.addNewEvent = this.addNewEvent.bind(this)
      this.removeEvent = this.removeEvent.bind(this)
      this.editEvent = this.editEvent.bind(this)
      this.changeView = this.changeView.bind(this)
      this.handleCellSelection = this.handleCellSelection.bind(this)
      this.closeDialog = this.closeDialog.bind(this)
      this.closeDialog2 = this.closeDialog2.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.saveAgendaAnnotation = this.saveAgendaAnnotation.bind(this)
  }

  componentDidMount(){

    this.setState({items:items})

    this.props.getPatients((success,error)=>{
      this.setState({patients:success})
    })

    this.props.getAgendaAnnotations((success,error)=>{
      if(success){
        console.info("agenda annotations",success)
        success.forEach(element =>{
          items.push({
            _id            :element._id,
            name          : element.title,
            startDateTime : new Date(element.annotationDate),
            endDateTime   : new Date(element.annotationToDate),
            classes       : 'color-2',
            type: 'annotation',
            meta:element
          })
        })

      }      
    })

    this.props.getAppointments((success,error)=>{
      if(success){
        console.info("appointments",success)
        success.forEach(element => {
          //console.log(element.date.split(".")[0])
          
          let appointmentDate
          
          if(element.state === "pending")
          {
            appointmentDate = new Date(element.appointmentDate.split(".")[0])
          }
          else{
            appointmentDate = new Date(element.date.split(".")[0])
          }
          
          //console.log(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate(), appointmentDate.getHours())
          items.push({
             _id            :element._id,
             name          : element.patientDetails[0]?.name,
             startDateTime : new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate(), appointmentDate.getHours(), appointmentDate.getMinutes()),
             endDateTime   : new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate(), appointmentDate.getHours()+1, appointmentDate.getMinutes()),
             classes       : 'color-5',
             type: 'appointment',
             meta:element
           })
        });
      }      
    })

  }

  closeDialog(){
    this.setState({open:false})
  }

  closeDialog2(){
    this.setState({open2:false})
  }


  componentWillReceiveProps(next , last){
    if(next.items){

      this.setState({items:next.items})
    }
  }

  handleItemEdit(item, openModal) {

    console.log("item",item)

    //console.log("event on cell selected",item,this.state)

    if(item.type === "appointment")
    {
      this.setState({open:true,
        appointmentDetails:item.meta
      })
    }
    else{
      if(item.type === "annotation")
      {
        this.setState({
          annotationToSave:{
            _id:item.meta._id,
            title:item.meta.title,
            description:item.meta.description,
            annotationDate:item.meta.annotationDate,
            annotationToDate:item.meta.annotationToDate
          }
        })
      }
      if(item && openModal === true){
        this.setState({selected:[item] })
        console.log(this.state)
        return this._openModal();
      }
    }

  }

  handleCellSelection(item, openModal) {

    console.log("event on cell selected",item,this.state)

    if(this.state.selected && this.state.selected[0] === item){
      console.log(this.state)
      /*this.setState({annotationToSave:{
        ...this.state.annotationToSave,
        annotationDate:this.state.selected[0],
        annotationToDate:this.state.selected[1]
      }})*/
      return  this._openModal();
    }
    this.setState({selected:[item] })

  }

  zoomIn(){
    
    var num = this.state.cellHeight + 15
    this.setState({cellHeight:num})
    
  }
  zoomOut(){

    var num = this.state.cellHeight - 15
    this.setState({cellHeight:num})
  
  }


  handleDateRangeChange (startDate, endDate) {
      
    this.setState({startDate:startDate })

  }

  handleRangeSelection (selected) {

      console.log("handleRangeSelection",selected,this.state)
      
      this.setState({selected:selected , showCtrl:true,annotationToSave:{
        annotationDate:selected[0],
        annotationToDate:selected[1]
      }})
      this._openModal();

  }

  _openModal(){
    //this.setState({showModal:true})

    //console.log("selected",this.state)

    this.setState({open2:true})
  }

  _closeModal(e){
    if(e)
    {
      e.stopPropagation();
      e.preventDefault();
    }
      this.setState({showModal:false})
  }

  handleItemChange(items , item){

    console.log("item changed",item)
    if(item.type === "appointment")
    {
      return Swal.fire({
        icon: 'warning',
        title: 'Espera',
        text: "No puede modificarse la fecha de una cita del calendario",          
      })
    }
    else{
      this.setState({items:items})
    }
  }

  handleItemSize(items , item){

    console.log("item sized changed",item)

    this.setState({items:items})

  }

  removeEvent(items , item){

    if(item.type === "appointment")
    {
      return Swal.fire({
        icon: 'warning',
        title: 'Espera',
        text: "No puede borrarse una cita del calendario",          
      })
    }
    else{
      this.setState({ items:items});
    }  
  }

  addNewEvent (items , newItems){

    this.setState({showModal:false ,selected:[] , items:items});
    //this._closeModal();
  }
  editEvent (items , item){

    this.setState({showModal:false ,selected:[] , items:items});
    //this._closeModal();
  }

  changeView (days , event ){
    this.setState({numberOfDays:days})
  }


  handleChange(event){
    
    //props.changeDetails(event.target.name,event.target.value)
    this.setState({
      annotationToSave:{
        ...this.state.annotationToSave,
        [event.target.name]:event.target.value
      }
    })
  };

  saveAgendaAnnotation(){
    console.log("agenda annotation",this.state.annotationToSave)
    if( !this.state.annotationToSave.title || !this.state.annotationToSave.description )
    {
      this.setState({open2:false})
      Swal.fire({
          icon: 'warning',
          title: 'Espera',
          text: "Todos los datos son obligatorios",          
      }).then( data => {
        this.setState({open2:true})
      })
    }else{
      this.props.saveAgendaAnnotation(this.state.annotationToSave,(success,error)=>{
        if(success)
        {
          this.setState({open2:false})
          Swal.fire({
            icon: 'success',
            title: 'Bien',
            text: "Datos registrados",          
          })  
        }
      })
    }
    
  }


  render() {

    var AgendaItem = function(props){
      console.log( ' item component props' , props)
      return <div style={{display:'block', position:'absolute' , background:'#FFF'}}>{props.item.name} <button onClick={()=> props.edit(props.item)}>Edit </button></div>
    }
    return (

      <div className="content-expanded ">

        <div className="control-buttons">
          <button  className="button-control" onClick={this.zoomIn}> <i className="zoom-plus-icon"></i> </button>
          <button  className="button-control" onClick={this.zoomOut}> <i className="zoom-minus-icon"></i> </button>
          <button  className="button-control" onClick={this._openModal}> <i className="schedule-icon"></i> </button>
          <button  className="button-control" onClick={this.changeView.bind(null , 7)}> {moment.duration(7, "days").humanize()}  </button>
          <button  className="button-control" onClick={this.changeView.bind(null , 4)}> {moment.duration(4, "days").humanize()}  </button>
          <button  className="button-control" onClick={this.changeView.bind(null , 3)}> {moment.duration(3, "days").humanize()}  </button>
          <button  className="button-control" onClick={this.changeView.bind(null , 1)}> {moment.duration(1, "day").humanize()} </button>
        </div>

        <ReactAgenda
          minDate={new Date(now.getFullYear(), now.getMonth()-3)}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          startDate={this.state.startDate}
          startAtTime={8}
          endAtTime={23}
          cellHeight={this.state.cellHeight}
          locale="fr"
          items={this.state.items}
          numberOfDays={this.state.numberOfDays}
          headFormat={"ddd DD MMM"}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          helper={true}
          //itemComponent={AgendaItem}
          view="calendar"
          autoScale={false}
          fixedHeader={true}
          onRangeSelection={this.handleRangeSelection.bind(this)}
          onChangeEvent={this.handleItemChange.bind(this)}
          onChangeDuration={this.handleItemSize.bind(this)}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
          onItemRemove={this.removeEvent.bind(this)}
          onDateRangeChange={this.handleDateRangeChange.bind(this)} />
        {
          this.state.showModal? <Modal clickOutside={this._closeModal} >
          <div className="modal-content">
             <ReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected} Addnew={this.addNewEvent} edit={this.editEvent}  />

          </div>
   </Modal>:''
}


      <Dialog
        open={this.state.open}
        onClose={this.closeDialog}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>
          Información de cita
        </DialogTitle>
        <DialogContent>

          <PerfectScrollbar>
            <div>
              <Table>
                <TableHead>
                    <TableRow>                  
                      <TableCell>Veterinario/a</TableCell>
                      <TableCell>Paciente</TableCell>
                      <TableCell>Motivo de la consulta</TableCell>
                      <TableCell>Resultados de la consulta</TableCell>
                      <TableCell>Fecha</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>                  
                      <TableCell>{ this.state.appointmentDetails?.userDetails[0]?.name }</TableCell>
                      <TableCell>{ this.state.appointmentDetails?.patientDetails[0]?.name }</TableCell>
                      <TableCell>{ this.state.appointmentDetails?.reasonForConsultation }</TableCell>
                      <TableCell>{ this.state.appointmentDetails?.resultsForConsultation }</TableCell>
                      <TableCell>{ this.state.appointmentDetails?.date.split(" ")[0]}</TableCell>
                      
                    </TableRow>
                </TableBody>
              </Table>
            </div> 
          </PerfectScrollbar>   
        </DialogContent>
      </Dialog>  


      <Dialog
        open={this.state.open2}
        onClose={this.closeDialog2}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>
          Nueva nota
        </DialogTitle>
        <DialogContent>
          <Grid  container>
            
            <Grid item lg={12} md={12} xs={12}>
                <TextField  fullWidth  label="Titulo de la nota" margin="dense"
                name="title" value={this.state.annotationToSave.title} variant="outlined"
                onChange={this.handleChange}
                />
            </Grid>
            
            <Grid item lg={12} md={12} xs={12}>
                <TextField  fullWidth  label="Descripción de la nota" margin="dense"
                name="description" value={this.state.annotationToSave.description}
                onChange={this.handleChange}
                variant="outlined"
                multiline rows={3} />
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
              <TextField
                id="datetime-local"
                label="Fecha inicio"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                name="annotationDate"
                value={this.state.annotationToSave.annotationDate}
                onChange={this.handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
              />
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
              <TextField
                id="datetime-local"
                label="Fecha final"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                name="annotationToDate"
                value={this.state.annotationToSave.annotationToDate}
                onChange={this.handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
              />
            </Grid>
            

            <Grid item lg={12} md={12} xs={12}>
              <Button color="primary" variant="contained" onClick={this.saveAgendaAnnotation}  style={{marginTop:"10px"}} >
                  Guardar
              </Button>
            </Grid>

          </Grid>
        </DialogContent>    
      </Dialog>

    </div>

    );
  }
}  

const mapStateToProps = state => {
 
  return {
    //patientsState: state.patients,
    appState: state.app
  };
}

export default  connect(mapStateToProps, { getAgendaAnnotations,
   saveAgendaAnnotation,
   getAppointments,
   getPatients })(Agenda)