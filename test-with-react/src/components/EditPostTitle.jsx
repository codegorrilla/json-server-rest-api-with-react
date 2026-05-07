import { useState } from 'react';
export const EditPostTitle = ({ onPostUpdated }) => {
	const [editPostId, setEditPostId] = useState('');
	const [editTitle, setEditTitle] = useState('');

	const handleEditTitle = async (e) => {
		e.preventDefault();

		if (!editPostId || !editTitle) return;

		try {
			const response = await fetch(
				`http://localhost:5000/posts/${editPostId}`,
				{
					method: 'PATCH',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify({ title: editTitle }), //Only send what changes
				},
			);

			if (response.ok) {
				const data = await response.json();

				//2. Notify parent to update the list
				onPostUpdated(data);
				setEditPostId('');
				setEditTitle('');
			} else {
				console.error('Post ID not found');
			}
		} catch (error) {
			console.error('Error updating post title:', error);
		}
	};

	return (
		<div
			style={{
				marginTop: '20px',
				borderTop: '1px solid #ccc',
				padding: '10px',
			}}
		>
			<form onSubmit={handleEditTitle}>
				<input
					type='text'
					placeholder='Enter post ID'
					value={editPostId}
					onChange={(e) => setEditPostId(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Enter new title'
					value={editTitle}
					onChange={(e) => setEditTitle(e.target.value)}
				/>
				<button type='submit'>Edit title</button>
			</form>
		</div>
	);
};
