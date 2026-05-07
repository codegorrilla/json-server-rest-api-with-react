import { useState } from 'react';

const DeletePost = ({ onPostDeleted }) => {
	const [postID, setPostID] = useState('');

	const handleDelete = async (e) => {
		if (!postID) return;

		e.preventDefault();

		try {
			const response = await fetch(`http://localhost:5000/posts/${postID}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				onPostDeleted(postID);
				setPostID('');
			} else {
				console.error('Failed to delete: Post ID not found');
			}
		} catch (err) {
			console.error('Error deleting post:', err);
		}
	};

	return (
		<form
			onSubmit={handleDelete}
			style={{
				marginTop: '20px',
				borderTop: '1px solid #ccc',
				paddingTop: '10px',
			}}
		>
			<input
				type='text'
				placeholder='Enter Post ID (e.g., 1)'
				value={postID}
				onChange={(e) => setPostID(e.target.value.trim())}
			/>
			<button type='submit'>Delete Post</button>
		</form>
	);
};

export { DeletePost };
