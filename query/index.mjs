import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.status(200).send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = {
      id,
      title,
      comments: [],
    };
  } else if (type === 'CommentCreated') {
    const { id, content, postId, status } = req.body.data;

    posts[postId].comments.push({
      id,
      content,
      status,
    });
  } else if (type === 'CommentUpdated') {
    const { id, content, postId, status } = req.body.data;
    const post = posts[postId];

    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }

  res.send({});
});

app.listen(4002, () => console.log('Query service listening on Port:4002'));
