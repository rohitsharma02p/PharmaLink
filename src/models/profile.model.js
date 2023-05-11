const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
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
  timeZone: {
    type: String
  },
  address: {
    houseNo: {
      type: String
    },
    streetName: {
      type: String
    },
    area: {
      type: String
    },
    colony: {
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
    pincode: {
      type: String
    }
  },
  additionalMobileNumber: {
    type: String
  },
  language: {
    type: String
  }
});

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
