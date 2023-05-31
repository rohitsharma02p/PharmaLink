const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const { PatientDTO } = require("../DTOs/index");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  options.populate = "profile";
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const createProfile = catchAsync(async (req, res) => {
  const frontDocument =
    req.files["healthInsurance[frontDocument]"] && [0]["location"];
  const backDocument =
    req.files["healthInsurance[backDocument]"] && [0]["location"];
  const medicalLicense = req.files["medicalLicense"] && [0]["location"];
  const tradeLicense = req.files["tradeLicense"] && [0]["location"];
  const vatCertificate = req.files["vatCertificate"] && [0]["location"];
  const pharmacistMedicalLicense =
    req.files["pharmacistMedicalLicense"] && [0]["location"];
  if (req.body.healthInsurance) {
    req.body.healthInsurance.frontDocument = frontDocument;
    req.body.healthInsurance.backDocument = backDocument;
  }
  req.body.medicalLicense = medicalLicense;
  req.body.tradeLicense = tradeLicense;
  req.body.vatCertificate = vatCertificate;
  req.body.pharmacistMedicalLicense = pharmacistMedicalLicense;
  req.body.user = req.user._id;
  const profile = await userService.createProfile(req.body);
  return res
    .status(201)
    .json({ message: "Profile created successfully", profile });
});

const getProfile = catchAsync(async (req, res) => {
  const profile = await userService.getProfileById(req.user.profile);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Profile of this user not found");
  }
  res.send(profile);
});
const createReport = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "report field cannot be empty");
  }

  let fileurl;
  if (req.file) {
    fileurl = req.file.location;
  }
  console.log(req.file);
  const data = {
    name: req.body.name,
    report: fileurl ? fileurl : "",
    user: req.user?._id
  };
  const report = await userService.createReport(data);
  return res
    .status(201)
    .json({ message: "Report created successfully", report });
});

const getReports = catchAsync(async (req, res) => {
  const reports = await userService.getUserReportsById(req.params.userId);
  if (!reports) {
    throw new ApiError(httpStatus.NOT_FOUND, "Reports not found");
  }
  res.send(reports);
});

const getReportDetail = catchAsync(async (req, res) => {
  const reportDetail = await userService.getUserReportById(req.params.reportId);
  if (!reportDetail) {
    throw new ApiError(httpStatus.NOT_FOUND, "Report Detail not found");
  }
  res.send(reportDetail);
});

const addMedicine = catchAsync(async (req, res) => {
  await userService.addMedicine(req.body,req.params.reportId);
  res.status(200).json({ success: true, data: req.body });
});

const scanReport = catchAsync(async (req, res) => {

  const reportDetail = await userService.getScannedReportById(req.params);
  if (!reportDetail) {
    throw new ApiError(httpStatus.NOT_FOUND, "Report Detail not found");
  }
  res.send(reportDetail);
});
const getScanedReports = catchAsync(async (req, res) => {
  const reports = await userService.getScannedReports(req.params.pharmacyId);
  if (!reports) {
    throw new ApiError(httpStatus.NOT_FOUND, "Reports not found");
  }
  res.send(reports);
});

const getMedicines = catchAsync(async (req, res) => {
  const medicines = await userService.getMedicinesbyReportsId(req.params.reportId);
  if (!medicines) {
    throw new ApiError(httpStatus.NOT_FOUND, "Medicines not found");
  }
  res.send(medicines);
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createProfile,
  createReport,
  getReports,
  getReportDetail,
  getProfile,
  addMedicine,
  scanReport,
  getScanedReports,
  getMedicines
};
