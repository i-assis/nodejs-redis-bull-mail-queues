import Mail from "../lib/Mail";

export default {
  key: "RegistrationMail",

  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      from: "Queue Test <queue@test.com>",
      to: `${user.name} <${user.email}>`,
      subject: "User Registration",
      html: `Hi ${user.name}, wellcome to our Redis/Node queue system!`,
    });
  },
};
