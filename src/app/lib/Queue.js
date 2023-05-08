import Queue from "bull";

// Queues can't be stored in RAM memory! Too volatile..
// Best DB to store background job queues: Redis
import redisConfig from "../../config/redis";

// AWAY GOES THE OLD 1 QUEUE SETUP PER JOB:
/*
// Background job setup starts now:
import RegistrationMail from '../jobs/RegistrationMail';

// check https://github.com/OptimalBits/bull
// check https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queue
const mailQueue = new Queue(RegistrationMail.key, redisConfig);

// check https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#events
// check https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#job
mailQueue.on('failed', (job,err) => {
  console.log('Job failed ;-(', job.name, job.data) 
  console.log(err)
})
// is constructor of 'job' at the 2nd argument callback of 'on' method?

export default mailQueue;

// Setup 1 queue for every 1 job.
*/

// IN COMES THE ALL QUEUE SETUP IN ONE TAKE:
import * as jobs from "../jobs";

// A job object looks like:
// { JobSuchAsRegistrationMail: {
//      key: '',
//      handle: () => {}
//   }
// }
const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name, data) {
    // check UserController.js, line 38
    const queue = this.queues.find((queue) => queue.name === name);
    return queue.bull.add(data); // check line 39 above
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on("failed", (job, err) => {
        console.log("Job failed", queue.key, job.data);
        console.log(err);
      });
    });
  },
};
