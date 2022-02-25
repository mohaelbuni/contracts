import { useLocation } from "react-router-dom";
import React, { useState} from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
// import {ReactPDF} from 'react-pdf'
import { Document, Page, pdfjs } from "react-pdf";
// import test from '../1.2.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

function ContractDetails() {
  const [show, setShow] = useState("none");

  const location = useLocation();
  const data = location.state;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

  return (
    <Card>
      <Card.Title as='h1' className='text-center m-2'>
        {data.title}
      </Card.Title>
      <Card.Body>
        <h6 onClick={()=>{
          if(show === 'none'){
            setShow('block')
            window.location.reload(true)
          }else{
            setShow('none')
          }
        }}>Show PDF</h6>
      <div className="Example__container__document" style={{display:`${show}`}}>
      <Document file={{
        url:`http://localhost:8000${data.pdf}`
      }} onLoadSuccess={onDocumentLoadSuccess} options={options}>
              <Page pageNumber={pageNumber} />
          </Document>
          <Row className="text-center">
            <Col ms={5}></Col>
          <Col className="text-end">          
          <Button className="pdf-btn" onClick={()=>{
            if(pageNumber-1<1){
            }else{
              setPageNumber(pageNumber-1)
            }
          }}>Previous</Button></Col>
          <Col className="text-start">   
          <Button className="pdf-btn" onClick={()=>{
            if(pageNumber+1>numPages){
            }else{
              setPageNumber(pageNumber+1)
            }
          }}>Next</Button></Col>
          <Col ms={5}></Col>
          </Row>
          </div>
      <h4>To download a contract PDF! - <a href={`http://localhost:8000${data.pdf}`}>Click Here. </a></h4>
        <Row>
          <Col>
            <h5 className='ms-1 mt-2'>Contract Description:</h5>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col className='me-5'>
            <p>{data.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className='ms-1 mt-2'>Contract Details:</h5>
          </Col>
        </Row>
        <Row>
          <Col>Contract Title:</Col>
          <Col>{data.title}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>Contract Number:</Col>
          <Col>{data.contract_number}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>Vendor:</Col>
          <Col>{data.vendor}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>Start Date:</Col>
          <Col>{data.start_date}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>End Date:</Col>
          <Col>{data.end_date}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>Contract Type:</Col>
          <Col>{data.type}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>Contract Duration:</Col>
          <Col>{data.duration}</Col>
          <Col></Col>
        </Row>

        <Row>
          <Col>Renewal Duration:</Col>
          <Col>{data.renewal_duration}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>Renewble:</Col>
          <Col>
            {data.renewble ? (
              <i className='fa-solid fa-circle-check check-color p-2'></i>
            ) : (
              <i className='fa-solid fa-circle-xmark xmark-color p-2'></i>
            )}
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>Cost:</Col>
          <Col>{data.cost} LYD</Col>
          <Col></Col>
        </Row>

      </Card.Body>
    </Card>
  );
}

export default ContractDetails;
