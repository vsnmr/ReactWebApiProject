import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';

import axios from 'axios';
//import Button from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CryptoJS from "crypto-js";



import 'bootstrap/dist/css/bootstrap.min.css';

const Crud = () => {

    const employeData = 'https://localhost:44360/api/Employee/';

    // const empData = [
    //     {
    //         id: 1,
    //         firstName: "shiva",
    //         lastName: "Vangala",
    //         extension: "2039",
    //         gender: "male",
    //         email: "vsnmrogud@gmail.com",

    //     },
    //     {
    //         id: 2,
    //         firstName: "sriram",
    //         lastName: "gudida",
    //         extension: "2029",
    //         gender: "male",
    //         email: "sriramgoud@gmail.com",

    //     },
    //     {
    //         id: 3,
    //         firstName: "shiva",
    //         lastName: "vanga",
    //         extension: "2039",
    //         gender: "male",
    //         email: "vangasiva@gmail.com",

    //     }
    // ]
    
    const [data, setData] = useState([]);

    const [show, setShow] = useState(false);

    const [formData, fullFormData] = useState({
        fName: '',
        lName: '',
        email: '',
        dob: '',
        gender: '',
        password: '',
        city: '',
        pincode: ''
    });
    const [empId,setEmpId]=useState();


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //to get details from url
    const fetchData = () => {
        axios.get(employeData).then(res => {
            setData(res.data);
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchData();

    }, []);

    // to encrypt data  in url   
    const encryptData = () => {
        // Convert the data to a JSON string
        const jsonData = JSON.stringify(formData);

        // Encrypt the JSON string using CryptoJS
        const encryptedData = CryptoJS.AES.encrypt(jsonData, 'secret_key').toString();

        return encodeURIComponent(encryptedData);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.fName === '' || formData.lName === '' || formData.email === '' || formData.dob === '' || formData.city === '' || formData.password === '' || formData.gender === '' || formData.pincode === '') {
            alert('Please fill in all fields');
            return;
        };

        var dt = new FormData();
        dt.append('EmployeeFirstName', formData.fName);
        dt.append('EmployeeLastName', formData.lName);
        dt.append('EmployeeDob', formData.dob);
        dt.append('EmployeeEmail', formData.email);
        dt.append('EmployeeGender', formData.gender);
        dt.append('Employeepincode', formData.pincode);
        dt.append('EmployeePassword', formData.password);
        dt.append('EmployeeCity', formData.city);
        try {
            const encryptedData = encryptData();
            await axios.post(`${employeData}newEmpDetails?data=${encryptedData}`, dt, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }

            });
            fetchData();
            fullFormData({
                fName: '',
                lName: '',
                email: '',
                dob: '',
                gender: '',
                password: '',
                city: '',
                pincode: ''
            });
        } catch (error) {
            console.error('Error posting data:', error.message);
            console.log(error.resp);
        }

        // Perform your form submission logic here, e.g., send data to a server

    };


    debugger;
    const handleEdit = (employeeId) => {
       const empId=employeeId;
       setEmpId(empId);
        // Find the selected record from the data array
        const selectedRecord = data.find(item => item.employeeId === employeeId);
    
        // Set the form data with the selected record details
        fullFormData({
            fName: selectedRecord.employeeFirstName,
            lName: selectedRecord.employeeLastName,
            email: selectedRecord.employeeEmail,
            dob: selectedRecord.employeeDob,
            gender: selectedRecord.employeeGender,
            password: selectedRecord.employeePassword,
            city: selectedRecord.employeeCity,
            pincode: selectedRecord.employeepincode
        });
    
        // Open the modal for editing
        handleShow();
    };

    // const handleDelete = (employeeId) => {
    //     alert("are you sure do you want delete employee "+empId);
    //  }
     const handleDelete = async (employeeId) => {
        if (window.confirm("Are you sure you want to delete this employee?"+employeeId)) {
            try {
                await axios.delete(`${employeData}deleteEmp?id=${employeeId}`);
                fetchData();
            } catch (error) {
                console.error('Error deleting data:', error.message);
            }
        }
    };
   

    const handleUpdate = async () => {
        
        // Prepare the form data for updating
        const updatedData = {
            EmployeeId:empId,
            EmployeeFirstName: formData.fName,
            EmployeeLastName: formData.lName,
            EmployeeCity:formData.city,
            EmployeeDob:formData.dob,
            EmployeeEmail:formData.email,
            EmployeePassword:formData.password,
            Employeepincode:formData.pincode,
            EmployeeGender:formData.gender

        };
    
        try {
            const encryptedData = encryptData();
            console.log(empId);
            await axios.put(`${employeData}EditEmpDetails?id=${empId}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            // Fetch updated data after update
            fetchData();
    
            // Close the modal after updating
            handleClose();
        } catch (error) {
            console.error('Error updating data:', error.message);
        }
    };
    
    const InputEvent = (e) => {
        const { name, value } = e.target;
        fullFormData(
            prevState => ({
                ...prevState,
                [name]: value
            }));
    }

    return (
        <Fragment>
            <div>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <Container>
                        <Row>
                            <Col> <input type="text" className="form-control" name="fName" id="fName" placeholder="Enter Your FirstName" value={formData.fName} onChange={InputEvent} /></Col>
                            <Col><input type="text" className="form-control" name="lName" id="lName" placeholder="Enter Your LastName" value={formData.lName} onChange={InputEvent} /></Col>
                            <Col><input type="text" className="form-control" name="email" id="email" placeholder="Enter Your Email" value={formData.email} onChange={InputEvent} /></Col>
                            <Col><input type="date" className="form-control" name="dob" id="dob" value={formData.dob} placeholder="Enter Your Dob" onChange={InputEvent} /></Col>



                        </Row>
                        <br /><br /><br />
                        <Row>
                            <Col><input type="text" className="form-control" name="city" id="city" placeholder="Enter City Name" value={formData.city} onChange={InputEvent} /></Col>
                            <Col><input type="password" className="form-control" name="password" id="password" value={formData.password} placeholder="Enter Password" onChange={InputEvent} /></Col>
                            <Col><select className="form-control" name="gender" id="gender" value={formData.gender} onChange={InputEvent}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select></Col>
                            <Col> <input type="text" className="form-control" name="pincode" id="pincode" placeholder="Enter Your pincode" value={formData.pincode} onChange={InputEvent} /></Col>
                        </Row>
                        <br /><br />
                        <button type="submit">Submit</button>
                    </Container>
                </form>
                <br /><br />

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
                            data && data.length > 0 ? data.map((item, index) => {
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
                                        <td colSpan={2}><button className="btn btn-primary" onClick={() => handleEdit(item.employeeId)}>Edit</button>
                                            &nbsp;&nbsp;<button className="btn btn-danger" onClick={() => handleDelete(item.employeeId)}>Delete</button>{''}</td>
                                    </tr>
                                </>)
                            })
                                : 'Loading......'
                        }


                    </tbody>
                </Table>

                <Modal show={show} onHide={handleClose} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>Updating/Modify the Employee Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col> <input type="text" className="form-control" name="fName" id="fName" placeholder="Enter Your FirstName" value={formData.fName} onChange={InputEvent} /></Col>
                                <Col><input type="text" className="form-control" name="lName" id="lName" placeholder="Enter Your LastName" value={formData.lName} onChange={InputEvent} /></Col>
                                <Col><input type="text" className="form-control" name="email" id="email" placeholder="Enter Your Email" value={formData.email} onChange={InputEvent} /></Col>
                                <Col><input type="date" className="form-control" name="dob" id="dob" value={formData.dob} placeholder="Enter Your Dob" onChange={InputEvent} /></Col>



                            </Row>
                            <br /><br /><br />
                            <Row>
                                <Col><input type="text" className="form-control" name="city" id="city" placeholder="Enter City Name" value={formData.city} onChange={InputEvent} /></Col>
                                <Col><input type="password" className="form-control" name="password" id="password" value={formData.password} placeholder="Enter Password" onChange={InputEvent} /></Col>
                                <Col><select className="form-control" name="gender" id="gender" value={formData.gender} onChange={InputEvent}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select></Col>
                                <Col> <input type="text" className="form-control" name="pincode" id="pincode" placeholder="Enter Your pincode" value={formData.pincode} onChange={InputEvent} /></Col>
                            </Row>
                            
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </Fragment>

    )
}
export default Crud;