import React, { Component } from "react";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import "./App.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import  CircularProgress from "@mui/material/CircularProgress";
import { makeStyles, withStyles } from "@mui/styles";




const styles = theme => ({
  root : {
    width: '100%',
    marginTop : theme.spacing(3),
    overflowX : "auto"
  },
  table : {
    minWidth : 1080
  },
  progress : {
    margin: theme.spacing(2)
  }

})


class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      customers : [],
      completed:0
    }
  }
  
  stateRefresh = () =>{
    this.setState({
      customers: [],
      completed : 0
    });
    this.callApi()
    .then(res => {
      this.setState({ customers: res.rows }); 
     })
    .catch(err => console.log(err));
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => {
      this.setState({ customers: res.rows }); 
     })
    .catch(err => console.log(err));
  }

  callApi = async () =>{
    const response = await fetch('/api/customers');
    const body = await response.json();

    return body;
  }

  progress = () =>{
    const { completed } = this.state;
    this.setState({ completed : completed >= 100 ? 0 : completed + 1 });
  }

  render() {
    const { classes } = this.props; 
    return (
      <div>
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
                <TableCell>설정정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers.length >0 ? this.state.customers.map((c) => (
                <Customer
                  stateRefresh={this.stateRefresh}
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                />
              )):
                <TableRow>
                  <TableCell colSpan="6" align="center">
                      <CircularProgress className={classes.progress} variant="indeterminate" value={this.state.completed} />
                    </TableCell>  
                </TableRow>
                
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
