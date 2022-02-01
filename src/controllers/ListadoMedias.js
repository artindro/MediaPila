import React from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";
import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const ListadoMedias = ({ arrayMedias, correoUsuario, setArrayMedias }) => {
  async function eliminarMedia(idMediaAEliminar) {
    // crear nuevo array de Medias
    const nvoArrayMedias = arrayMedias.filter(
      (objetoMedia) => objetoMedia.id !== idMediaAEliminar
    );
    // actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, { Medias: [...nvoArrayMedias] });
    //actualizar state
    setArrayMedias(nvoArrayMedias);
  }


  return (
    <Container>
      <Stack>
        {arrayMedias.map((objetoMedia) => {
          return (
            <>
              <Row>
                <Col> {objetoMedia.nombre} </Col>
                <Col> {objetoMedia.rating} </Col>
                <Col> {objetoMedia.lista} </Col>
                <Col> {objetoMedia.comentario} </Col>
                <Col> {objetoMedia.fecha} </Col>
                <Col> {objetoMedia.categoria} </Col>

                {<Col>
                  <a href={"https://www.youtube.com/results?search_query=Tráiler+" + objetoMedia.nombre} target="_blank">
                      <Button size="sm" variant="success">TRÁILER </Button>
                  </a>
                </Col> }

                <Col>
                  <Button
                    variant="danger"
                    onClick={() => eliminarMedia(objetoMedia.id)}
                  >
                    ELIMINAR
                  </Button>
                </Col>

              </Row>
              <hr />
            </>
          );
        })}
      </Stack>
    </Container>
  );
};

export default ListadoMedias;
