import React, { useState, useEffect } from "react";
import { PostForm } from "./PostForm";
const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //1. Point to your local json server URL
    fetch("http://localhost:5000/posts")
      .then((response) => response.json()) //2. Parse JSON response
      .then((data) => setPosts(data)) //3. Store data in state
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  //THIS IS THE FUNCTION
  const handleNewPost = (newlyCreatedPost) => {
    //we use speard operator (...) to create a new array
    //inncluding all old posts plus the one we just got from the server.
    setPosts((prevPosts) => {
      [...prevPosts, newlyCreatedPost];
    });
  };
  return (
    <div>
      <h1>My Posts</h1>
      <ul>
        <PostForm onPostAdded={handleNewPost(posts)} />
        {posts?.map((post) => (
          <li key={post.id}>
            {post.title} - by {post.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
