import React, { useState, useEffect } from "react";
import { PostForm } from "./PostForm";
import { EditPost } from "./EditPost";
const PostList = () => {
  const [posts, setPosts] = useState([]);

  //To list posts
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
    //including all old posts plus the one we just got from the server.
    setPosts((prevPosts) => {
      return [...prevPosts, newlyCreatedPost];
    });
  };

  const handleUpdatedPost = (updatedPost) => {
    //Use .map() method to create a new array
    //If the ID matches, swap it for the new post. Otherwise, keep the old one
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };
  return (
    <div>
      <h1>My Posts</h1>
      <ul>
        <PostForm onPostAdded={handleNewPost} />
        <EditPost onEditPost={handleUpdatedPost} />
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
