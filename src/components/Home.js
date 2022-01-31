import React, { useEffect, useState } from "react"
import App from "../App";
import firebaseApp from "../credenciales";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

import { Button, Col, Container, Row, Stack, Form } from "react-bootstrap";

import AgregarMedia from "./AgregarMedia";
import ListadoMedias from "./ListadoMedias";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


const Home = ({ correoUsuario }) => {
  const [arrayMedias, setArrayMedias] = useState(null);

  // hard-coded test info 
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
      lista: "Seguimiento",
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

  // funcion conectada con firebase
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

    fetchMedias(); //busca las Medias y las guarda
  })

  
  async function editarImagen() {
    var file = document.getElementById("editarImgBtn")
    document.getElementById("editarImgBtn").addEventListener("click", function () {
      uploadBytes(ref(storage, correoUsuario), file).then((snapshot) => {
        console.log("Sucessful upload");
      });

      getDownloadURL(ref(storage, correoUsuario)).then((url) => {
        const img = document.getElementById('defaultImgId');
        img.setAttribute('src', url);
      })
    })
  }
    
  async function añadirNumero() {
    

  }
      

  return (
    updateProfile(auth.currentUser, {
      displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    }),
    
    <Container>
      <Row>
        <Button  
          style={{
            marginLeft: "auto",
            width: 150
            }}
            onClick={() => signOut(auth)}> Cerrar Sesión
        </Button>
      </Row>

      <Stack gap={3}>     
        <h1 align="center"> ¡Bienvenida/o! </h1>
        <h4> {correoUsuario} </h4>
          
        <Form onSubmit={añadirNumero}>
          <Row>
              <Col>
                <h6>
                <div>
                  <img src="logo-telefono.png"
                    width="25"
                    height="25"
                    id="logo-Instagram"
                    style={{ alignSelf: 'center' }}
                  />
                Número:
                  </div>
                </h6>
              </Col>

              <Col>
                <Form.Control
                  type="text"
                  id="formNumero"
                  size="sm"
                />
              </Col>  

              <Col>
                <Button type="submit"> AGREGAR </Button>
              </Col>

              <Col>
                <Button
                  variant="danger"
                  // onClick={() => eliminarNumero(objetoMedia.id)}
                >
                  ELIMINAR
                </Button>
              </Col>
              <Col></Col>
          </Row>
        </Form>

          <Row>
            <Col>
              <div>
                <img src="logo-twitter.png"
                  width="25"
                  height="25"
                  id="logo-twitter"
                  style={{ alignSelf: 'center' }}
                />
                Twitter:
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div>
                <img src="logo-Instagram.png"
                  width="25"
                  height="25"
                  id="logo-Instagram"
                  style={{ alignSelf: 'center' }}
                />
                Instagram:
              </div>
            </Col>
          </Row>
                
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
