import express from 'express';
import cors from 'cors';
import media from './routes/media';

const server = express();

server.use(cors());
server.use('/media', media);

server.listen(
    9495,
    () => console.log('Server is running on http://localhost:9495'),
);
