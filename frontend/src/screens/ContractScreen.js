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
    pdf: "",
    start_date: "",
    end_date: "",
    duration: "",
    renewble: "",
    renewal_duration: "",
    cost: "",
    type: "",
    description: "",
    contract_with: "",
    inputer: "",
    department: '',
  });

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [formData, updateFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [uploadPdf, setUploadPdf] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/contracts/up-data/");
      setData(data);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    if ([e.target.name] == "pdf") {
      setUploadPdf({
        pdf: e.target.files[0],
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

  const validate=()=>{
    let temp = {}
        temp.title= formData.title ? '' : 'This field is required.'
        temp.contract_number= Number.isInteger(parseInt(formData.contract_number)) ? '' : 'This field is required.'
        temp.vendor= formData.vendor ? '' : 'This field is required.'
        temp.start_date= formData.start_date ? '' : 'This field is required.'
        temp.end_date= formData.end_date ? '' : 'This field is required.'
        temp.duration= Number.isInteger(parseInt(formData.duration)) ? '' : 'This field is required.'
        temp.cost= Number.isInteger(parseInt(formData.cost)) ? '' : 'This field is required.'
        temp.renewal_duration= Number.isInteger(parseInt(formData.renewal_duration)) ? '' : 'This field is required.'
        temp.contract_with= formData.contract_with ? '' : 'This field is required.'
        temp.type= formData.type ? '' : 'This field is required.'
        temp.pdf= uploadPdf ? '' : 'This field accept only pdf files.'

    setErrors({ ...temp})
    return Object.values(temp).every(x => x === '')
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    console.log(validate())
    if(validate()){
      let data = new FormData();
      data.append("title", formData.title);
      data.append("contract_number", formData.contract_number);
      data.append("pdf", uploadPdf.pdf, uploadPdf.pdf.name);
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
 
      const fetchData = async ()=>{
        await axios.post(
          `/contracts/up-data/`,
          data
          // config
        );
      }
      fetchData()

      updateFormData(initialFormData);
      setShow(false);
      navigate("/contracts");
      window.location.reload(true);
    }
     

  
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
          {userInfo.user_type === "ADMIN" ? (
            <Aux>
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
                  <Table
                    headData={TableHeadData}
                    userType={userInfo.user_type}
                    rowData={currentData}
                  />
                  <Pagination
                    dataPerPage={dataPerPage}
                    totalData={data.length}
                    paginate={paginate}
                  />
                </Col>
              </Row>
            </Aux>
          ) : userInfo.user_type === "INPUTER" ? (
            <Aux>
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
                  <Table
                    headData={TableHeadData}
                    userType={userInfo.user_type}
                    rowData={currentData}
                  />
                  <Pagination
                    dataPerPage={dataPerPage}
                    totalData={data.length}
                    paginate={paginate}
                  />
                </Col>
              </Row>
            </Aux>
          ) : (
            <Aux>
              <Row>
                <Col className='text-center pt-3'>
                  <Card.Title>Contracts</Card.Title>
                </Col>
              </Row>
              <Row className='my-2'>
                <Col>
                  <Table
                    headData={TableHeadData}
                    userType={userInfo.user_type}
                    rowData={currentData}
                  />
                  <Pagination
                    dataPerPage={dataPerPage}
                    totalData={data.length}
                    paginate={paginate}
                  />
                </Col>
              </Row>
            </Aux>
          )}

          <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
              <Modal.Title>Add Contract</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group className='mb-3' controlId='titleId'>
                      <Form.Control
                        isInvalid={errors.title && true}
                        type='text'
                        name='title'
                        placeholder='Title'
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please choose a Title.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className='mb-3' controlId='ContractNumber'>
                      <Form.Control
                        isInvalid={errors.contract_number && true}
                        type='text'
                        name='contract_number'
                        placeholder='Contract Number'
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Contract number is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Form.Group className='mb-3' controlId='Vendor'>
                      <Form.Control
                      isInvalid={errors.vendor && true}
                        type='text'
                        name='vendor'
                        placeholder='Vendor'
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Vendor is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group>
                    <Form.Control
                      isInvalid={errors.pdf && true}
                      // accept='image/*'
                      id='upload-contract-pdf'
                      onChange={handleChange}
                      name='pdf'
                      type='file'
                    />
                    <Form.Control.Feedback type='invalid'>
                        Upload image is required.
                    </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Form.Group className='mb-3' controlId='StartDate'>
                      <Form.Control
                      isInvalid={errors.start_date && true}
                        type='date'
                        name='start_date'
                        placeholder='Start Date'
                        onChange={handleChange}
                      />
                    <Form.Control.Feedback type='invalid'>
                        Start Date is required.
                    </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className='mb-3' controlId='EndDate'>
                      <Form.Control
                      isInvalid={errors.end_date && true}
                        type='date'
                        name='end_date'
                        placeholder='End Date'
                        onChange={handleChange}
                      />
                    <Form.Control.Feedback type='invalid'>
                        End Date is required.
                    </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={6}>
                    <Form.Group className='mb-3' controlId='Cost'>
                      <Form.Control
                      isInvalid={errors.cost && true}
                        type='text'
                        name='cost'
                        placeholder='Cost'
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Start Date is integer and required.
                    </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className='mb-3' controlId='Duration'>
                      <Form.Control
                      isInvalid={errors.duration && true}
                        type='text'
                        name='duration'
                        placeholder='Duration'
                        onChange={handleChange}
                      />
                    <Form.Control.Feedback type='invalid'>
                        duration is integer and required.
                    </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className='mb-3' controlId='RenewalDuration'>
                      <Form.Control
                      isInvalid={errors.renewal_duration && true}
                        type='text'
                        name='renewal_duration'
                        placeholder='Renewal Duration'
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Renewal duration is integer and required.
                    </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className='mb-3' controlId='ContractType'>
                      <Form.Control
                      isInvalid={errors.type && true}
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
                      isInvalid={errors.contract_with && true}
                        type='text'
                        name='contract_with'
                        placeholder='Contract with'
                        onChange={handleChange}
                      />
                    <Form.Control.Feedback type='invalid'>
                        Contract with is required.
                    </Form.Control.Feedback>
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
