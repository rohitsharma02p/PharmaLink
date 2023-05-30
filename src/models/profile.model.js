const mongoose = require("mongoose");
const { paginate,toJSON } = require("./plugins");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  mobileNumber: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  dateOfBirth: {
    type: Date
  },
  bloodGroup: {
    type: String
  },
  registrationID:{
    type: String
  },
  registrationDate:{
    type: String
  },

  pharmacyName: {
    type: String
  },
  medicalLicenseNumber: {
    type: String
  },
  medicalLicense: {
    type: String
  },
  tradeLicenseNumber: {
    type: String
  },
  tradeLicense: {
    type: String
  },
  trnNumber: {
    type: String
  },
  vatCertificate: {
    type: String
  },
  pharmacistInChargeName: {
    type: String
  },
  pharmacistEmailAddress: {
    type: String
  },
  pharmacistContactNumber: {
    type: String
  },
  pharmacistMedicalLicenseNumber: {
    type: String
  },
  pharmacistMedicalLicense: {
    type: String
  },
  haveHealthInsurance: {
    type: Boolean
  },
  healthInsurance:{
    insuranceCompany: {
      type: String,

    },
    policyNumber: {
      type: String,

    },
    tpa: {
      type: String,

    },
    frontDocument: {
      type: String,

    },
    backDocument: {
      type: String,

    }
  },
  address: {
    houseNo_streetName_area: {
      type: String
    },
    colony_locality: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
    zipPostalCode: {
      type: String
    }
  },
  additionalMobileNumber: {
    type: String
  }
});
profileSchema.plugin(toJSON);
profileSchema.plugin(paginate);

profileSchema.statics.isProfileCreated = async function (
  userId,
  excludeUserId
) {
  const profile = await this.findOne({
    user: userId,
    _id: { $ne: excludeUserId }
  });
  return !!profile;
};

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
