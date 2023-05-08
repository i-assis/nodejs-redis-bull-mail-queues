// run with > yarn dev:queue

// Trace:
// 'RegistrationMail.handle' requires 'RegistrationMail.js' requires 'lib/Mail.js' requires 'config/mail.js' requires '.env'
import 'dotenv/config';

import Queue from './app/lib/Queue'

// All jobs are now imported in bulk, this line goes away:
// import RegistrationMail from './app/jobs/RegistrationMail'

// see https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueprocess

// Process SINGLE queue:
// Queue.process(RegistrationMail.handle)

// Process ALL queues:
Queue.process();
// Everytime there is a new job, a new queue is created automatically.