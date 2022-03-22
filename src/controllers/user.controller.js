const express = require('express');
const { body, validationResult } = require('express-validator')
const router = express.Router();

router.post('/', 
body("name").trim().not().isEmpty().withMessage("name cannot be empty").isLength({min:3}).withMessage("name must be at least 3 characters"),
body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
body("password")
.not()
.isEmpty()
.withMessage("Password is required")
.custom((value) => {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
  if (!value.match(passw)) {
    throw new Error("Password must be strong");
  }
  return true;
})
.custom((value, { req }) => {
  if (value !== req.body.confirmPassword) {
    throw new Error("Password and confirm password should match");
  }
  return true;
}),
async(req, res) => {
    try {
        console.log(body("name"));

        //this part will copy the documentation from the express-validator
        const errors =validationResult(req);

        console.log({errors}); 

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

        const user = await User.create(req.body);

        return res.status(201).send(user);
    }catch(err) {
        return res.status(400).send({message: err.message});
    }
})
module.exports =router;