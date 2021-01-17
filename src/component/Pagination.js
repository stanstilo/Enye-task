// import React from 'react';



//  export default function TablePaginationDemo() {
//   const [page, setPage] = React.useState(2);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [row, setRow] = React.useState({
//       page:0,
//       rowsPerPage:20
//   }) 

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <TablePagination
//       component="div"
//       count={100}
//       page={row.page}
//       onChangePage={handleChangePage}
//       rowsPerPage={row.rowsPerPage}
//       onChangeRowsPerPage={handleChangeRowsPerPage}
//     />
//   );
// }
