class PatientDTO {
  constructor(name, address, email, phoneNo, uploadReport) {
    this.PatientName = name;
    this.Address = address;
    this.Email = email;
    this.PhoneNo = phoneNo;
    this.UploadReport = uploadReport;
  }
}
module.exports = PatientDTO 
