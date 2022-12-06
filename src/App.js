import './App.css';
import { Button, Card, Col, Container, Form, Modal, Nav, Navbar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apm } from '@elastic/apm-rum';

function App() {
  const [show, setShow] = useState(false);
  const [list, setList] = useState([])
  const [forms, setForms] = useState({
    "name": "",
    "hero": "",
    "year": 0,
    "image": "",
    "star": 1,
    "type": "",
    "description": ""
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getApiData = async () => {
    var transaction = apm.startTransaction("List Hero", "Hero");
    axios.get('http://localhost:8080/findAll')
      .then(function (response) {
        // handle success
        setList(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    if (transaction) transaction.end()
  }

  const handleText = (e) => {
    let { value, name } = e.target || { value: null, name: null };
    console.log(name)
    if(name === 'star' || name === 'year'){
      value = parseInt(value)
    }
    setForms((prevState) => {
      const obj = { ...prevState };
      obj[name] = value;
      return obj;
    });

  }

  const seeInformations = (row) => {
    handleShow()
    console.log(row)
    setForms(row)
  }

  const deleteHero = () => {
    var transaction = apm.startTransaction("Delete Hero", "Hero");
    transaction.addLabels(forms);
    var click = apm.getCurrentTransaction()
    axios.delete(`http://localhost:8080/delete/${forms.id}`)
        .then(function (response) {
          // handle success
          getApiData()
          handleClose()
          setForms({
            "name": "",
            "hero": "",
            "year": 0,
            "image": "",
            "star": 1,
            "type": "",
            "description": ""
          })
        })
        .catch(function (error) {
          // handle error
          console.log(error);
    })
    if (transaction) transaction.end()
    if (click) click.end()
  }

  const submitForms = () => {
    if(forms.id){
      var transaction = apm.startTransaction("Update Hero", "Hero");
      transaction.addLabels(forms);
      var click = apm.getCurrentTransaction()
      axios.put(`http://localhost:8080/update/${forms.id}`, forms)
        .then(function (response) {
          // handle success
          getApiData()
          handleClose()
          setForms({
            "name": "",
            "hero": "",
            "year": 0,
            "image": "",
            "star": 1,
            "type": "",
            "description": ""
          })
          if (transaction) transaction.end()
          if (click) click.end()
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    } else {
      transaction = apm.startTransaction("Add Hero", "Hero");
      transaction.addLabels(forms);
      click = apm.getCurrentTransaction()
      axios.post('http://localhost:8080/add', forms)
        .then(function (response) {
          // handle success
          getApiData()
          handleClose()
          setForms({
            "name": "",
            "hero": "",
            "year": 0,
            "image": "",
            "star": 1,
            "type": "",
            "description": ""
          })
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    if (transaction) transaction.end()
    if (click) click.end()
  }

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className="App">
       <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home" style={{color: 'white'}}>Marvel API</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home" style={{color: 'white'}}>Home</Nav.Link> */}
            <Nav.Link href="#link" style={{color: 'white'}} onClick={handleShow}>Criar novo Heroi</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    <Container>
      <Row>
      {list.map((row) => (
        <Col>      
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={row.image} />
            <Card.Body>
              <Card.Title style={{fontFamily: 'Kanit'}}>{row.hero} - {row.name}</Card.Title>
              <Card.Text className='textDescriptionHeros'>
                {row.star} - {row.type} - {row.year}
              </Card.Text>
              <Card.Text className='textDescriptionHeros'>
                {row.description}
              </Card.Text>
              <Button variant="danger" onClick={() => {seeInformations(row)}} >Ver sobre a Heroi</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
      </Row>
    </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar novo Heroi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome </Form.Label>
            <Form.Control name="name" onChange={(e) => handleText(e)} defaultValue={forms.name} type="text" placeholder="Insira um nome" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome do Super Heroi</Form.Label>
            <Form.Control name="hero" onChange={(e) => handleText(e)} defaultValue={forms.hero} type="text" placeholder="Insira o nome do Super Heroi" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ano</Form.Label>
            <Form.Control name="year" onChange={(e) => handleText(e)} defaultValue={forms.year}  type="number" placeholder="Insira o ano de lançamento" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Imagem</Form.Label>
            <Form.Control name="image" onChange={(e) => handleText(e)} defaultValue={forms.image} type="text" placeholder="Insira a URL da imagem do super-heroi" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Estrelas</Form.Label>
            <Form.Select onChange={(e) => handleText(e)} name="star" aria-label="Estrelas" defaultValue={forms.star}>
              <option>Estrelas</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tipo</Form.Label>
            <Form.Select onChange={(e) => handleText(e)} name="type" defaultValue={forms.type} aria-label="Estrelas">
              <option>Tipo</option>
              <option value="serie">Serie</option>
              <option value="filme">Filme</option>
              <option value="hq">HQ</option>
              <option value="game">Game</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descrição</Form.Label>
            <Form.Control name="description" defaultValue={forms.description} as="textarea" onChange={(e) => handleText(e)} rows={3} />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteHero}>
            Delete
          </Button>
          <Button variant="primary"onClick={submitForms} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
