import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css'
import { Modal, Button, Spinner, Row } from "react-bootstrap";
import SearchBar from "../searchBar";
import Error from "../ErrorMessage";

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectItem, setselectItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [additionalDetail, setAdditionalDetailUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    fetchUsers();
  };

  const handleUserClick = (user) => {
    setAdditionalDetailUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredUsers = users.filter((user) =>
    // user.name.includes(selectItem) || user.username.includes(selectItem)
  user.name.toLowerCase().includes(selectItem.toLowerCase()) ||
  user.username.toLowerCase().includes(selectItem.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center">User Management</h1>
      <div className="mb-4">
        <SearchBar setQuery={setselectItem} />
      </div>
      <div className="user-list">
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Error message={error} />
        ) : filteredUsers.length === 0 ? (
          <p className="text-center">No match found</p>
        ) : (
  <div className="container tableTop" >
    <table className="table table-striped">
    <thead className="tableHeader table-dark" >
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Address</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user) => (
          <tr key={user.id} >
            <th scope="row">{user.id}</th>
            <td>
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => handleUserClick(user)}
              >
                {user.name}
              </span>
            </td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              {user.address.street}, {user.address.suite},{" "}
              {user.address.city}, {user.address.zipcode}
            </td>
          </tr>

        ))}
      </tbody>
    </table>
  </div>

        )}
      </div>

      {!loading && (
        <div className="mt-4 text-center">
          <Button onClick={handleRefresh} variant="dark">
            Refresh Data
          </Button>
        </div>
      )}

      {additionalDetail && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Name:</strong> {additionalDetail.name}
            </p>
            <p>
              <strong>Username:</strong> {additionalDetail.username}
            </p>
            <p>
              <strong>Email:</strong> {additionalDetail.email}
            </p>
            <p>
              <strong>Phone:</strong> {additionalDetail.phone}
            </p>
            <p>
              <strong>Website:</strong> {additionalDetail.website}
            </p>
            <p>
              <strong>Company:</strong> {additionalDetail.company.name}
            </p>
            <p>
              <strong>Address:</strong> {additionalDetail.address.street},{" "}
              {additionalDetail.address.suite}, {additionalDetail.address.city},{" "}
              {additionalDetail.address.zipcode}
            </p>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default User;
