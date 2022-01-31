import React from "react";
import { Container, Form, Col, Row, Button, Table } from "react-bootstrap";
import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


const AgregarMedia = ({ correoUsuario, setArrayMedias, arrayMedias }) => {
  let urlDescarga = "https://picsum.photos/420";

  async function añadirMedia(e) {
    e.preventDefault();
    const nombre = e.target.formnombre.value;
    const rating = e.target.idRating.value;
    const lista = e.target.idList.value;
    const comentario = e.target.formComentario.value;
    var fecha;
    if (fecha == "") {
      console.log(fecha);
      alert('¡INGRESE UNA FECHA VÁLIDA POR FAVOR!');
    } else {
      fecha = e.target.idFecha.value;
    }
    const categoria = e.target.idCategoria.value;


    // crear nuevo array de Medias
    const nvoArrayMedias = [
      ...arrayMedias,
      {
        id: +new Date(),
        nombre: nombre,
        rating: rating,
        lista: lista,
        comentario: comentario,
        fecha: fecha,
        categoria: categoria,
        //url: urlDescarga,
      },
    ];   
    // actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, { Medias: [...nvoArrayMedias] });
    //actualizar estado
    setArrayMedias(nvoArrayMedias);

    // limpiar forms
    e.target.formnombre.value = "";
    e.target.idRating.value = "1";
    e.target.idList.value = "Pendiente";
    e.target.formComentario.value = "";
    e.target.idFecha.value = "";
    e.target.idCategoria.value = "Película";
  }

  async function fileHandler(e) {   //delete
    // detectar archivo
    const archivoLocal = e.target.files[0];
    // cargarlo a firebase storage
    const archivoRef = ref(storage, `almacenamiento/${archivoLocal.name}`);
    await uploadBytes(archivoRef, archivoLocal);
    // obtener url de descarga
    urlDescarga = await getDownloadURL(archivoRef);
  }


  return (
    <Container>
      <Form onSubmit={añadirMedia}>

        <Row className="mb-5">
          <Col> 
            <h6> MEDIA </h6>
            <Form.Control
              type="text"
              placeholder="Nombre"
              id="formnombre"
            />
          </Col>

          <Col>
            <h6> RATING </h6>
            <Button variant="">
              <select id="idRating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </Button>
          </Col>

          <Col>
            <h6> LISTA </h6>
            <a>
              <Button variant="">
                <select id="idList">
                  <option value="Pendiente">Pendiente</option>
                  <option value="Visto">Visto</option>
                </select>
              </Button>
            </a>
          </Col>

          <Col>
            <h6> COMENTARIO </h6>
            <Form.Control
              type="text"
              placeholder="Comentario"
              id="formComentario"
            />
          </Col>

          <Col>
            <h6> FECHA </h6>
            <label for="idFecha"></label>
            <input type="date"
              id="idFecha"
              name="idFecha"
              min="1900-01-01"
              max="2200-01-01" />
          </Col>

          <Col>
            <h6> CATEGORÍA </h6>
            <a>
              <Button variant="">
                <select id="idCategoria">
                  <option value="Película">Película</option>
                  <option value="Serie">Serie</option>
                  <option value="Libro">Libro</option>
                  <option value="Otro">Otro...</option>
                </select>
              </Button>
            </a>
          </Col>

          <Col>
          </Col>

          <Col>
            <Button type="submit"> AGREGAR </Button>
          </Col>

        </Row>
      </Form>
      <hr />
    </Container>
  );
};

export default AgregarMedia;

/*

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


const AgregarMedia = ({ correoUsuario, setArrayMedias, arrayMedias }) => {
  let urlDescarga;
  
  async function añadirMedia(e) {
    e.preventDefault();
    const nombre = e.target.formnombre.value;
    // crear nuevo array de Medias
    const nvoArrayMedias = [
      ...arrayMedias,
      {
        id: +new Date(),
        nombre: nombre,
        url: urlDescarga,
      },
    ];
    // actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, { Medias: [...nvoArrayMedias] });
    //actualizar estado
    setArrayMedias(nvoArrayMedias);
    // limpiar form
    e.target.formnombre.value = "";
  }

  async function fileHandler(e) {
    // detectar archivo
    const archivoLocal = e.target.files[0];
    // cargarlo a firebase storage
    const archivoRef = ref(storage, `documentos/${archivoLocal.name}`);
    await uploadBytes(archivoRef, archivoLocal);
    // obtener url de descarga
    urlDescarga = await getDownloadURL(archivoRef);
  }
 
  return (
    <Container>
      <Form onSubmit={añadirMedia}>
        <Row className="mb-5">
          <Col>
            <Form.Control
              type="text"
              placeholder="Describe tu Media"
              id="formnombre"
            />
          </Col>
          <Col>
            <Form.Control
              type="file"
              placeholder="Añade archivo"
              onChange={fileHandler}
            />
          </Col>
          <Col>
            <Button type="submit"> AgregarMedia</Button>
          </Col>
        </Row>
      </Form>
      <hr />
    </Container>
  );
};

export default AgregarMedia;
*/