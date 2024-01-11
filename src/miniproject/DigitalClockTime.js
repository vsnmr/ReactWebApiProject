import React, { useState } from "react";

function ClockTime(){
let clkTime=new Date().toLocaleTimeString();
const[ctime,setCtime]=useState(clkTime);

const setClock=()=>{
    const newtime=new Date().toLocaleTimeString();
    setCtime(newtime);
};
setInterval(setClock,1000);

    return(<>
    <h1 className="heading">{ctime}</h1>
{/* <button onclick={setClock}>gettime</button> */}

    </>);
}
export default ClockTime;