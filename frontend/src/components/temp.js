import React, { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import Aux from "../hoc/_Aux/index";
import axios from "axios";
import {
  Card,
  Button,
  Row,
  Col,
  Table,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function ContractScreen() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    title: "",
    contract_number: "",
    vendor: "",
    image: "",
    start_date: "",
    end_date: "",
    duration: "",
    renewble: false,
    renewal_duration: "",
    cost: "",
    auth_status: false,
    type: "",
    description: "",
    contract_with: "",
    inputer: "",
    authorizor: null,
    department: [],
  });

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [formData, updateFormData] = useState(initialFormData);
  const [uploadImage, setUploadImage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchBranches() {
      const { data } = await axios.get("/contracts/up-data/");
      setData(data);
      console.log(data);
    }
    fetchBranches();
  }, []);

  const handleChange = (e) => {
    if ([e.target.name] == "image") {
      setUploadImage({
        image: e.target.files[0],
      });
    } else if ([e.target.name] == "renewble") {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      });
    } else {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("title", formData.title);
    data.append("contract_number", formData.contract_number);
    data.append("image", uploadImage.image, uploadImage.image.name);
    data.append("vendor", formData.vendor);
    data.append("start_date", formData.start_date);
    data.append("end_date", formData.end_date);
    data.append("duration", formData.duration);
    data.append("renewble", formData.renewble);
    data.append("renewal_duration", formData.renewal_duration);
    data.append("cost", formData.cost);
    // data.append("auth_status",formData.auth_status );
    data.append("type", formData.type);
    data.append("description", formData.description);
    data.append("contract_with", formData.contract_with);
    data.append("inputer", userInfo.id);
    // data.append("authorizor",formData.authorizor );
    data.append("department", JSON.stringify([2, 1]));
    console.log({ data, formData, uploadImage });

    await axios.post(
      `/contracts/up-data/`,
      data
      // config
    );
    updateFormData(initialFormData);
    setShow(false);
    navigate("/contracts");
    window.location.reload(true);
  };

  return (
    <Aux>
      <Card>
        <Card.Body>
          <Row>
            <Col className='text-center pt-3'>
              <Card.Title>Contracts</Card.Title>
            </Col>
            <Col xs={7}></Col>
            <Col>
              <Button className='ms-5' onClick={handleShow}>
                Add Contract
              </Button>
            </Col>
          </Row>
          <Row className='my-2'>
            <Col>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Vendor</th>
                    <th>Inputer</th>
                    <th>state</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data === null ? (
                    <Loader />
                  ) : (
                    data.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <th scope='row'>
                            <Link to='/contract-details' state={item}>
                              {index + 1}
                            </Link>
                          </th>
                          <td>
                            <Link to='/contract-details' state={item}>
                              {item.title}
                            </Link>
                          </td>
                          <td>{item.vendor}</td>
                          <td>{item.inputer_name}</td>
                          <td>
                            {item.auth_status ? (
                              <Badge bg='info'>authorized</Badge>
                            ) : (
                              <Badge bg='danger'>need auth</Badge>
                            )}
                          </td>
                          <td>{item.end_date}</td>
                          <td className='text-center'>
                            {item.auth_status ? (
                              ""
                            ) : (
                              <Button
                                variant='success'
                                className='action-btn mx-2 p-2'
                                onClick={async (e) => {
                                  await axios.put(
                                    `/contracts/up-data/${item.id}`
                                  );
                                  window.location.reload(true);
                                }}
                              >
                                <i className='fa-solid fa-check'></i>
                              </Button>
                            )}

                            <Button
                              variant='danger'
                              className='action-btn mx-2 p-2'
                              onClick={async () => {
                                await axios.delete(
                                  `/contracts/up-data/${item.id}`
                                );
                                window.location.reload(true);
                              }}
                            >
                              <i className='fa-solid fa-trash-can'></i>
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group className='mb-3' controlId='titleId'>
                      <Form.Control
                        type='text'
                        name='title'
                        placeholder='Title'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className='mb-3' controlId='ContractNumber'>
                      <Form.Control
                        type='text'
                        name='contract_number'
                        placeholder='Contract Number'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Form.Group className='mb-3' controlId='Vendor'>
                      <Form.Control
                        type='text'
                        name='vendor'
                        placeholder='Vendor'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <input
                      className='form-control'
                      accept='image/*'
                      id='upload-contract-image'
                      onChange={handleChange}
                      name='image'
                      type='file'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Form.Group className='mb-3' controlId='StartDate'>
                      <Form.Control
                        type='date'
                        name='start_date'
                        placeholder='Start Date'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className='mb-3' controlId='EndDate'>
                      <Form.Control
                        type='date'
                        name='end_date'
                        placeholder='End Date'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={6}>
                    <Form.Group className='mb-3' controlId='Cost'>
                      <Form.Control
                        type='text'
                        name='cost'
                        placeholder='Cost'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className='mb-3' controlId='Duration'>
                      <Form.Control
                        type='text'
                        name='duration'
                        placeholder='Duration'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className='mb-3' controlId='RenewalDuration'>
                      <Form.Control
                        type='text'
                        name='renewal_duration'
                        placeholder='Renewal Duration'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className='mb-3' controlId='ContractType'>
                      <Form.Control
                        type='text'
                        name='type'
                        placeholder='Contract Type'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className='mb-3' controlId='ContractWith'>
                      <Form.Control
                        type='text'
                        name='contract_with'
                        placeholder='Contract with'
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                      <Form.Check
                        type='checkbox'
                        name='renewble'
                        label='Renewble'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className='mb-3' controlId='Description'>
                      <Form.Control
                        as='textarea'
                        name='description'
                        placeholder='Description'
                        style={{ height: "140px" }}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' onClick={handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Aux>
  );
}

export default ContractScreen;
