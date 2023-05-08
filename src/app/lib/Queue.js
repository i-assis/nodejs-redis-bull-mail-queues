import Queue from 'bull';

// Queues can't be stored in RAM memory! Too volatile..
// Best DB to store background job queues: Redis
import redisConfig from '../../config/redis';

// Background job setup starts now:
import RegistrationMail from '../jobs/RegistrationMail';

// check https://github.com/OptimalBits/bull
// check https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queue
const mailQueue = new Queue(RegistrationMail.key, redisConfig);

export default mailQueue;

// Setup 1 queue for every job.