// import React from "react";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";

// import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { MenuItem } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Body() {
  const yearList = [
    {
      batch: "2019",
    },
    {
      batch: "2018",
    },
    {
      batch: "2020",
    },
  ];
  const branchList = [
    {
      batch: "CSE",
    },
    {
      batch: "ECE",
    },
    {
      batch: "EEE",
    },
  ];
  const [year, setYear] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [data, setData] = React.useState([]);
  const handleFetch = async () => {
    try {
      let req = await axios({
        url: "http://localhost:8080/post/mongo/get-data",
        method: "POST",
        data: {
          secretKey:
            "$2b$10$RpR8ir7VD/kY3lv2tdIcBes8OIhPCJQFdSEtn1lDtOJSA87XBAWOa",
          modelName: "newUserModel",
          searchParameters: {
            batch: year,
            branch: branch,
          },
        },
      });
      console.log(req.data);
      setData(req.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <div
        className="flex justify-center align-center h-100 "
        style={
          {
            // flexDirection: "column",
          }
        }
      >
        <div className="flex-4" />
        <div className="middleBox">
          <div className="my-18 my-18 flex justify-between align-center">
            {/* <Select value={year} onChange={(e) => setYear(e.target.value)}> */}
            <span className="select-labels">Batch </span>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {yearList.map((item, itemIndex) => {
                return (
                  <option value={item.batch} key={item.batch}>
                    {item.batch}
                  </option>
                );
              })}
              {/* </Select> */}
            </select>
          </div>
          <div className="my-18 flex justify-between align-center h-100">
            <span className="select-labels"> Branch </span>
            <select value={branch} onChange={(e) => setBranch(e.target.value)}>
              {branchList.map((item, itemIndex) => {
                return (
                  <option value={item.batch} key={item.batch}>
                    {item.batch}
                  </option>
                );
              })}
              {/* </Select> */}
            </select>
          </div>
          <div className="justify-center align-center flex">
            <button className="button" onClick={handleFetch}>
              SUBMIT
            </button>
          </div>
        </div>
        <div className="flex-6" />
      </div>
      {rows ? (
        <div>
          <div className="flex justify-center">
            <div className="table-heads">Roll No</div>
            <div className="table-heads w-150">Name</div>
          </div>
          <div>
            {data.map((item, itemIndex) => {
              return (
                <div className="flex justify-center" key={item.rollno}>
                  <div className="table-heads-members">{item.rollno}</div>
                  <div className="table-heads-members w-150">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Body;
