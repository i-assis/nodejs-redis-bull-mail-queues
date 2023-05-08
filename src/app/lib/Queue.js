import Queue from 'bull';

// Queues can't be stored in RAM memory! Too volatile..
// Best DB to store background job queues: Redis
import redisConfig from '../../config/redis';

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