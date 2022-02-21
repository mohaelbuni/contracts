import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { useSelector } from "react-redux";
import Aux from "../hoc/_Aux/index";
import axios from "axios";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";

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
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  useEffect(() => {
    async function fetchBranches() {
      const { data } = await axios.get("/contracts/up-data/");
      setData(data);
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
    data.append("type", formData.type);
    data.append("description", formData.description);
    data.append("contract_with", formData.contract_with);
    data.append("inputer", userInfo.id);
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
  const TableHeadData = [
    "#",
    "Title",
    "Vendor",
    "Inputer",
    "State",
    "End Date",
    "Actions",
  ];

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
              <Table headData={TableHeadData} rowData={currentData} />
              <Pagination
                dataPerPage={dataPerPage}
                totalData={data.length}
                paginate={paginate}
              />
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
          <Card.Text className='text-center'></Card.Text>
        </Card.Body>
      </Card>
    </Aux>
  );
}

export default ContractScreen;
