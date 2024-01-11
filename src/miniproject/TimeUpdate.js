import React, { useState } from "react";



function UpdateTime() {
    let DateNew = new Date().toLocaleTimeString();
    const [dn, setT] = useState(DateNew);

  

    const GetTime = () => {
        let DateNewTime = new Date().toLocaleTimeString();
        setT(DateNewTime);
    };
    return (<>
        <h1>{dn}</h1>
        <button onClick={GetTime}>Get Time</button></>);
}
export default UpdateTime;