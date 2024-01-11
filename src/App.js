import logo from './logo.svg';
import './App.css';
import EmpCrud from './EmployeeCrud';
import EmpDetailsList from './EmpDetailsList';
import EmpCreate from './EmpCreate';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Crud from './Crud'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
    <h1>Crud operations</h1>

    <Crud name="Employee"/>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpDetailsList />}/>
          <Route path='/employeeCreate' element={<EmpCreate />}/>
          <Route path='/employeeEdit' element={<EmpEdit />}/>

         
        </Routes>

      </BrowserRouter> */}

    </div>
  );

}

export default App;
