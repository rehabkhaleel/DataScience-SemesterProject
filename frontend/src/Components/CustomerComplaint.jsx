import React, { useState } from 'react';

const CustomerComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/complaints');
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleSelect = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleBack = () => {
    setSelectedComplaint(null);
  };

  return (
    <div className="bg-transparent min-h-screen p-6 flex flex-col items-center ml-6">
      <h2 className="text-3xl font-bold mb-6">Customer Complaints</h2>
      {!complaints.length && !selectedComplaint && (
        <button 
          onClick={fetchComplaints} 
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Load Complaints
        </button>
      )}

      {complaints.length > 0 && !selectedComplaint && (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Complain ID</th>
                <th className="py-3 px-6 text-left">Customer ID</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Select</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.ComplainID} className="border-b">
                  <td className="py-3 px-6">{complaint.ComplainID}</td>
                  <td className="py-3 px-6">{complaint.CustomerID}</td>
                  <td className="py-3 px-6">{complaint.Email}</td>
                  <td className="py-3 px-6">
                    <button 
                      onClick={() => handleSelect(complaint)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedComplaint && (
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Complaint Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Complain ID:</label>
              <input type="text" value={selectedComplaint.ComplainID} readOnly className="input-field" />
            </div>
            <div>
              <label className="font-semibold">Customer ID:</label>
              <input type="text" value={selectedComplaint.CustomerID} readOnly className="input-field" />
            </div>
            <div>
              <label className="font-semibold">Email:</label>
              <input type="text" value={selectedComplaint.Email} readOnly className="input-field" />
            </div>
            <div>
              <label className="font-semibold">Age:</label>
              <input type="text" value={selectedComplaint.Age} readOnly className="input-field" />
            </div>
            <div>
              <label className="font-semibold">Dissatisfaction:</label>
              <input type="text" value={selectedComplaint.Complain_Type_Dissatisfaction} readOnly className="input-field" />
            </div>
            <div>
              <label className="font-semibold">Price:</label>
              <input type="text" value={selectedComplaint.Complain_Type_Price} readOnly className="input-field" />
            </div>
            <div>
              <label className="font-semibold">Attitude:</label>
              <input type="text" value={selectedComplaint.Complain_Type_Attitude} readOnly className="input-field" />
            </div>
            <div>
              <label className="font-semibold">Customer Service:</label>
              <input type="text" value={selectedComplaint.Complain_Type_Customer_Service} readOnly className="input-field" />
            </div>
            <div className="md:col-span-2">
              <label className="font-semibold">Other Complaint:</label>
              <textarea value={selectedComplaint.Other_Complain || ''} readOnly className="w-full p-2 border rounded mt-1" />
            </div>
            <div className="md:col-span-2">
              <label className="font-semibold">No. of Complaints:</label>
              <input type="text" value={selectedComplaint.No_of_Complains} readOnly className="input-field" />
            </div>
          </div>

          <button 
            onClick={handleBack} 
            className="mt-6 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Back to Complaints
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerComplaints;
