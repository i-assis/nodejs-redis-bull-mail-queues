import Queue from 'bull';

// Queues can't be stored in RAM memory! Too volatile..
// Best DB to store background job queues: Redis
import redisConfig from '../../config/redis';

// Background job setup starts now: