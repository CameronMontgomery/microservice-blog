import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
    console.log(err.message, 'Posts');
  });
  axios.post('http://comments-srv:4001/events', event).catch((err) => {
    console.log(err.message, 'Comments');
  });
  axios.post('http://query-srv:4002/events', event).catch((err) => {
    console.log(err.message, 'Query');
  });
  axios.post('http://moderation-srv:4003/events', event).catch((err) => {
    console.log(err.message, 'Moderation');
  });

  res.send({ status: 'ok' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => console.log('Event Bus listening on 4005'));
