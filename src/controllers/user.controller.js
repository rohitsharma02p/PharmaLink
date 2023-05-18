const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const {PatientDTO} = require("../DTOs/index")
// console.log(patientDTO("HI there"))
  // Sample usage of the PatientDTO
  const patientName = { firstName: "John", lastName: "Doe" };
  const address = {
    street: "123 Main St",
    city: "City",
    state: "State",
    postalCode: "12345"
  };
  const email = { emailAddress: "johndoe@example.com" };
  const phoneNumber = { phoneNumber: "123-456-7890" };
  const uploadedReport = {
    reportName: "Report.pdf",
    fileType: "PDF",
    fileSize: "1.2MB"
  };

  // const patient = new PatientDTO(
  //   patientName,
  //   address,
  //   email,
  //   phoneNumber,
  //   uploadedReport
  // );
// console.log(patient)

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
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
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createProfile
};
