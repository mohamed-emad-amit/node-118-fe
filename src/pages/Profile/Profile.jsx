import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import { FiEdit2 } from "react-icons/fi";
import { errorHandler } from "../../utils/errorHandler";
import { Button, Form, Modal } from "react-bootstrap";
import { api } from "../../apis/api";
import toast from "react-hot-toast";
import { setUser } from "../../store/slices/userSlice";

export const Profile = () => {
  // States Modal
  const [show, setShow] = useState(true);
  const [file, setFile] = useState(undefined);

  // Handler Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Select User Data From Store
  const { user } = useSelector((state) => state.user);
  console.log(user);

  // Dispatch
  const dispatch = useDispatch();

  // Current BaseURL
  const baseUrl = baseUrlHandler();

  // Handler Modal
  async function handleChangeProfilePic(ev) {
    try {
      // Prepare Data
      const formData = new FormData();
      formData.append("image", file);

      // Get Token
      const token = localStorage.getItem("token");
      // Call EndPoint -> /api/v1/users/profile/update
      const response = await api.put("/api/v1/users/profile/update", formData, {
        // Hint: back -> authorization
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Extract Info
      const { profilePic, message } = response.data;

      // Update profilePic -> user -> Redux
      dispatch(setUser({ ...user, profilePic }));
      toast.success(message);

      // Reset File
      setFile(undefined);

      // Close Modal
      handleClose();
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  }

  // [TODO] Bio Task

  return (
    <>
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Picture</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="profilePic">Upload Your Avatar</Form.Label>
              <Form.Control
                onChange={(ev) => setFile(ev.target.files[0])}
                type="file"
                id="profilePic"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={file == undefined} onClick={handleChangeProfilePic}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <h3 className="mb-4">User Profile</h3>

        <div className="shadow rounded text-center py-4 ">
          <div
            className="mx-auto mb-3 position-relative"
            style={{ width: "fit-content" }}
          >
            {/* Image -> Append BaseUrl */}
            <img
              src={`${baseUrl}/${user.profilePic}`}
              alt="user-profile"
              width={150}
            />

            <div
              className="bg-primary fs-4 rounded rounded-circle text-light position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center"
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
              onClick={handleShow} // Show Modal
            >
              <FiEdit2 />
            </div>
          </div>
          <div>
            <h3>{user.name}</h3>
            {user.bio && <p className="m-0">{user.bio}</p>}
          </div>
        </div>
      </div>
    </>
  );
};
