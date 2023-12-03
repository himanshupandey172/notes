let expect = require("chai").expect;
let should = require("chai").should();
let chai = require("chai");
const assertArrays = require("chai-arrays");
chai.use(assertArrays);

describe("All test cases", async () => {
  xit("Frames switching -smoke", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    const link = await $("*=Free");
    await link.waitForExist();
    console.log(await link.getText());
  });

  it("drag and drop -smoke", async () => {
    await browser.url("https://www.globalsqa.com/demo-site/draganddrop/");
    await browser.switchToFrame(
      await $("//iframe[@class='demo-frame lazyloaded']")
    );
    await $("//img[@alt='The peaks of High Tatras']").dragAndDrop({
      x: 500,
      y: 61,
    });

    await browser.pause(3000);
  });

  xit("check sorting -smoke", async () => {
    await browser.url(
      //1. Open the browser URL
      "https://rahulshettyacademy.com/seleniumPractise/#/offers"
    );

    (await $("//tr/th[1]")).click(); //2. Click the sort button

    const veggiesLocator = await $$("//tr/td[1]"); //3. Array of locators
    await browser.pause(3000);

    const veggieNames = await Promise.all(
      //4. All the actual values mapped from Array of locators
      veggiesLocator.map(async (veggie) => await veggie.getText())
    );

    console.log(veggieNames);

    const veggies = veggieNames.slice(); //5. Creates a copy of the above array
    console.log(veggies);

    // const sortedVeggies = await veggies.slice().sort(); //6. Creates a sorted copy of array
    // await browser.pause(3000);

    const reverseVeggies = await veggies.slice().reverse();
    console.log(reverseVeggies);

    expect(veggies).to.deep.not.equal(reverseVeggies); //7. deep equal assertion to match values at index of both arrays

    // console.log(veggieNames[0]); //"Almond"
    // console.log(veggies[0]); //"Almond"

    // let reverseVeggies = veggies.reverse();
    // console.log(reverseVeggies);

    // const reverseVeggies = veggies.slice().reverse();

    // console.log("test");
    // console.log(veggies);
    // console.log(reverseVeggies);

    //expect(veggies).to.equal(reverseVeggies);
  });

  xit("should check the brand logo name", async () => {
    await browser.url(
      "https://rahulshettyacademy.com/seleniumPractise/#/offers"
    );

    let logo = await $(
      "//div[@class='brand greenLogo']//div[@class='brand greenLogo']"
    );

    let logoName = await logo.getText();
    //await browser.pause(3000);

    await expect(logoName).to.equal("GREENKART");
  });

  xit("should validate filter result", async () => {
    await browser.url(
      //1. Open the browser URL
      "https://rahulshettyacademy.com/seleniumPractise/#/offers"
    );

    (await $("#search-field")).setValue("to"); //Enter value in filter to start searching

    const searchResultLocator = await $$("//tr/td[1]"); //All the filtered result locators saved in this variable

    //await browser.pause(3000);

    const paginationButton = $("(//a[@role='button'])[6]");
    await paginationButton.waitForDisplayed({ reverse: true });

    const results = await Promise.all(
      //Get text from the locators
      searchResultLocator.map(async (result) => await result.getText())
    );

    function removeDuplicates(arr) {
      return [...new Set(arr)]; //Use Set method to remove duplicate items from the array
    }

    const newArray = removeDuplicates(results); //New array with only unique items

    console.log(removeDuplicates(results)); //Display this new array in console

    console.log(Object.keys(newArray).length); //Check length of this new array

    expect(newArray).to.have.lengthOf(2); //assertion for checking length of the array
    expect(newArray[1]).to.equal("Totato"); //assertion for checking value of string
  });

  xit("should validate sum of all item price in cart", async () => {
    const products = ["iphone X", "Blackberry"];

    await browser.url("https://rahulshettyacademy.com/angularpractice/shop");

    const cards = await $$("//div[@class='card h-100']");

    for (let i = 0; i < (await cards.length); i++) {
      //Title will be inside this variable
      const card = await cards[i].$("div h4 a");

      // 4. if products array includes card Title text it will return true
      if (products.includes(await card.getText())) {
        console.log("True");
        //perform click operation based on true IF condition
        await cards[i].$(".card-footer button").click();
      }
    }

    await $("*=Checkout").click();

    const productsPrices = await $$("//tr//td[4]//strong");

    await browser.pause(3000);

    const sumOfProducts = await Promise.all(
      productsPrices.map(
        async (productPrice) =>
          await (await productPrice.getText()).split(".")[1].trim() //remove special character and whitespace from string
      )
    );

    const sumOfProductsNumbers = sumOfProducts.map((ele) => parseInt(ele)); //convert into string to integer

    const productPriceInt = sumOfProductsNumbers.reduce(
      (acc, sum) => acc + sum //sum of all items in array
    );

    const totalPrice = await (
      await $("td[class='text-right'] h3 strong")
    ) //get textTotal price locator
      .getText();

    const totalPriceInt = parseInt(totalPrice.split(".")[1].trim()); //split and trim

    await expect(productPriceInt).to.equal(totalPriceInt); //assertion

    await $(".btn.btn-success").click();

    await $("#country").setValue("ind");

    await $(".lds-ellipsis").waitForExist({ reverse: true });

    await $("=India").click();

    await $("//input[@value='Purchase']").click();

    expect(await $(".alert").getText()).to.have.string("Success");

    await browser.pause(3000);
  });

  xit("should input value in shadow element", async () => {
    await browser.url("https://webdriver.io/docs/api/element/getCSSProperty");

    await browser.pause(2000);

    const locator = await $("//img[@alt='WebdriverIO']");

    console.log("test");
    console.log(await locator.getCSSProperty("height"));
  });

  xit("should add items to cart", async () => {
    await browser.url("https://www.amazon.in/");

    //Navigate to search box and input text to search
    const searchBox = await $("//input[@id='twotabsearchtextbox']").setValue(
      "shoes"
    );

    //await browser.pause(3000);
    //We wait for search result container to appear
    $(
      "//body/div[@id='a-page']/header[@id='navbar-main']/div[@id='navbar']/div[@id='nav-flyout-iss-anchor']/div[@id='nav-flyout-searchAjax']/div[@class='autocomplete-results-container']/div[1]"
    ).waitForDisplayed({
      timeout: 3000,
      timeoutMsg: "Element did not display after 3 seconds",
    });

    const allSearchedItems = await $$(
      "//div[@class='autocomplete-results-container']//div//div[@class='s-suggestion-container']//div//span[@class='s-heavy']"
    );

    const allSearchedItemsText = Promise.all(
      allSearchedItems.map(async (items) => await items.getText())
    );

    console.log(allSearchedItems);

    console.log("test");
    console.log((await $("(//span[@id='glow-ingress-line2'])[1]")).getText());

    await browser.pause(3000);
  });
});
