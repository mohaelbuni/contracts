import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
// import { useSelector } from "react-redux";
import Aux from "../hoc/_Aux/index";
import axios from "axios";
import { Card, Button, Row, Col, Modal, Form, Dropdown } from "react-bootstrap";

function Users() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    username: "",
    user_type: "INPUTER",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  useEffect(() => {
    async function fetchBranches() {
      const { data } = await axios.get("/users/up-user/");
      setData(data);
    }
    fetchBranches();
  }, []);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      `/users/register/`,
      {
        username: formData.username,
        user_type: formData.user_type,
        password: formData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    updateFormData(initialFormData);
    setShow(false);
    navigate("/users");
    window.location.reload(true);
  };
  const TableHeadData = ["#", "Username", "User Type", "State", "Actions"];

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
              <Card.Title>Users</Card.Title>
            </Col>
            <Col xs={7}></Col>
            <Col>
              <Button className='ms-5' onClick={handleShow}>
                Add User
              </Button>
            </Col>
          </Row>
          <Row className='my-2'>
            <Col>
              <UserTable headData={TableHeadData} rowData={currentData} />
              <Pagination
                dataPerPage={dataPerPage}
                totalData={data.length}
                paginate={paginate}
              />
            </Col>
          </Row>

          <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body className='ml-5'>
              <Form>
                <Row>
                  <Col></Col>
                  <Col xs={8}>
                    <Form.Group className='mb-3' controlId='Username'>
                      <Form.Control
                        type='text'
                        name='username'
                        placeholder='Username'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col></Col>
                </Row>

                <Row>
                  <Col></Col>
                  <Col xs={8}>
                    <Form.Group className='mb-3' controlId='Password'>
                      <Form.Control
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col></Col>
                </Row>
                <Row className='text-center py-3'>
                  <Dropdown>
                    <Dropdown.Toggle variant='success' id='dropdown-basic'>
                      {formData.user_type}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href='#/action-1'
                        onClick={(e) => {
                          e.preventDefault();
                          updateFormData({
                            ...formData,
                            user_type: "ADMIN",
                          });
                        }}
                      >
                        ADMIN
                      </Dropdown.Item>
                      <Dropdown.Item
                        href='#/action-2'
                        onClick={(e) => {
                          e.preventDefault();
                          updateFormData({
                            ...formData,
                            user_type: "INPUTER",
                          });
                        }}
                      >
                        INPUTER
                      </Dropdown.Item>
                      <Dropdown.Item
                        href='#/action-2'
                        onClick={(e) => {
                          e.preventDefault();
                          updateFormData({
                            ...formData,
                            user_type: "VIEWER",
                          });
                        }}
                      >
                        VIEWER
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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

export default Users;
