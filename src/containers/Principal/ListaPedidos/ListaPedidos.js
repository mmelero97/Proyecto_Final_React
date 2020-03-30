import React from 'react';
import axios from 'axios';

import './ListaPedidos.css';
import Pedido from '../../../components/Pedido/Pedido';
import FullPedido from '../../../components/FullPedido/FullPedido';

import { Container, Row, Col } from 'react-bootstrap';

class ListaPedidos extends React.Component {
    state = {
        pedidos: [],
        selectedId: null,
        error: false
    }

    componentDidMount() {
        //axios.get('https://firestore.googleapis.com/v1/projects/my-demoblog/databases/(default)/documents/posts/')
        axios.get('https://marta-bbdd.firebaseio.com/pedidosTienda.json')
            .then(response => {
                let pedidos = [];
                for (let key in response.data) {
                    pedidos.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                //pedidos = posts.slice(1, 4);
                this.setState({ pedidos: pedidos });
            }).catch(error => {
                this.setState({ error: true });
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedId: id });
    }

    deleteUpdateHandler = () => {
        axios.put('https://marta-bbdd.firebaseio.com/pedidosTienda/' + this.state.selectedId + '.json', {
            ...this.state.comentarioBorrar,
        })
            .then(response => {
                alert('El pedido ha sido eliminado con éxito.');
            });
    }

    render() {
        let pedidos = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            pedidos = this.state.pedidos.map(pedido => {
                return <Pedido
                    key={pedido.idb}
                    nombre={pedido.nombre}
                    email={pedido.email}
                    borrar={this.deleteUpdateHandler}
                    clicked={() => this.postSelectedHandler(pedido.idb)} />;
            });
        }
        //console.log(this.state.cantidadesLibros);

        return (
            <Container className='ListaPedidos'>
                <h2>Listado de pedidos</h2>

                <section className="">
                    <Row>
                        {pedidos}
                    </Row>
                </section>
                <Row className="Hueco">
                </Row>
                <section>
                    <div className="CabeceraPedido"><h3>Ficha de pedido</h3></div>
                    <FullPedido id={this.state.selectedId} />
                </section>
            </Container>
        );
    }

}

export default ListaPedidos;