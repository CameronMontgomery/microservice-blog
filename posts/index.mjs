import express from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Pretend Database
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  if (title) {
    posts[id] = {
      id,
      title,
    };

    res.status(201).send(posts[id]);
  } else {
    res.status(400).send('Post must have title');
  }
});

app.listen(4000, () => {
  console.log('Post service listening on port:4000');
});
