import React from 'react';
import axios from 'axios';

import './FullPedido.css';
import { Row, Col, Container } from 'react-bootstrap';

class FullPost extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        loadedPedido: null,
        libros: [],
        titulos: [],
        precios: [(10.90), (11.35), (10.90), (19.90), (19.90), (17.95)],
        errorLibros: false,
        errorPedidos: false
    }

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPedido || this.state.loadedPedido.idb !== this.props.id) {
                //axios.get('/posts.json?orderBy="id"&equalTo="' + this.props.id + '"')
                axios.get('https://marta-bbdd.firebaseio.com/pedidosTienda.json?orderBy="$key"&equalTo="' + this.props.id + '"')
                    .then(response => {
                        const pedidos = [];
                        for (let key in response.data) {
                            pedidos.push({
                                ...response.data[key],
                                idb: key
                            });
                        }
                        this.setState({ loadedPedido: pedidos[0] });
                    }).catch(error => {
                        this.setState({ errorPedidos: true });
                    });

                axios.get('https://marta-bbdd.firebaseio.com/librosTienda.json')
                    .then(response => {
                        let libros = [];
                        let l = [];
                        let titulos = [];
                        for (let key in response.data) {
                            libros.push({
                                ...response.data[key],
                                idb: key
                            });
                        }
                        libros = libros.slice(1);
                        this.setState({ libros: libros });

                        l = this.state.libros.map(libro => {
                            titulos.push(libro.title);
                        });
                        this.setState({ titulos: titulos });

                    }).catch(error => {
                        this.setState({ errorLibros: true });
                    });
            }
        }
    }

    deletePedido = () => {
        axios.put('https://marta-bbdd.firebaseio.com/pedidosTienda/' + this.props.id + '.json', {
            ...this.state.comentarioBorrar,
        })
            .then(response => {
                console.log(response);
                console.log("Quiero borrarlo");
                console.log(this.state.selectedComentarioId);
            });
    }


    render() {
        let pedido = <p style={{ textAlign: 'center' }}>Selecciona un pedido para ver los detalles</p>;
        let elementos = <p style={{ textAlign: 'center' }}></p>;
        let libros = <p style={{ textAlign: 'center' }}></p>;
        let l = <p style={{ textAlign: 'center' }}></p>;

        if (this.props.id) {
            pedido = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if (this.state.loadedPedido) {
            let subtotal = 0;
            let indice = 0;
            let arrayCantidades = [this.state.loadedPedido[1], this.state.loadedPedido[2], this.state.loadedPedido[3], this.state.loadedPedido[4], this.state.loadedPedido[5], this.state.loadedPedido[6]];

            elementos = arrayCantidades.map((elemento, index) => {
                if ((elemento) > 0) {
                    indice = index + 1;
                    subtotal = subtotal + elemento * (this.state.precios[index]);
                    return (
                        <Row className="PedidoDesglosado">
                            <Col>Libro: {this.state.titulos[index]} -> Cantidad: {elemento}</Col>
                        </Row>
                    );
                }
            });

            pedido = (
                <Container>
                    <Row className="PedidoDesglosado">
                        <Col>
                            <p>Nombre completo: {this.state.loadedPedido.nombre}</p>
                            <p>Email: {this.state.loadedPedido.email}</p>
                        </Col>

                        <Col>
                            <p>Dirección: {this.state.loadedPedido.direccion}</p>
                            <p>Ciudad: {this.state.loadedPedido.ciudad}</p>
                            <p>Código Postal: {this.state.loadedPedido.cp}</p>
                        </Col>
                        <Col>
                            <button onClick={this.deletePedido} className="Delete">Borrar Pedido</button>
                        </Col>

                    </Row>
                    <Row className="PedidoDesglosado">
                        <Col>
                            <h4>Productos comprados en el pedido:</h4>
                        </Col>
                    </Row>
                </Container>
            );
        }

        return (
            <div className="Completo">
                {pedido}
                {elementos}
                <Row className="Hueco"></Row>
            </div>
        )

    }
}

export default FullPost;