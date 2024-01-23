import express from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Pretend Database
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  if (title) {
    posts[id] = {
      id,
      title,
    };

    await axios
      .post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
          id,
          title,
        },
      })
      .catch((err) => {
        console.log(err.message);
      });

    res.status(201).send(posts[id]);
  } else {
    res.status(400).send('Post must have title');
  }
});

app.post('/events', (req, res) => {
  console.log('Event Received: ', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('v3');
  console.log('Post service listening on port:4000');
});
