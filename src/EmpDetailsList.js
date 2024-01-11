
import {useEffect,useState} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'


const EmpDetailsList=()=>{
   
    const [empData,empDatachage]=useState([]);
    const _url = 'https://localhost:44360/api/Employee/';
    useEffect(()=>{
        fetch(_url).then((res)=>{
            return res.json();
        }).then((resp)=>{
            empDatachage(resp);
        }).catch((err)=>{
            console.log(err.message);
        })      
        
    },[]);
    return (
        <>
        <Container>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>

                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Extension</th>
                    <th>DOB</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Pincode</th>
                    <th>Password</th>
                    <th>City</th>

                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                        {
                            empData && empData.length > 0 ? empData.map((item, index) => {
                                return (<>

                                    <tr key={index}>

                                        {/* <td>{item.employeeId}</td>
                                <td>{item.employeeFirstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.gender}</td>
                                <td>{item.extension}</td>
                                */}
                                        <td>{item.employeeId}</td>
                                        <td>{item.employeeFirstName}</td>
                                        <td>{item.employeeLastName}</td>
                                        <td>{item.employeExtension}</td>
                                        <td>{item.employeeDob}</td>
                                        <td>{item.employeeEmail}</td>
                                        <td>{item.employeeGender}</td>

                                        <td>{item.employeeAddress}</td>
                                        <td>{item.employeepincode}</td>
                                        <td>{item.employeePassword}</td>
                                        <td>{item.employeeCity}</td>
                                        <td colSpan={2}><button className="btn btn-primary">Edit</button>
                                            &nbsp;&nbsp;<button className="btn btn-danger" >Delete</button>{''}</td>
                                    </tr>
                                </>)
                            })
                                : 'Loading......'
                        }


                    </tbody>
             
        </Table>
        </Container>
        </>
    );


}
export default EmpDetailsList;