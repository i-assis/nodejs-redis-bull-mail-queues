// run with > yarn dev:queue

// Trace:
// 'RegistrationMail.handle' requires 'RegistrationMail.js' requires 'lib/Mail.js' requires 'config/mail.js' requires '.env'
import 'dotenv/config';

import Queue from './app/lib/Queue'
import RegistrationMail from './app/jobs/RegistrationMail'

// see https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueprocess
Queue.process(RegistrationMail.handle)