import React, { useEffect, useState } from "react"
import firebaseApp from "../credenciales";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

import { Button, Col, Container, Row, Stack, Form } from "react-bootstrap";

import AgregarMedia from "./AgregarMedia";
import ListadoMedias from "./ListadoMedias";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


const Home = ({ correoUsuario }) => {
  const [arrayMedias, setArrayMedias] = useState(null);

  // hard-coded test info for Medias
  const fakeData = [
    {
      id: 1,
      nombre: "Media 1",
      rating: 1,
      lista: "Pendiente",
      comentario: "mala",
      fecha: "2021-10-15",
      url: "https://picsum.photos/420"
    },
    {
      id: 2,
      nombre: "Media 2",
      rating: 2,
      lista: "Visto",
      comentario: "ok",
      fecha: "2021-11-16",
      url: "https://picsum.photos/420"
    },
    {
      id: 3,
      nombre: "Media 3",
      rating: 4,
      lista: "Pendiente",
      comentario: "buena",
      fecha: "2021-12-17",
      url: "https://picsum.photos/420"
    },
  ];

  // funcion conectada con firebase Media
  async function buscarDocumentOrCrearDocumento(idDocumento) {  //id Usuarios en firestore
    //ref al doc
    const docuRef = doc(firestore, `usuarios/${idDocumento}`); //path con id dinamico - (string Template)
    //buscar doc
    const consulta = await getDoc(docuRef);  //await para q la busqueda se complete
    // chequear existencia pq firebase siempre devuelve un tipo de objeto aunque esté vacío.
    if (consulta.exists()) {
      // existe ent -- método data para revelar info de consulta
      const infoDocu = consulta.data();
      return infoDocu.Medias;   //campo Medias en firestore
    }
    else {
      // no existe ent crear el documento
      await setDoc(docuRef, { Medias: [...fakeData] });  // crear documento con campo Medias dentro del cual se guarda array fakeData.
      const consulta = await getDoc(docuRef);
      const infoDocu = consulta.data();
      return infoDocu.Medias;
    }
  }

   
  

  useEffect(() => {
    async function fetchMedias() {
      const MediasFetchadas = await buscarDocumentOrCrearDocumento(correoUsuario);
      setArrayMedias(MediasFetchadas);
    }
    fetchMedias(); //busca las Medias para guardar
  })
    
  
  return (   
    <Container>
      <Row>
        <Button variant="secondary"
          style={{
            marginLeft: "auto",
            width: 150
            }}
            onClick={() => signOut(auth)}> Cerrar Sesión
        </Button>
      </Row>

      <Stack gap={3}>     
        <h1 align="center"> ¡Bienvenida/o! </h1>
          
        <Row>
          <Col>
            <h6>
              <div>
                <img src="logo-MediaPila.png"
                  width="200"
                  height="200"
                  id="logo-MediaPila"
                  style={{ alignSelf: 'center' }}
                  />
              </div>
            </h6>
          </Col>
        </Row>

        <h4> {correoUsuario} </h4>

        <hr />
        <AgregarMedia
          arrayMedias={arrayMedias}
          setArrayMedias={setArrayMedias}
          correoUsuario={correoUsuario} />
        {
          arrayMedias ? //si arrayMedias tiene valores y no es null ent
            <ListadoMedias      //se pasan los parámetros p q firebase pueda interactuar
              arrayMedias={arrayMedias}
              setArrayMedias={setArrayMedias}
              correoUsuario={correoUsuario}
            />
            : null //caso contrario no se hace nada
        }
        
        </Stack>
    </Container >
  );
};

export default Home;
