import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  comments.push({ id: commentId, content, status: 'pending' });
  commentsByPostId[req.params.id] = comments;

  await axios
    .post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        commentId: commentId,
        content,
        postId: req.params.id,
        status: 'pending',
      },
    })
    .catch((err) => console.log(err.message));

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Event Received: ', req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log('Comment service listening on Port:4001');
});
