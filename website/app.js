// JavaScript Document
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data)   // this shows the values on the console
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      "Content-Type": "text/plain"
        
      // 'Content-Type': 'application/json',
    },        
    body: JSON.stringify(data) // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}

// TODO-Call Function
postData('/animal', {animal:'lion2'});