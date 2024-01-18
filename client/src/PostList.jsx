import CreateComment from './CommentCrate';
import CommentList from './CommentList';
import { useState, useEffect } from 'react';

function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:4000/posts');
    if (!res.ok) {
      console.log('Fetch of posts failed');
    } else {
      setPosts(await res.json());
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <div
      className='card'
      style={{ width: '30%', marginBottom: '20px' }}
      key={post.id}
    >
      <div className='card-body'>
        <h3>{post.title}</h3>
        <CommentList postId={post.id} />
        <CreateComment postId={post.id} />
      </div>
    </div>
  ));

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedPosts}
    </div>
  );
}

export default PostList;
