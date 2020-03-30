import React from 'react';
import axios from 'axios';


import './Formulario.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class Formulario extends React.Component {
    constructor(props) {
        super(props);
        this.inputElement = React.createRef();
        this.state = {
            nombre: '',
            email: '',
            direccion: '',
            ciudad: '',
            cp: '',
            lista: []
        };
    }

    componentDidMount() {
        let list = this.props.parametro;
        this.setState({ lista: list });
        this.inputElement.current.focus();
    }

    focusTextInput() {
        this.textInput.current.focus();
    }

    postDataHandler = () => {
        const data = {
            nombre: this.state.nombre,
            email: this.state.email,
            direccion: this.state.direccion,
            ciudad: this.state.ciudad,
            cp: this.state.cp,
            1:this.state.lista[0],
            2:this.state.lista[1],
            3:this.state.lista[2],
            4:this.state.lista[3],
            5:this.state.lista[4],
            6:this.state.lista[5]
            
        };
        axios.post('https://marta-bbdd.firebaseio.com/pedidosTienda.json', data)
            .then(response => {
                alert('Gracias. Tu pedido ha sido registrado con éxito :)');
            });
    }


    render() {
        return (
            <Container className="Formulario">
                <h2>Datos del pedido</h2>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control value={this.state.nombre} onChange={(event) => this.setState({ nombre: event.target.value })} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control placeholder="Calle... nº..." value={this.state.direccion} onChange={(event) => this.setState({ direccion: event.target.value })} />
                    </Form.Group>


                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control value={this.state.ciudad} onChange={(event) => this.setState({ ciudad: event.target.value })} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Código Postal</Form.Label>
                            <Form.Control value={this.state.cp} onChange={(event) => this.setState({ cp: event.target.value })} />
                        </Form.Group>
                    </Form.Row>

                    <Button  ref={this.inputElement} onClick={this.postDataHandler}>Realizar pedido</Button>
                </Form>
            </Container>
        );
    }
}

export default Formulario;