import React from "react";
import axios from "axios";
import {useSelector} from 'react-redux'
import { Button, Table, Badge } from "react-bootstrap";
// import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import Aux from "../hoc/_Aux";

function UserTable({ headData, rowData }) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
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
                  <Aux key={index+2}>
                      {item.username === userInfo.username ? '':(<Aux>{item.is_superuser?(<Aux>
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
                      </Aux>):(<Aux>
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
                    {item.is_active ? (
                      <Button
                        variant='primary'
                        className='action-btn mx-2 p-2'
                        onClick={async (e) => {
                          await axios.put(`/users/up-user/${item.id}`);
                          window.location.reload(true);
                        }}
                      >
                        <i className="fa-solid fa-ban"></i>
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
                      </Aux>)}</Aux>) }
       
                  </Aux>
 
              );
            })}
          </Aux>
        )}
      </tbody>
    </Table>
  );
}

export default UserTable;
