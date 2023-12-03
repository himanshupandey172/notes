const amazon = require("./../pageObjects/testObjects");

describe("UAT testing ", async () => {
  // credentials.forEach(({ username, password }) => {
  //   xit("should Open Browser URL and input credentials to access it", async () => {
  //     await browser.url("/loginpagePractise/");
  //     await login.Login(username, password);
  //     await browser.pause(3000);
  //   });
  // });
  xit("uat test --switchToWindow", async () => {
    await browser.url("/loginpagePractise/");
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
    // browser.waitUntil(
    //   function () {
    //     const state = browser.execute(function () {
    //       return document.readyState;
    //     });
    //     //console.log("state:" + state)
    //     return state === "complete";
    //   },
    //   {
    //     timeout: 60000, //60secs
    //     timeoutMsg: "Oops! Check your internet connection",
    //   }
    // );
    //await browser.pause(3000);
    const handles = await browser.getWindowHandles();
    console.log(`handles: ${handles}`);
    await browser.switchToWindow(handles[1]);
    //await browser.switchToWindow("/documents-request");
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

  xit("uat test2 --switchWindow", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    console.log("title1:" + (await browser.getTitle()));

    await browser.newWindow("https://google.com");
    console.log("goog:" + (await browser.getTitle()));
    await browser.switchWindow(
      "https://rahulshettyacademy.com/loginpagePractise/"
    );
    console.log("title2:" + (await browser.getTitle()));
  });

  xit("uat test3 --find all anchor tags", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    const anchorTags = await $$("//a");
    console.log("number of anchor tags: " + anchorTags.length);
  });

  xit("uat test4 --switch to iframe and hover on its element", async () => {
    //await browser.maximizeWindow();
    await browser.url("https://rahulshettyacademy.com/AutomationPractice/");

    const elem = await $("//button[@id='mousehover']");

    await elem.scrollIntoView({ block: "start" });

    await elem.moveTo();

    //await elem.scrollIntoView();
    await browser.pause(3000);
    // await browser.elementHover(elem);
    // await browser.switchToFrame(await $("//iframe[@id='courses-iframe']"));
    // const iframeElement = await $("//a[@class='dropdown-toggle']");
    // await browser.elementHover(iframeElement);
  });

  xit("will add items in shopping cart", async () => {
    const products = ["iphone X", "Blackberry"];
    //await browser.maximizeWindow();
    await browser.url("https://rahulshettyacademy.com/angularpractice/shop");

    //xpath = //div[@class='card h-100']
    //css = .card.h-100
    await $(".card.h-100").waitForExist();

    const cards = await $$(".card.h-100");

    for (let i = 0; i < cards.length; i++) {
      //xpath = //div[@class ='card-body']/h4/a or //div/h4/a
      //css = div h4 a
      const card = await cards[i].$("//div[@class ='card-body']/h4/a");
      console.log(`cards: ${await card.getText()}`);

      // if (products.includes(await card.getText())) {
      //   console.log("True");
      //   (await cards[i].$("//div[@class ='card-footer']/button")).click();
      // }
      if (products.includes(await card.getText())) {
        console.log("True");
        //perform click operation based on true IF condition
        //xpath = //div[@class = 'card-footer']/button //2 iphone added in cart
        //css = .card-footer button
        await cards[i].$("//div[@class = 'card-footer']/button").click();
      }
    }

    (await $("//a[@class = 'nav-link btn btn-primary']")).click();

    await browser.pause(3000);
  });

  it("it should find product on page", async () => {
    await browser.url("https://www.amazon.in/your-account");
    const searchtextbox = await $("#twotabsearchtextbox");
    await searchtextbox.setValue("Laptop");

    await $("//div[@class='s-suggestion-container']").waitForExist();

    const suggestionText = await $$(
      "//div[@class='s-suggestion s-suggestion-ellipsis-direction']"
    );

    await suggestionText[5].click();

    // for (let i = 0; i < suggestionText.length; i++) {
    //   if ((await suggestionText[i].getText()) == "laptop under 20000") {
    //     await suggestionText[5].click();
    //   }
    // }

    (await $("//span[@class='a-price-whole']")).waitForExist();

    const prices = await $$("//span[@class='a-price-whole']");

    let all_prices_text = await Promise.all(
      prices.map(async (price) => (await price.getText()).replace(",", ""))
    );
    console.log(`all Prices: ${typeof all_prices_text}`);
    console.log(`all Prices2: ${all_prices_text}`);

    // let all_prices_int = all_prices_text.map((price) => parseInt(price));

    let filterInt = function (array = []) {
      return array.map((a1) => parseInt(a1));
    };

    let all_prices_int = filterInt(all_prices_text);

    console.log(`all Prices int: ${typeof all_prices_int}`);
    console.log(`all Prices int2: ${all_prices_int}`);

    // await browser.pause(2000);
  });
});
