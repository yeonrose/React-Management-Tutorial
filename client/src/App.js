import React from "react";
import Customer from "./components/Customer";
import "./App.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const theme = createTheme(); 

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3), 
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
}));

const customers = [
  {
    id: 1,
    image: "https://placehold.co/100x100",
    name: "동빈나",
    birthday: "961222",
    gender: "남자",
    job: "대학생",
  },
  {
    id: 2,
    image: "https://placehold.co/100x100",
    name: "이순신",
    birthday: "961222",
    gender: "남자",
    job: "디자이너",
  },
  {
    id: 3,
    image: "https://placehold.co/100x100",
    name: "홍길동",
    birthday: "961222",
    gender: "남자",
    job: "대학생",
  },
];

function App() {
  const classes = useStyles(); 

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((c) => (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
