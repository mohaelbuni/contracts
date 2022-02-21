import React from "react";
import ReactPaginate from "react-paginate";

function Pagination({ dataPerPage, totalData, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ReactPaginate
      previousLabel='Previous'
      nextLabel='Next'
      breakLabel='...'
      pageCount={pageNumbers.length}
      marginPagesDisplayed={3}
      pageRangeDisplayed={5}
      onPageChange={(page) => {
        paginate(page.selected + 1);
      }}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
}

export default Pagination;
