export default {
  key: "UserReport",

  async handle({ data }) {
    const { user } = data; // same format as const 'user' from controller 'UserController'
    console.log(user);
  },
};
