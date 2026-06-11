import { useState } from 'react';

export const PostForm = ({ onPostAdded }) => {
	//1. local state for form inputs
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault(); //Prevents the page from refreshing

		const newPost = { title, author };

		try {
			//2. The POST request
			const response = await fetch('http://localhost:5000/posts', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(newPost),
			});

			if (response.ok) {
				const data = await response.json();
				onPostAdded(data);
				setTitle('');
				setAuthor('');
			}
		} catch (error) {
			console.error('Error adding post', error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{ marginBottom: '20px' }}
		>
			<h3>Add a new post</h3>
			<input
				type='text'
				placeholder='Title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<input
				type='text'
				placeholder='Author'
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
				required
			/>
			<button type='submit'>Add post</button>
		</form>
	);
};
