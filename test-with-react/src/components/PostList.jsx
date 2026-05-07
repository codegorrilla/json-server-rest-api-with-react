import { useState, useEffect } from 'react';
import { PostForm } from './PostForm';
import { DeletePost } from './DeletePost';
import { EditPostTitle } from './EditPostTitle';

const PostList = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		//1. Point to your local json server URL
		fetch('http://localhost:5000/posts')
			.then((response) => response.json()) //2. Parse JSON response
			.then((data) => setPosts(data)); //3. Store data in state
	}, []);

	//THIS IS THE FUNCTION
	const handleNewPost = (newlyCreatedPost) => {
		//we use speard operator (...) to create a new array
		//inncluding all old posts plus the one we just got from the server.
		setPosts((prevPosts) => [...prevPosts, newlyCreatedPost]);
	};

	const handleDeletePost = (deleteId) => {
		//Filter out the post with matching ID
		setPosts(posts.filter((post) => post.id !== deleteId));
	};

	const handleNewTitle = (updatedPost) => {
		//Use .map() to create a new array
		//if the ID matches, swap it for the new post. Otherwise , keep the old one
		setPosts(
			posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
		);
	};
	return (
		<div>
			<h1>My Posts</h1>
			<PostForm onPostAdded={handleNewPost} />
			<DeletePost onPostDeleted={handleDeletePost} />
			<EditPostTitle onPostUpdated={handleNewTitle} />
			<ul>
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
