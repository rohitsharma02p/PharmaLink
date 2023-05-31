const httpStatus = require("http-status");
const { User, Profile, Report, Medicine } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id).populate("profile");
};
const getRefreshUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};
const updateReportById = async (reportId, pharmacyId) => {
  await Report.findByIdAndUpdate(
    reportId,
    { $push: { pharmacies: pharmacyId } },
    { new: true }
  );
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

const createProfile = async (profileBody) => {
  const filter = { user: profileBody.user };
  const update = { $set: { ...profileBody } };
  const options = { new: true, upsert: true, useFindAndModify: false };

  const profile = await Profile.findOneAndUpdate(filter, update, options);
  const { _id } = profile;
  await updateUserById(profileBody.user, { profile: _id });
  return profile;
};

const getProfileById = async (id) => {
  return Profile.findById(id);
};

const createReport = async (report) => {
  return Report.create(report);
};

const getUserReportsById = async (user) => {
  return Report.find({ user: user }).select("-pharmacies");
};
const getUserReportById = async (id) => {
  return Report.findById(id);
};

const addMedicine = async (medicineBody, reportId) => {
  if (Array.isArray(medicineBody)) {
    for (let medicine of medicineBody) {
      await Medicine.create({
        ...medicine,
        reportId
      });
    }
  }
  return;
};

const getScannedReportById = async (params) => {
  const { reportId, pharmacyId } = params;
  const report = await Report.findById(reportId).select("-pharmacies");
  await updateReportById(reportId, pharmacyId);
  return report;
};
const getScannedReports = async (pharmacyId) => {
  return await Report.find({ pharmacies: pharmacyId }).select("-pharmacies");
};
const getMedicinesbyReportsId = async (reportId) => {
  return await Medicine.find({ reportId })
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  createProfile,
  getRefreshUserById,
  createReport,
  getUserReportsById,
  getUserReportById,
  getProfileById,
  addMedicine,
  getScannedReportById,
  getScannedReports,
  getMedicinesbyReportsId
};
