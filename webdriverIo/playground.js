// for (let word in words) {
//   console.log(word[6]);
// }

// for (let i = 0; i <= 6; i++) {
//   console.log(words[i]);
// }
function pallindrome(string) {
  let reverseString = string.split("").reverse().join("");
  return reverseString === string ? "Pallindrome" : "Not a Pallindrome";
}

const string = prompt("Enter a string: ");

console.log(pallindrome(string));
