// async function someAsyncOperation() {
//   await new Promise((resolve) => setTimeout(resolve("THis is value"),3000));
// //  return await new Promise((resolve) => setTimeout(resolve("foo"), 900000));
//   // const fun = setTimeout(() => {
//   //   console.log("Hi there");
//   // }, 5000);

// }

// async function myAsyncFunction() {
//   let val =  someAsyncOperation();
//   console.log(val,"jjjjjjjjjj");
// }
// myAsyncFunction();



class PatientDTO {
  constructor(name, address, email, phoneNumber, uploadedReport) {
    this.name = name;
    this.address = address;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.uploadedReport = uploadedReport;
  }
}

// Sample usage of the PatientDTO
const patientName = { firstName: 'John', lastName: 'Doe' };
const address = { street: '123 Main St', city: 'City', state: 'State', postalCode: '12345' };
const email = { emailAddress: 'johndoe@example.com' };
const phoneNumber = { phoneNumber: '123-456-7890' };
const uploadedReport = { reportName: 'Report.pdf', fileType: 'PDF', fileSize: '1.2MB' };

// const patient = new PatientDTO(patientName, address, email, phoneNumber, uploadedReport);
// console.log(patient);
