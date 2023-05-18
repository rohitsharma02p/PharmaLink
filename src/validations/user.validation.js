const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid("user", "admin","patient")
  })
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId)
  })
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string()
    })
    .min(1)
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId)
  })
};

const createProfile = {
  body: Joi.object({
    firstName:Joi.string(),
    lastName:Joi.string(),
    mobileNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    dateOfBirth: Joi.date().iso().required(),
    bloodGroup: Joi.string()
      .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
      .required(),
    timezone: Joi.string().required(),
    address: Joi.object({
      houseNo: Joi.string().required(),
      streetName: Joi.string().required(),
      area: Joi.string().required(),
      colony: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      pincode: Joi.string()
        .length(6)
        .pattern(/^[0-9]+$/)
        .required()
    }),
    additionalMobileNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .optional(),
    language: Joi.string().required()
  })
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createProfile
};
