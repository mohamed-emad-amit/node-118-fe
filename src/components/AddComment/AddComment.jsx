import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { errorHandler } from "../../utils/errorHandler";
import { api } from "../../apis/api";
import toast from "react-hot-toast";

export const AddComment = ({ post, onAppend }) => {
  const [text, setText] = useState("");

  const isDisabled = !text.trim();

  async function handleAddComment(ev) {
    ev.preventDefault();

    try {
      // Hit Endpoint -> data text postId -> token
      const data = { text, postId: post._id };
      const response = await api.post("/api/v1/comments", data);
      // Extract Info
      const { comment, message } = response.data;

      // Call onAppend -> Append Comment
      onAppend(comment);

      // Reset Text
      setText("");
      // Show Toast
      toast.success(message);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  }

  return (
    <Form
      onSubmit={handleAddComment}
      className="d-flex align-items-center gap-2 my-3"
    >
      <Form.Control
        placeholder="Add Comment"
        value={text}
        onChange={(ev) => setText(ev.target.value)}
      />
      <Button
        type="submit"
        disabled={isDisabled}
        variant={isDisabled ? "secondary" : "primary"}
      >
        Comment
      </Button>
    </Form>
  );
};
