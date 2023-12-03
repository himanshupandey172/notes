class TestObjects {
  async browserUrl(path) {
    return await browser.url(path);
  }

  get userName() {
    return $("//input[@id='username']");
  }

  get userPassword() {
    return $("//input[@id='password']");
  }

  get signInButton() {
    return $("//input[@id='signInBtn']");
  }

  async Login(username, password) {
    await this.browserUrl("https://rahulshettyacademy.com/loginpagePractise/");
    await this.userName.setValue(username);
    await this.userPassword.setValue(password);
    await this.signInButton.click();
  }
}

module.exports = new TestObjects();
