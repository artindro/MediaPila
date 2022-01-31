import React, { useState } from "react";
import { Stack, Container, Form, Button, Row, Col } from "react-bootstrap";

import firebaseApp from "../credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();


const Logueo = () => {
  const [estaRegistrandose, setEstaRegistrandose] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    const correo = e.target.formBasicEmail.value;
    const contra = e.target.formBasicPassword.value;

    if (estaRegistrandose) {
      //si se registra
      try {
        const usuario = await createUserWithEmailAndPassword(
          auth,
          correo,
          contra
        );
        console.log(correo, contra);
        console.log(e.message);
      } catch (error) {
        alert('¡CORREO YA REGISTRADO!');
      }
  
    } else {
      // si está iniciando sesión
       try {
        await signInWithEmailAndPassword(auth, correo, contra);
        console.log(correo, contra);
        console.log(e.message);
      } catch (error) {
        alert('¡DATOS INVÁLIDOS!');
      }
    }
  }

  return (
    <Container>
      <Stack gap={3}>

        <h1>{ estaRegistrandose ? "Registrarse" : "Iniciar Sesión" } </h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingrese su email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="******" />
          </Form.Group>

          <Button variant="dark" type="submit">
            {estaRegistrandose ? "Registrarse" : "Iniciar Sesión"}
          </Button>
        </Form>

        <Button
          variant="primary"
          type="submit"
          style={{ width: "300px" }}
          onClick={() => signInWithRedirect(auth, googleProvider)}
        >
          Acceder con Google
        </Button>

        <Button
          style={{ width: "300px" }}
          variant="secondary"
          onClick={() => setEstaRegistrandose(!estaRegistrandose)}
        >
          {estaRegistrandose
            ? "¿Ya tenés cuenta? Iniciar Sesión"
            : "¿No tenés cuenta? Registrarse"}
        </Button>
        
        <hr />

        <Row>
          <div>
            <img src="logo-twitter.png"
              width="25"
              height="20"
              id="logo-twitter"
              style={{ alignSelf: 'center' }}
            />
            Seguínos en Twitter: 
            <a
              href={"https://twitter.com/MediaPilaOf"} target="_blank"> @MediaPilaOf
            </a>
            </div>
        </Row>

        <Row>
          <div> 
            <img src="logo-Instagram.png"
              width="25"
              height="25"
              id="logo-Instagram"
              style={{ alignSelf: 'center' }}
            />
            Seguínos en Instagram:
            <a
              href={"https://www.instagram.com/mediapilaof/"} target="_blank"> @mediapilaof
            </a>
          </div>
        </Row>

      </Stack>
    </Container>
  );
};

export default Logueo;
