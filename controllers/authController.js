const bcrypt = require("bcrypt");
module.exports = {
  //Registration
  //phone number must be submitted as a 10 digit string with no special charachters (hyphens, parentheses, etc)
  //passwords will be secure with a hashing algorithm, any length or special character requirements need to be handled on the front end
  //inputs need to be passed back as phone_number, email, password, all strings
  registerUser: async (req, res) => {
    const db = req.app.get('db');
    const { phone_number, email, password } = req.body;
    const user = await db.find_email_and_phone_number([email, phone_number]);
    if (user.length > 0) {
      return res
        .status(400)
        .send({ message: "Email or phone number already in use" });
    }
    if (phone_number.length !== 10) {
      return res
        .status(400)
        .send({ message: "Not a valid phone number length" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    db.register_new_user([email, phone_number, hash])
      .then(result => {
        delete result[0].password;
        req.session.user = result[0];
        res.status(200).send({
          message: "Registration Successful!",
          user: req.session.user,
          loggedIn: true
        });
      })
      .catch(err => {
        res.status(500).send({ message: "Failed to register" });
      });
  },
  //inputs need to be passed back as phone_number, email, password, all as strings
  loginUser: async (req, res) => {
    const db = req.app.get("db");
    const { email, phone_number, password } = req.body;
    const user = await db.find_email_and_phone_number([email, phone_number]);
    if (user.length === 0) {
      return res.status(200).send({ message: "username not found" });
    }
    const result = bcrypt.compareSync(password, user[0].password);
    if (result) {
      delete user[0].password;
      req.session.user = user[0];
      return res
        .status(200)
        .send({ message: "logged in", user: req.session.user, loggedIn: true });
    } else {
      return res.status(200).send({ message: "Failed Login" });
    }
  },
  logoutUser: (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: "logged out", loggedIn: false });
  }
};
