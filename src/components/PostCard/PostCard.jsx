import { Button, Carousel } from "react-bootstrap";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import { errorHandler } from "../../utils/errorHandler";
import { api } from "../../apis/api";
import { useState } from "react";
import moment from "moment";
import { AddComment } from "../AddComment/AddComment";
import { CommentList } from "../CommentList/CommentList";
import { UserAvatar } from "../UserAvatar/UserAvatar";

export const PostCard = ({ post }) => {
  const baseUrl = baseUrlHandler();

  const [currentPost, setCurrentPost] = useState(post);

  // Handle Like
  async function handleLike(ev) {
    try {
      // Prapare Data
      const postId = post._id;

      const response = await api.put(`/api/v1/posts/${postId}/like`, {});

      console.log(response.data);

      setCurrentPost(response.data.post);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  }
  return (
    <div className="p-4 border mb-3 mx-auto text-center">
      {/* Owner Info */}

      <UserAvatar
        createdAt={currentPost.createdAt}
        updatedAt={currentPost.updatedAt}
        name={currentPost.userId.name}
        profilePic={currentPost.userId.profilePic}
      />

      <Carousel className="mx-auto mb-3" style={{ maxWidth: "400px" }}>
        {currentPost.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              src={`${baseUrl}/${image}`}
              alt={`image-${index + 1}`}
              className="w-100"
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <h3>{currentPost.caption}</h3>

      <div>
        <Button onClick={handleLike}>Like {currentPost.likes.length}</Button>

        <AddComment post={currentPost} />
        <CommentList post={currentPost} />
      </div>
    </div>
  );
};
