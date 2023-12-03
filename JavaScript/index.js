function HtmlElement() {
  this.click = function () {
    console.log("clicked");
  };
}

HtmlElement.prototype.focus = function () {
  console.log("focus");
};

function HtmlSelectElement(arr) {
  this.arr = arr;

  this.addItem = function (num) {
    this.arr.push(num);
    return this.arr;
  };

  this.removeItem = function (num) {
    const index = this.arr.indexOf(num);
    if (index > -1) {
      this.arr.splice(index, 1);
    }
    return this.arr;
  };
}

const s = new HtmlSelectElement([1, 2]);

s.addItem(3);
s.removeItem(3);
console.log(s.arr);
