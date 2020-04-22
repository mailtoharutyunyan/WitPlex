import UserService from "../service/user-service";

const {check} = require('express-validator');

const RegisterValidator = [
    check('firstName').exists().custom(value => value.length > 0),
    check('lastName').exists().custom(value => value.length > 0),
    check('email', 'Invalid email format , missing <@>').exists().contains('@'),
    check('password', "Password must be at least 6 characters long").exists().custom(
        value => value.length > 6),
    check('username', 'Username exists try another').exists().custom(async value => {
        if (value && value.length > 0) {
            return !await UserService.findByUserName(value);
        }
        return false;
    }),
];
export default RegisterValidator;
