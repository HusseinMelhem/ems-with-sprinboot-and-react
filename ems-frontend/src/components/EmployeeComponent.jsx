import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/employeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const validateForm = () => {
        let errors = {};
        if (!firstName.trim()) {
            errors.firstName = "First Name is required";
        }
        if (!lastName.trim()) {
            errors.lastName = "Last Name is required";
        }
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Invalid email format";
        }
        return errors;
    };

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstname(response.data.firstName);
                setLastname(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const employee = { firstName, lastName, email };
        console.log("Saving Employee:", employee);
        if (id) {
            updateEmployee(id, employee).then((response) => {
                console.log(response.data);
                navigate("/employees")
            }).catch((error) => {
                console.error("Error updating employee:", error);
            });
        } else {

            createEmployee(employee)
                .then((response) => {
                    console.log("Server Response:", response.data);
                    navigate("/employees");
                })
                .catch((error) => {
                    console.error("Error creating employee:", error);
                });
        }

    };
    function pageTitle() {
        if (id) {
            return <h2 className='text-center mb-3'>Update Employee</h2>
        } else {
            return <h2 className='text-center mb-3'>Add Employee</h2>
        }
    }

    return (
        <div className='container mt-4'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card p-4 shadow'>
                        {
                            pageTitle()
                        }
                        <div className='card-body'>
                            <form onSubmit={saveOrUpdateEmployee}>
                                <div className='form-group mb-3'>
                                    <label className='form-label'>First Name</label>
                                    <input
                                        type='text'
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        placeholder='Enter First Name'
                                        value={firstName}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                </div>


                                <div className='form-group mb-3'>
                                    <label className='form-label'>Last Name</label>
                                    <input
                                        type='text'
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        placeholder='Enter Last Name'
                                        value={lastName}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                </div>


                                <div className='form-group mb-3'>
                                    <label className='form-label'>Email</label>
                                    <input
                                        type='email'
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder='Enter Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>


                                <button type='submit' className='btn btn-primary w-100'>
                                    Add Employee
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
