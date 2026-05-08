import React, { useState } from "react";

export const EditPost = ({ onEditPost }) => {
  const [editPostId, setEditPostId] = useState("");
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostAuthor, setEditPostAuthor] = useState("");

  const handleEditPost = async (e) => {
    e.preventDefault();

    if (!editPostId || !editPostTitle || !editPostAuthor) return;

    try {
      const res = await fetch(`http://localhost:5000/posts/${editPostId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: editPostTitle, author: editPostAuthor }), //1. add only what changes
      });

      if (res.ok) {
        const data = await res.json();

        //2. Notify parent to update the list
        onEditPost(data);
        setEditPostId("");
        setEditPostTitle("");
        setEditPostAuthor("");
      } else {
        console.error("Post ID not found.");
      }
    } catch (err) {
      console.error("Error updating the post", err);
    }
  };
  return (
    <div
      style={{
        marginTop: "20px",
        borderTop: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <form onSubmit={handleEditPost}>
        <input
          type="text"
          placeholder="Enter Post Id"
          value={editPostId}
          onChange={(e) => setEditPostId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter New Title"
          value={editPostTitle}
          onChange={(e) => setEditPostTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter New Author"
          value={editPostAuthor}
          onChange={(e) => setEditPostAuthor(e.target.value)}
        />
        <button type="submit">Edit Post</button>
      </form>
    </div>
  );
};
