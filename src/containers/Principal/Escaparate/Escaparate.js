import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


import Libro from '../../../components/Libro/Libro';
import './Escaparate.css';
import { Container, Row, Col} from 'react-bootstrap';

class Escaparate extends React.Component {
    state = {
        libros: [],
        errorLibros: false,
        selectedLibroId: null,
        cantidadesLibros: [0, 0, 0, 0, 0, 0]
    }

    componentDidMount() {
        axios.get('https://marta-bbdd.firebaseio.com/librosTienda.json')
            .then(response => {
                let libros = [];
                for (let key in response.data) {
                    libros.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                libros = libros.slice(1);
                console.log(libros);
                this.setState({ libros: libros });
            }).catch(error => {
                this.setState({ errorLibros: true });
            });
    }

    restarCantidad = (id) => {
        this.setState({ selectedLibroId: id });

        let cantidades = this.state.cantidadesLibros;
        let nuevoId = id - 1;
        if (cantidades[nuevoId] > 0) {
            cantidades[nuevoId] = cantidades[nuevoId] - 1;
        }

        this.setState({ cantidadesLibros: cantidades })
    }

    sumarCantidad = (id) => {
        this.setState({ selectedLibroId: id });

        let cantidades = this.state.cantidadesLibros;
        let nuevoId = id - 1;
        cantidades[nuevoId] = cantidades[nuevoId] + 1;

        this.setState({ cantidadesLibros: cantidades })
    }


    render() {
        //console.log(this.state.cantidadesLibros)
        let libros = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.errorLibros) {
            libros = this.state.libros.map(libro => {
                return <Libro
                    key={libro.idb}
                    title={libro.title}
                    author={libro.author}
                    image={libro.image}
                    price={libro.price}
                    cantidad={this.state.cantidadesLibros[libro.idb - 1]}
                    restar={() => this.restarCantidad(libro.idb)}
                    sumar={() => this.sumarCantidad(libro.idb)} />;
            });
        }

        return (
            <Container className="Escaparate">
                <Row className="Libros">
                    <div className="Libros">
                        {libros}
                    </div>

                </Row>
                <Row className = "BotonComprar">
                    <Col></Col>
                    <Col className="Comprar">
                        <Link to={{ pathname: '/proceso-compra' }}>
                            <nav onClick={() => this.props.callbackFromParent(this.state.cantidadesLibros)}>
                                Realizar pedido
                        </nav>
                        </Link>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>


        );
    }
}

export default Escaparate;