import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { deleteEmployee, listEmployees } from '../services/employeeService';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { Link } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        getAllEmployees()
    }, []);
    function getAllEmployees(){
        listEmployees()
        .then((response) => {
            setEmployees(response.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching employees:", err);
            setError("Failed to load employees. Please try again.");
            setLoading(false);
        });
    }

    // Handle Add Employee Click
    const handleAddEmployee = () => {
        navigate('/add-employee'); // Navigate to the Add Employee form (ensure the route exists)
    };

    function removeEmployee(id){
        deleteEmployee(id).then((response)=>{
            getAllEmployees();
        }).catch(error=>{
            console.error(error);
        })
        
    };
    return (
        <div className="container mt-4">
            <div className="card p-4 shadow-sm">
                <h2 className="text-center mb-4">Employee List</h2>

                {/* Add Employee Button */}
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-primary" onClick={handleAddEmployee}>Add Employee</button>
                </div>

                {/* Loading, Error & Empty State Handling */}
                {loading ? (
                    <p className="text-center">Loading employees...</p>
                ) : error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : employees.length === 0 ? (
                    <p className="text-center">No employees found.</p>
                ) : (
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName ?? employee.FirstName}</td> {/* Ensure compatibility */}
                                    <td>{employee.lastName ?? employee.LastName}</td>
                                    <td>{employee.email}</td>
                                    <td> <Link to={`/edit-employee/${employee.id}`} className="btn btn-warning">
                                        Edit
                                    </Link>
                                     <button className='btn btn-danger' onClick={()=> removeEmployee(employee.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ListEmployeeComponent;
