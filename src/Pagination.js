import React, { useState, useEffect } from 'react';
import './App.css';

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const rowsPerPage = 10;

  // Fetch employee data from the API
  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("failed to fetch data", err);
            alert("failed to fetch data");
      });
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Handle the previous and next buttons
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Slice data for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button type="button" onClick={handlePrevious} >
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
         {currentPage} 
        </span>
        <button type="button" onClick={handleNext} >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
