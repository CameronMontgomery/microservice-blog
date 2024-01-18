import PostCreate from './PostCreate';
import PostList from './PostList';

function App() {
  return (
    <div className='App container-lg'>
      <header className='text-center'>
        <h1 className='py-4'>Mini Blog Microservice App</h1>
      </header>
      <div>
        <h2>Create Post</h2>
        <PostCreate />
        <hr />
        <h2>Posts</h2>
        <PostList />
      </div>
    </div>
  );
}

export default App;
