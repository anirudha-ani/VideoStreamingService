import express from 'express';

// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = 3000;

// Routing the landing page of the application on the root
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Serve the application at the given port
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App is listening on port ${port}!`);
});