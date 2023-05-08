import Mail from "../lib/Mail";

export default {
  async store(req, res) {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password,
    };

    // Send an e-mail to the user:
    await Mail.sendMail({
      from: "Queue Test <queue@test.com>",
      to: `${name} <${email}>`,
      subject: "User Registration",
      html: `Hi ${name}, wellcome to our Redis/Node queue system!`,
    });

    return res.json(user);
  },
};
