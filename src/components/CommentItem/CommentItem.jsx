import React from "react";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { useSelector } from "react-redux";
import { errorHandler } from "../../utils/errorHandler";
import { api } from "../../apis/api";
import toast from "react-hot-toast";

export const CommentItem = ({ comment, onDelete }) => {
  const { user } = useSelector((state) => state.user);
  const isOwner = comment.userId._id === user._id;

  // Check User => owner Comment

  //   Delete Handler
  async function deleteHandler() {
    try {
      // Extract Id
      const id = comment._id;
      // Hit Endpoint
      const response = await api.delete(`/api/v1/comments/${id}`);

      // Call onDelete -> Delete Item
      onDelete();

      // Extract Message
      const { message } = response.data;
      toast.success(message);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  }

  // Edit Handler
  function editHandler() {
    // Show Modal
    // Edit Text Comment
    // Close Modal
    // update Comment
  }

  return (
    <div className="border rounded p-2 mb-2">
      <UserAvatar
        createdAt={comment.createdAt}
        updatedAt={comment.updatedAt}
        name={comment.userId.name}
        profilePic={comment.userId.profilePic}
      />
      <strong>{comment.userId.name}</strong>
      <p className="mb-2">{comment.text}</p>
      {/* Show 2 Button Edit Delete */}

      {isOwner && (
        <div className="d-flex justify-content-between">
          <button onClick={editHandler} className="btn btn-primary">
            Edit
          </button>
          <button onClick={deleteHandler} className="btn btn-danger">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
