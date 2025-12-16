import React from "react";
import { UserAvatar } from "../UserAvatar/UserAvatar";

export const CommentItem = ({ comment }) => {
  console.log(comment.userId._id);
  // Check User => owner Comment
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
    </div>
  );
};
