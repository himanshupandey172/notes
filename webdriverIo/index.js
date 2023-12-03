let person = {
  firstName: "Tim",
  lastName: "Allen",
  fullName: function () {
    return this.firstName + this.lastName;
  },
};

console.log(person.fullName());

for (let i in person) {
  console.log(person[i]);
}
