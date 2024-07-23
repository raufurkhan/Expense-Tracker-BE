const path = require("path");
const User = require("../models/userModel");
exports.getLoginPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "public", "views", "login.html"));
};

exports.postUserSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;


  
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        res.status(409).send(`<script>
            alert('Account for this email already exists');
            window.location.href='/'
        </script>`);
      } else {
        User.create({
          name: name,
          email: email,
          password: password,
        });
        res
          .status(200)
          .send(`<script>alert('User created Successfully')</script>`);
      }
    })
    .catch((err) => console.log(err));
};

exports.postUserLogin = (req, res, next) => {
  const email = req.body.loginEmail;
  const password = req.body.loginPassword;

  User.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      if (user.password == password) {
        res
          .status(200)
          .send(
            `<script>alert('Login Successful!'); window.location.href='/'</script>`
          );
      } else {
        res
          .status(401)
          .send(
            `<script>alert('Password Incorrect!'); window.location.href='/'</script>`
          );
      }
    } else {
      res
        .status(404)
        .send(
          `<script>alert("User doesn't Exists!"); window.location.href='/'</script>`
        );
    }
  });

  
};