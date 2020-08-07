import React, { Fragment, useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';

import stairs from './../assets/stairs.png';
import spiral from './../assets/spiral.png';
import garden from './../assets/garden.png';
const serverURL = process.env.REACT_APP_SERVER_URL;

const Customers = () => {
  const [ data, setData] = useState([]);
  const [ name, setName ] = useState("");
  const [ age, setAge ] = useState("");
  const [ country, setCountry ] = useState("");
  const [ stair, setStair ] = useState("");

  // used to reload the component automatically
  const filterData = (oldID) => setData(data.filter(x => x.id !== oldID));
  const addData = () => setData([...data,  {name, country, age, stair}]);

  const removeCustomer = (id) => {
    const payload = {id};
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    }

    fetch(serverURL + "remove", options)
      .then(resp => resp.json())
      .then(json => console.log(json));

    filterData(id);
  }

  const addToDatabase = () => {
    let stair_id = "";
    if (stair === "straight") {
      stair_id = 1;
    }
    else if(stair === "curved") {
      stair_id = 2;
    }
    else if(stair === "outdoor") {
      stair_id = 3;
    }

    const payload = {name, country, age, stair_id};
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    }

    fetch(serverURL + "add", options)
      .then(resp => resp.json())
      .then(json => console.log(json));
    
    addData();
    setName("");
    setAge("");
    setCountry("");
    setStair("");
  }

  useEffect(() => {
    fetch(serverURL + 'get_all')
      .then(resp => resp.json())
      .then(resp => {
        let temp = [];
        resp.map(c => temp.push(c));
        setData(temp);
    });
  }, [data.length]);

  return (
    <Fragment>
    <div style={{marginBottom: "30px"}}>
      <h1 style={{color:"#3f51b5"}}>Add New Customer</h1>
    </div>
    <TextField 
      style={{margin: "3px"}}
      required
      label="Name" 
      variant="outlined" 
      fullWidth={false} 
      onChange={(e) => setName(e.target.value)}
      value={name}
      />
    <TextField 
      style={{margin: "3px"}}
      required
      label="Age" 
      variant="outlined" 
      fullWidth={false} 
      onChange={(e) => setAge(e.target.value)}
      value={age}
      />
    <TextField 
      style={{margin: "3px"}}
      required
      label="Country"
      variant="outlined" 
      fullWidth={false} 
      onChange={(e) => setCountry(e.target.value)}
      value={country}
      />
    <TextField 
      style={{margin: "3px"}}
      label="straight/curved/outdoor" 
      variant="outlined" 
      fullWidth={false}
      onChange={(e) => setStair(e.target.value)}
      value={stair}
      />
      <br/><br/>
      <Button onClick={addToDatabase} color="primary" size="large" variant="contained"> Add</Button>
      <br/><br/>
    {
      data.map((cust, key) =>  {
        return (
          <Fragment key={key}>
            <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <Button 
                  onClick={() => removeCustomer(cust.id)}
                  style={{height:"50px", marginTop:"2px"}} 
                  color="secondary" 
                  size="large" 
                  variant="contained"> 
                  Remove
              </Button>
            </Grid>
            <Grid 
              item
              xs={5}
              style={{
              border: "solid", 
              borderWidth:"1px",
              borderRadius: "4px",
              color: "grey",
              margin: "2px auto",
              maxWidth:"500px",
              minWidth:"400px",
              justifyContent:"left",
              textAlign:"left"
              }}>
              <p style={{color:"black", marginLeft:"20px"}} key={key}>
              Customer:  {cust.name},  {cust.age},  {cust.country}  {cust.stair_id === 1 ? <img alt="straight stairlift"  style={{marginLeft:"3px", height:"20px"}} src={stairs} /> : null} 
              {cust.stair_id === 2 ? <img alt="curved stairlift" style={{marginLeft:"3px", height:"20px"}} src={spiral} /> : null} 
              {cust.stair_id === 3 ? <img alt="outdoor stairlift" style={{marginLeft:"3px", height:"20px"}} src={garden} /> : null} 
              </p>
            </Grid>
            <Grid item xs={3}></Grid>
            </Grid>
          </Fragment>
        )
        }
      )
    }
    </Fragment>
  );
}
 
export default Customers;