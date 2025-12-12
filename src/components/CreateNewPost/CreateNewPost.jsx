import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { errorHandler } from "../../utils/errorHandler";
import { api } from "../../apis/api";
import toast from "react-hot-toast";

export const CreateNewPost = () => {
  // Status
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);

  // Handle Disabled Button
  const isDisabled = files.length == 0 && !caption.trim();

  // Handler
  async function handleCreateNewPost(ev) {
    ev.preventDefault();
    try {
      // Prepare Data
      const formData = new FormData();
      formData.append("caption", caption);

      // Loop Files -> File -> Append images
      for (let index = 0; index < files.length; index++) {
        formData.append("images", files[index]); // images: [file, file, ..., file]
      }

      // Get Token
      const token = localStorage.getItem("token");

      // EndPoint -> /api/v1/posts/create
      const response = await api.post("/api/v1/posts/create", formData, {
        // Hint: back -> authorization
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Extract Info
      const { post, message } = response.data;
      toast.success(message);

      // Reset Form & States
      ev.target.reset();
      setCaption("");
      setFiles([]);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  }
  return (
    <Form onSubmit={handleCreateNewPost}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="caption">Caption</Form.Label>
        <Form.Control
          as={"textarea"}
          name="caption"
          id="caption"
          placeholder="Caption..."
          onChange={(ev) => setCaption(ev.target.value)}
          style={{ resize: "none", height: "150px" }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="images">Upload Images</Form.Label>
        <Form.Control
          multiple
          type="file"
          max={5}
          onChange={(ev) => setFiles(ev.target.files)}
        />
      </Form.Group>

      <Button
        type="submit"
        disabled={isDisabled}
        variant={isDisabled ? "secondary" : "primary"}
      >
        Post
      </Button>
    </Form>
  );
};
