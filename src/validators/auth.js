const Joi = require('joi')

const registerCustomer = Joi.object({
    full_name: Joi.string().min(2).max(50).optional(),
    address: Joi.string().min(2).max(100).optional(),
    phone_number: Joi.string()
        .pattern(/^(?:\+84|0)[3-9]\d{8}$/)
        .required(),
    email: Joi.string().email().required(),
    account: Joi.string().alphanum().min(6).max(20).required(),
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{}|\\:;"',.<>/?-]).{8,30}$/)
        .required(),
    confirm_password: Joi.string().valid(Joi.ref('password')).required(),
})

const login = Joi.object({
    account: Joi.string().alphanum().min(6).max(20).required(),
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{}|\\:;"',.<>/?-]).{8,30}$/)
        .required(),
})

module.exports = {
    registerCustomer,
    login,
}
