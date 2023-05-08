export default {
  async store(req, res) {
    const { name, email, password } = req.body;
    
    const user = {
      name,
      email,
      password,
    };

    // Send an e-mail to the user:

    return res.json(user);
  },
};
