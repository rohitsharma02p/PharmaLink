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
  options.populate = "user";
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
  req.body.user = req.user._id;
  const profile = await userService.createProfile(req.body);
  return res
    .status(201)
    .json({ message: "Profile created successfully", profile });
});

const createReport = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "report field cannot be empty");
  }

  let fileurl;
  if (req.file) {
    fileurl = req.file.location;
  }
  const data = {
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

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createProfile,
  createReport,
  getReports,
  getReportDetail
};
