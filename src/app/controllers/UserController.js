// import Mail from "../lib/Mail"; // No longer needed, now we got a redis job queue.
import Queue from "../lib/Queue";

export default {
  async store(req, res) {
    const { name, email, password } = req.body;

    // same format as const 'data' from job 'RegistrationMail'
    const user = {
      name,
      email,
      password,
    };

    // Send an e-mail to the user:

    // await Mail.sendMail({
    // from: "Queue Test <queue@test.com>",
    // to: `${name} <${email}>`,
    // subject: "User Registration",
    // html: `Hi ${name}, wellcome to our Redis/Node queue system!`,
    // });

    // You need propper background job configuration, since:
    // 1. above sendMail execution uses same server as rest of application
    // 2. did execution fail? who knows...
    // 3. what if you wanna try to execute this operation 3 times in 15 min from now?
    // For this, we use the 'bull' nodejs library.
    // 'Kue' library is now deprecated. 'Bee Queue' features high performance, but has limited features.

    // Add RegistrationMail job to queue:
    // Queues can't be stored in RAM memory! Too volatile.. thus Redis.

    // check https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueadd
    // 1 job per queue:
    // await Queue.add({ user });

    // multi jobs per queue, need to say to which queue you're adding the job:
    await Queue.add("RegistrationMail", { user });
    await Queue.add("UserReport", { user });

    return res.json(user);
  },
};
