

  class PatientDTO {
    constructor(name, address, email, phoneNumber, uploadedReport) {
      console.log(name, address, email, phoneNumber, uploadedReport)
      this.name = name;
      this.address = address;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.uploadedReport = uploadedReport;
    }
  // }

  // // Sample usage of the PatientDTO
  // const patientName = { firstName: "John", lastName: "Doe" };
  // const address = {
  //   street: "123 Main St",
  //   city: "City",
  //   state: "State",
  //   postalCode: "12345"
  // };
  // const email = { emailAddress: "johndoe@example.com" };
  // const phoneNumber = { phoneNumber: "123-456-7890" };
  // const uploadedReport = {
  //   reportName: "Report.pdf",
  //   fileType: "PDF",
  //   fileSize: "1.2MB"
  // };

  // const patient = new PatientDTO(
  //   patientName,
  //   address,
  //   email,
  //   phoneNumber,
  //   uploadedReport
  // );
  }
module.exports = PatientDTO 
