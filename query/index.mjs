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
    const { commentId, content, postId, status } = req.body.data;

    posts[postId].comments.push({
      id: commentId,
      content,
      status,
    });
  }

  res.send({});
});

app.listen(4002, () => console.log('Query service listening on Port:4002'));
