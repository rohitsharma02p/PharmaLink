const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid("user", "admin", "patient", "pharmacy")
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
      name: Joi.string(),
      status: Joi.string()
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
    firstName: Joi.string().required(),
    lastName: Joi.string().optional(),
    mobileNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    gender: Joi.string().valid("male", "female", "other"),
    dateOfBirth: Joi.date().iso(),
    bloodGroup: Joi.string()
      .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
      .required(),
      registrationID:Joi.string(),
      registrationDate:Joi.date().iso(),
      pharmacyName:Joi.string(),
      medicalLicenseNumber:Joi.string(),
      medicalLicense:Joi.string(),
      tradeLicenseNumber:Joi.string(),
      tradeLicense: Joi.string(),
      trnNumber:Joi.string(),
      vatCertificate:Joi.string(),
      pharmacistInChargeName:Joi.string(),
      pharmacistEmailAddress: Joi.string(),
      pharmacistContactNumber: Joi.string(),
      pharmacistMedicalLicenseNumber:Joi.string(),
      pharmacistMedicalLicense:Joi.string(),

    haveHealthInsurance: Joi.boolean().optional(),
    healthInsurance: Joi.object({
      insuranceCompany: Joi.string(),
      policyNumber: Joi.string(),
      tpa: Joi.string(),
      frontDocument: Joi.string(),
      backDocument: Joi.string()
    }).when('haveHealthInsurance', { is: true, then: Joi.required() }),
    address: Joi.object({
      houseNo_streetName_area: Joi.string().required(),
      colony_locality: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string(),
      zipPostalCode: Joi.string()
    }).required(),
    additionalMobileNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .optional(),
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
