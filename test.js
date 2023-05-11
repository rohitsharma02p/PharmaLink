async function someAsyncOperation() {
  await new Promise((resolve) => setTimeout(resolve("THis is value"),3000));
//  return await new Promise((resolve) => setTimeout(resolve("foo"), 900000));
  // const fun = setTimeout(() => {
  //   console.log("Hi there");
  // }, 5000);

}

async function myAsyncFunction() {
  let val =  someAsyncOperation();
  console.log(val,"jjjjjjjjjj");
}
myAsyncFunction();
