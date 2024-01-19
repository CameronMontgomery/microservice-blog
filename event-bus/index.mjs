import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message, 'Posts');
  });
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message, 'Posts');
  });
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err.message, 'Query');
  });
  axios.post('http://localhost:4003/events', event).catch((err) => {
    console.log(err.message, 'Moderation');
  });

  res.send({ status: 'ok' });
});

app.listen(4005, () => console.log('Event Bus listening on 4005'));
