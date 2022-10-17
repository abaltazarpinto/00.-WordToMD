import React, { useEffect, useState } from "react";
import MDEditor from '@uiw/react-md-editor';


export default function Markdown() {

  const file_name = 'markdown.md';

//----- STATES -----------
  
  const [value, setValue] = useState("");
  
//----- IMPORT THE MARKDOWN FILE -------
  
   useEffect (() => {
     
     import(`../../../../../public/${file_name}`)
     .then(res => {
       fetch(res.default)
         .then(res => res.text())
        
         //.then(res => console.log(res))
         .then(res => setValue(res))
     })
     .catch(err => console.log(err));

   },[]); 
   

  return (
    <div>
      <div className="container">

      <MDEditor

        value={value}
        onChange={setValue}
        
      />
        </div>
    </div>
  );
}







