import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';

// // challenge #1 Movies List
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//  <React.Fragment><h1>Movies </h1>
//  <p>Movies Telugu list </p>
//  <ol><li>Skanda</li> <li>Akandaa</li> <li>Mad</li></ol></React.Fragment>);

//Challenge #2 heading along eith current date and time need to publish
// const fName="Shiva Goud";
// const lName="Vangala";
// var currentDate=new Date().toLocaleDateString();
// var currentTime=new Date().toLocaleTimeString();

// ReactDOM.render(<><h1>Heloo My Name is {`${fName} ${lName}` }</h1>
// <p>Today's date is {currentDate}</p>
// <p>current time is {currentTime}</p>
// </>,document.getElementById('root'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
<App/>

</>
);
//ReactDOM.render(<App/>,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();



