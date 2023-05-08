export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_HOST_PORT,
  auth: {
    user: process.env.MAIL_HOST_USER,
    pass: process.env.MAIL_HOST_PASS,
  },
};
