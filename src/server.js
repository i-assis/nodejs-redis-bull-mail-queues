// run with > yarn dev:server

import 'dotenv/config'; // LEVEL 0
import express from 'express'; // CORE LEVEL 0

import UserController from './app/controllers/UserController'; // CORE LEVEL 1

// check https://github.com/felixmosh/bull-board#hello-world
// BULL-BOARD - IMPORTS
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
import Queue from './app/lib/Queue';

// BULL-BOARD - CONFIG
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const arrayOfQueues = Queue.queues.map( (bullJSON) => bullJSON.bull );
const arrayOfBullAdaptedQueues = arrayOfQueues.map( (queue) => new BullAdapter(queue)  )

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: arrayOfBullAdaptedQueues,
  serverAdapter: serverAdapter,
});

// CORE LEVEL 0
const app = express();

// CORE LEVEL 1 - ROUTES
app.use(express.json());
app.post('/users', UserController.store);

// BULL-BOARD - ROUTE
app.use('/admin/queues', serverAdapter.getRouter());

// CORE LEVEL 0
const port = 3333;
app.listen(port, () => {
  console.log(`Server running on localhost:${port}...`);
  console.log(`For the UI, open http://localhost:${port}/admin/queues`);
  console.log('Make sure Redis is running on port 6379 by default');
  }
  )
