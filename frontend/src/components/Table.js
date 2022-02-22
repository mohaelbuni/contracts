import React from "react";
import axios from "axios";
import { Button, Table as TableBoot, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Aux from "../hoc/_Aux";
import { useSelector } from "react-redux";

function Table({ headData, rowData, userType }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <TableBoot bordered hover>
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
          rowData.map((item, index) => {
            return (
              <Aux key={index+10}>
                {userType === "ADMIN" ? (
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
                            await axios.put(`/contracts/up-data/${item.id}`);
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
                          await axios.delete(`/contracts/up-data/${item.id}`);
                          window.location.reload(true);
                        }}
                      >
                        <i className='fa-solid fa-trash-can'></i>
                      </Button>
                    </td>
                  </tr>
                ) : userType === "INPUTER" ? (
                  <Aux>
                    {userInfo.id === item.inputer?(<Aux>
                      {item.auth_status ? (
                      ""
                    ) : (
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
                          )}
                        </td>
                      </tr>
                    )}
                    </Aux>):''}
                    
                  </Aux>
                ) : (
                  <Aux>
                    {item.auth_status ? (
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
                          <Badge bg='warning'>Read-only</Badge>
                        </td>
                      </tr>
                    ) : ''}
                  </Aux>
                )}
              </Aux>
            );
          })
        )}
      </tbody>
    </TableBoot>
  );
}

export default Table;
