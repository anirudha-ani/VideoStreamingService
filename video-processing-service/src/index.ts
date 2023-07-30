import { error } from 'console';
import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

// Create a new express application instance
const app = express();
app.use(express.json());

// Video processing endpoint to convert video to 360p
app.post('/process-video', (req, res) => {
  const inputVideoFilePath = req.body.inputVideoFilePath;
  const outputVideoFilePath = req.body.outputVideoFilePath;

  if (!inputVideoFilePath || !outputVideoFilePath) {
    res.status(400).send('Missing input or output video file path');
  }

  ffmpeg(inputVideoFilePath)
  .outputOptions("-vf", "scale=-1:360")
  .on('end', () => {
    res.status(200).send('Video processing started'); 
  })
  .on('error', (error) => {
    console.log(error);
    res.status(500).send(`Error processing video: ${error}`);
  })
  .save(outputVideoFilePath);
});


// The port the express app will listen on
const port = process.env.PORT || 3000;

// Serve the application at the given port
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App is listening on port ${port}!`);
});