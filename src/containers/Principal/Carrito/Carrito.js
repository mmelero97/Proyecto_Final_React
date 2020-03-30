import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Carrito.css';
import ElementoCarrito from '../ElementoCarrito/ElementoCarrito';
import LibroCarrito from '../../../components/LibroCarrito/LibroCarrito';
import { Container, Row, Col } from 'react-bootstrap';

class Carrito extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        lista: [],
        libros: [],
        precios: [(10.90), (11.35), (10.90), (19.90), (19.90), (17.95)],
        errorLibros: false
    }

    componentDidMount() {
        let list = this.props.parametro;
        this.setState({ lista: list });

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


    render() {
        let libros = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.errorLibros) {
            libros = this.state.libros.map(libro => {
                return <LibroCarrito
                    key={libro.idb}
                    title={libro.title}
                    author={libro.author}
                    image={libro.image}
                    price={libro.price} />;
            });
        }

        //console.log(this.state.lista);

        let subtotal = 0;
        let indice = 0;
        let data = Array.from(this.state.lista);
        let elementosCarrito = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        elementosCarrito = data.map((libro, index) => {
            if ((libro) > 0) {
                console.log(index);
                console.log(libro);
                indice = index + 1;
                subtotal = Math.round(subtotal + libro*(this.state.precios[index]));
                return <ElementoCarrito
                    cantidad={libro}
                    libro={libros[index]} />;
            }
        });
        console.log(subtotal);

        return (
            <Container>
                <div className="EncabezadoCarrito">
                    <h2>Carrito</h2>
                </div>
                <div >
                    {elementosCarrito}
                </div>

                <div className="Total">
                    <p>Total: {subtotal} €</p>
                </div>

                <Row className="BotonComprar2">
                    <Col></Col>
                    <Col className="Comprar2">
                        <nav>
                            <Link to={{ pathname: '/formulario' }}>
                                Confirmar pedido
                            </Link>
                        </nav>
                    </Col>

                    <Col></Col>
                </Row>
            </Container>
        );
    }

}


export default Carrito;

