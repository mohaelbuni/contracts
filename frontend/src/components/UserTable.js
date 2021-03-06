import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Button,
  Table,
  Badge,
  Modal,
  Row,
  Col,
  Form,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import Aux from "../hoc/_Aux";

function UserTable({ headData, rowData }) {
  const navigate = useNavigate();
  const initialFormData = { user_type: "", id: "" };
  const [formData, updateFormData] = useState(initialFormData);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    updateFormData({
      ...formData,
      id: id,
    });
    setShow(true);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSubmit = async (e) => {
    await axios.put(`/users/up-user-type/`, formData);
    updateFormData(initialFormData);
    setShow(false);
    navigate("/users");
    window.location.reload(true);
  };

  return (
    <Table bordered hover>
      <thead>
        <tr>
          {headData.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowData === null ? (
          <Loader />
        ) : (
          <Aux>
            {rowData.map((item, index) => {
              return (
                <Aux key={index + 2}>
                  {item.username === userInfo.username ? (
                    ""
                  ) : (
                    <Aux>
                      {item.is_superuser ? (
                        <tr key={item.id}>
                          <th scope='row'>{index + 1}</th>
                          <td>{item.username}</td>
                          <td>{item.user_type}</td>
                          <td>
                            {item.is_active ? (
                              <Badge bg='info'>active</Badge>
                            ) : (
                              <Badge bg='danger'>stoped</Badge>
                            )}
                          </td>
                          <td className='text-center'>
                            <Badge bg='warning'>Superuser</Badge>
                          </td>
                        </tr>
                      ) : (
                        <tr key={item.id}>
                          <th scope='row'>{index + 1}</th>
                          <td>{item.username}</td>
                          <td className='text-center'>
                            <Row>
                              <Col>{item.user_type}</Col>
                              <Col>
                                <Button
                                  className='action-btn mx-2 p-2'
                                  onClick={() => {
                                    handleShow(item.id);
                                  }}
                                >
                                  <i className='fa-solid fa-user-pen'></i>
                                </Button>
                              </Col>
                            </Row>
                          </td>
                          <td>
                            {item.is_active ? (
                              <Badge bg='info'>active</Badge>
                            ) : (
                              <Badge bg='danger'>stoped</Badge>
                            )}
                          </td>
                          <td className='text-center'>
                            {item.is_active ? (
                              <Button
                                variant='primary'
                                className='action-btn mx-2 p-2'
                                onClick={async (e) => {
                                  await axios.put(`/users/up-user/${item.id}`);
                                  window.location.reload(true);
                                }}
                              >
                                <i className='fa-solid fa-ban'></i>
                              </Button>
                            ) : (
                              <Button
                                variant='success'
                                className='action-btn mx-2 p-2'
                                onClick={async (e) => {
                                  await axios.put(`/users/up-user/${item.id}`);
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
                                await axios.delete(`/users/up-user/${item.id}`);
                                window.location.reload(true);
                              }}
                            >
                              <i className='fa-solid fa-trash-can'></i>
                            </Button>
                          </td>
                        </tr>
                      )}
                    </Aux>
                  )}
                </Aux>
              );
            })}
          </Aux>
        )}
        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Change User Type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className='text-center'>
                <h5>Choose User Type</h5>
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
      </tbody>
    </Table>
  );
}

export default UserTable;
