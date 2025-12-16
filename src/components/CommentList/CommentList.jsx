import { useEffect, useState } from "react";
import { errorHandler } from "../../utils/errorHandler";
import { api } from "../../apis/api";
import { CommentItem } from "../CommentItem/CommentItem";
import { AddComment } from "../AddComment/AddComment";

export const CommentList = ({ post }) => {
  // State
  const [comments, setComments] = useState([]);

  const postId = post._id;

  // Comment PostId

  useEffect(() => {
    async function fetchPostComments() {
      try {
        const response = await api.get(`/api/v1/posts/${postId}/comments`);
        setComments(response.data.comments);
      } catch (error) {
        console.log(error);
        errorHandler(error);
      }
    }

    fetchPostComments();
  }, [postId]);

  return (
    <div>
      <AddComment
        post={post}
        onAppend={(comment) => {
          setComments([...comments, comment]);
        }}
      />

      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onDelete={() => {
            setComments(comments.filter((c) => c._id !== comment._id));
          }}
        />
      ))}
    </div>
  );
};
