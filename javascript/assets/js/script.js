// Loop

// For Loop

let arr_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < 9; i++) {
  console.log(arr_1[i]);
}

// For Each Loop
// Syntax:
// arr_name.forEach(el => {
//     body
// })

arr_1.forEach((el, indx) => console.log(el, indx));

// For in
// Syntax
// for(index in object) {
//     body
// }

let obj_1 = {
  name: "Vladimir Putin",
  designation: "President",
  country: "RSA",
};

for (let i in obj_1) {
  console.log(obj_1[i]);
}

Object.keys(obj_1).forEach((key) => console.log(obj_1[key]));
