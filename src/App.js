import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  {id: 1, jefe: 'M.C. Adrian Alberto Treviño Becerra', correo: 'mecatronica@rcarbonifera.tecnm.mx', nombre: 'Mecatronica'},
  {id: 2, jefe: 'M.I. Óscar Raúl Sánchez Flores', correo: 'sistemas@rcarbonifera.tecnm.mx', nombre: 'Sistemas'},
  {id: 3, jefe: 'M.I. José Grimaldo Martínez', correo: 'administracion@rcarbonifera.tecnm.mx', nombre: 'Administracion'}
];

let idValue = data.length+1;

class App extends React.Component{
state={
  data: data,
  form:{
    id:'',
    jefe:'',
    correo:'',
    nombre:''
  },
  modalInsertar: false,
  modalEditar: false
};

handleChange=e=>{
this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
}

mostrarModalInsertar=()=>{
  this.setState({modalInsertar:true});
};

ocultarModalInsertar=()=>{
  this.setState({modalInsertar:false});
};

mostrarModalEditar=(reg)=>{
  this.setState({modalEditar:true, form: reg});
};

ocultarModalEditar=()=>{
  this.setState({modalEditar:false});
};

insertar=()=>{
  var valoresNuevo ={...this.state.form};
  valoresNuevo.id= idValue;
  var lista = this.state.data;
  lista.push(valoresNuevo);
  this.setState({data: lista, modalInsertar: false});
};

editar=(dato)=>{
  var contador = 0;
  var lista = this.state.data;
  lista.map((reg)=>{
    if(dato.id===reg.id){
      lista[contador].nombre = dato.nombre;
      lista[contador].correo = dato.correo;
      lista[contador].jefe = dato.jefe;
    }
    contador++;
  });
  this.setState({data: lista, modalEditar: false});
}

eliminar=(dato)=>{
  var opcion=window.confirm("¿Desea eliminar el registro "+dato.nombre+"?");
  if(opcion){
    var contador =0;
    var lista = this.state.data;
    lista.map((reg)=>{
      if(dato.id===reg.id){
        lista.splice(contador, 1);
      }
      contador++;
    });
    this.setState({data: lista});
  }
}

  render(){
    return(
<>
<Container>
<br/>
<h1>Registro de Departamentos</h1>
<Button  color='success' onClick={()=>this.mostrarModalInsertar()}>Agregar</Button>
<br/><br/>
<Table className='table table-success table-striped table-hover'>
      <thead>
        <tr>
          <td>Id</td>
          <td>Nombre</td>
          <td>Jefe</td>
          <td>Correo</td>
          <td>Acciones</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map((e)=>(
        <tr>
          <td>{e.id}</td>
          <td>{e.nombre}</td>
          <td>{e.jefe}</td>
          <td>{e.correo}</td>
          <td><Button color='primary' onClick={()=>this.mostrarModalEditar(e)}>Editar</Button></td>
          <td><Button color='danger' onClick={()=>this.eliminar(e)}>Eliminar</Button></td>
        </tr>
        ))}
      </tbody>
</Table>
</Container>

<Modal isOpen={this.state.modalInsertar}>
  <ModalHeader>
    <div>
      <h3>Insertar Registro</h3>
    </div>
  </ModalHeader>
  <ModalBody>
    <FormGroup>
      <label>Id</label>
      <input className='form-control' name='id' readOnly type='text' value={idValue}/>
    </FormGroup>
    <FormGroup>
      <label>Jefe</label>
      <input className='form-control' name='jefe' type='text' onChange={this.handleChange}/>
    </FormGroup>
    <FormGroup>
      <label>Correo</label>
      <input className='form-control' name='correo' type='text' onChange={this.handleChange}/>
    </FormGroup>
    <FormGroup>
      <label>Nombre</label>
      <input className='form-control' name='nombre' type='text' onChange={this.handleChange}/>
    </FormGroup>
  </ModalBody>
  <ModalFooter>
    <Button color='primary' onClick={()=>this.insertar()}>Insertar</Button>
    <Button color='danger' onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
  </ModalFooter>
</Modal>

<Modal isOpen={this.state.modalEditar}>
  <ModalHeader>
    <div>
      <h3>Editar Registro</h3>
    </div>
  </ModalHeader>
  <ModalBody>
    <FormGroup>
      <label>Id</label>
      <input className='form-control' name='id' readOnly type='text' value={this.state.form.id}/>
    </FormGroup>
    <FormGroup>
      <label>Jefe</label>
      <input className='form-control' name='jefe' type='text' value={this.state.form.jefe} onChange={this.handleChange}/>
    </FormGroup>
    <FormGroup>
      <label>Correo</label>
      <input className='form-control' name='correo' type='text' value={this.state.form.correo} onChange={this.handleChange}/>
    </FormGroup>
    <FormGroup>
      <label>Nombre</label>
      <input className='form-control' name='nombre' type='text' value={this.state.form.nombre} onChange={this.handleChange}/>
    </FormGroup>
  </ModalBody>
  <ModalFooter>
    <Button color='primary' onClick={()=>this.editar(this.state.form)}>Insertar</Button>
    <Button color='danger' onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
  </ModalFooter>
</Modal>

</>)
  }
};

export default App;
