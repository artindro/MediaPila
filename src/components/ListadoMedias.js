import React from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";
import { getAuth, deleteUser } from "firebase/auth";
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

  async function eliminarCuenta() { //delete
    //Autenticacion y Manejo del Usuario
    //identificar usuario
    /*const auth = getAuth();
    const user = auth.currentUser;

    let CurrentUser;
    auth().onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        CurrentUser = user;
        console.log('Con Usuario Logeado' + " " + user.uid);  
        // ...
      } else {
        // User is signed out
        console.log('Sin Usuario Logeado');
      }
    });

    //eliminar cuenta

    deleteUser(user).then(() => {
      console.log('User deleted');
      // User deleted.
    }).catch((error) => {
      console.log('Error');
      // An error ocurred
    });
  */
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
                  <a href={"https://www.youtube.com/results?search_query=trailer+" + objetoMedia.nombre} target="_blank">
                      <Button variant="secondary">TRAILER</Button>
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

      <Button
        variant="danger"
        onClick={() => eliminarCuenta()}
      >
        ELIMINAR CUENTA
      </Button>

    </Container>
  );
};

export default ListadoMedias;
