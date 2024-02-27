import { useState } from 'react';

function PostCreate() {
  const [title, setTitle] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://post.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label className='my-2'>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='form-control my-2'
        />
      </div>
      <button className='btn btn-primary my-2'>Submit</button>
    </form>
  );
}

export default PostCreate;
