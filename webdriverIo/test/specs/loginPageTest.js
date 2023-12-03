const login = require("../pageObjects/loginPageObjects");
const fs = require("fs");
let credentials = JSON.parse(fs.readFileSync("test_data/LoginTest.json"));

describe("JSON datasets testing ", async () => {
  // credentials.forEach(({ username, password }) => {
  //   xit("should Open Browser URL and input credentials to access it", async () => {
  //     await browser.url("/loginpagePractise/");
  //     await login.Login(username, password);
  //     await browser.pause(3000);
  //   });
  // });
  it("Frames switching -Sanity", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    const link = await $("*=Free");
    await link.waitForExist();
    await expect(browser).toHaveTitleContaining(
      "LoginPage Practise | Rahul Shetty Academy"
    );
    console.log(`curr window 1: ${await browser.getWindowHandle()}`);
    console.log("title1: " + (await browser.getTitle()));
    //const elem = await $("//p/b/i[@xpath]");
    const elem = await $("//a[@class='blinkingText']");
    await elem.waitForDisplayed();
    await elem.click();
    await browser.pause(3000);
    console.log(`curr window 2: ${await browser.getWindowHandle()}`);
    // console.log(`type: ${typeof handles}`);
    // const handle = handles.map((handle) => handle);
    //console.log(`handles : ${handle}`);
    //await browser.switchToWindow("17957911DE44C53ED0CD76769F89814B");
    console.log("title2: " + (await browser.getTitle()));

    //await expect(elem).toExist();
    //await expect(link).toHaveTextContaining("234")
    //await browser.pause(3000)
  });
});
