import React, { useEffect, useState } from "react";
import { errorHandler } from "../../utils/errorHandler";
import { api } from "../../apis/api";
import { PostCard } from "../PostCard/PostCard";

export const FeedsPosts = () => {
  // State
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Get All Posts
    async function fetchAllPosts() {
      try {
        // Hit Endpoint -> /api/v1/posts
        const response = await api.get("/api/v1/posts");
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);
        errorHandler(error);
      }
    }
    fetchAllPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post._id} post={post}/>
      ))}
    </div>
  );
};
