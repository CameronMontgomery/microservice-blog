import { useState, useEffect } from 'react';

const CommentCreate = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchPostComments = async () => {
    const res = await fetch(`http://localhost:4001/posts/${postId}/comments`);
    if (!res.ok) {
      console.log('Fetch of post comments failed');
    } else {
      setComments(await res.json());
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentCreate;
