import React, { useState } from "react";
function ColorChange(){
    let d="red";
    const [bg,setBg]=useState(d);
    const [name,setName]=useState("click me");
   const bgChange=()=>{
        let newBg="yellow";
        setBg(newBg);
        setName("Ouch");

    }
    const ContentChange=()=>{
        setBg(d);
        setName("Ayyo");
    }
    
    
    return (<><div style={{backgroundColor:bg}}>
    <h1>hi to all</h1><button onClick={bgChange} onDoubleClick={ContentChange}>{name}</button></div></>);
};
export default ColorChange;