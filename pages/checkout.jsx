import { React, useState } from "react";
import { Checkbox, Button } from '@mantine/core';
import CheckoutItem from './components/CheckoutItem.jsx';
import TextField from "@mui/material/TextField";
import List from "./components/List";
import Link from 'next/link';

import { google } from 'googleapis';

export async function getServerSideProps({ query }) {

  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

  const sheets = google.sheets({ version: 'v4', auth });

  const SHEET_ID = "1arZbBuAS1wHhTjAoay7C5oa2DQV9DPBjjXz-vOnWkog";

  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1!A2:A',
  });

  const nameList = response.data.values.flat();
  console.log("Name List: ", nameList);

  const response2 = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1!B2:B',
  });

  const idList = response2.data.values.flat();
  console.log("Idlist: ", idList);

  const response3 = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1!C2:C',
  });

  const avaList = response3.data.values.flat();
  console.log("Avalist: ", avaList);

  let checkoutIds = [];

  for(let i = 0; i<avaList.length; i++){
    if(avaList[i] == "No"){
      checkoutIds.push(idList[i]);
    }
  }
  console.log(checkoutIds);
  return {
    props: {
      nameList,
      idList,
      avaList,
      checkoutIds
    },
  };
}

function checkinItem(checkoutIdList, id){
  alert("Item #{id} checked in");
}

function App({ nameList, idList, avaList, checkoutIds }) {
// not sure why input isn't working, see https://dev.to/salehmubashar/search-bar-in-react-js-545l
  console.log(checkoutIds);
	return (
		<>
      <h1>Item Search</h1>
        <div className="checkoutSearchbar">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search">
          </TextField>
        </div>
      <h1>Checkouts:</h1>
      {checkoutIds.map((v, i) => { //value, index
          return(
            <div className="flexContainer">
                  <div className="image">
                    <img style={{ width: '100px' }} src="./craptop.jpg" alt="laptop" />
                  </div>
                  <div>
                    <h2>{nameList[v-1]}</h2>
                    <p>Item ID: #{idList[v-1]}</p>
                    <p>Avaliable: {avaList[v-1]}</p>
                  </div>
                  <div onClick={() => checkinItem(checkoutIds, idList[v-1])}>
                    <Button>Check in</Button>
                    
                  </div>
                </div>
          )
        })}
      
       <div>
         <CheckoutItem></CheckoutItem>
         <CheckoutItem></CheckoutItem>
       </div>
      <h1>Reservations:</h1>
      <div>
        <CheckoutItem></CheckoutItem>
        <CheckoutItem></CheckoutItem>
      </div>
				<Link href="/">
          <a>
            <Button>Return to index</Button>
          </a>
				</Link>
      
    </>
	);
}

export default App;







/*

import { React, useState } from "react";
import { Checkbox, Button } from '@mantine/core';
import CheckoutItem from './components/CheckoutItem.jsx';
import TextField from "@mui/material/TextField";
import List from "./components/List";
import Link from 'next/link';

function App() {
// not sure why input isn't working, see https://dev.to/salehmubashar/search-bar-in-react-js-545l
	return (
		<>
      <h1>Item Search</h1>
        <div className="checkoutSearchbar">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search">
          </TextField>
        </div>
      <h1>Checkouts:</h1>
       <div>
         <CheckoutItem></CheckoutItem>
         <CheckoutItem></CheckoutItem>
       </div>
      <h1>Reservations:</h1>
      <div>
        <CheckoutItem></CheckoutItem>
        <CheckoutItem></CheckoutItem>
      </div>
				<Link href="/">
          <a>
            <Button>Return to index</Button>
          </a>
				</Link>
      
    </>
	);
}

export default App;




*/