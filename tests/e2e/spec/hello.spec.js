module.exports = {
  "Test Hello World Exmaple" : function (browser) {
    browser
      .url("http://localhost:8080/examples/hello.html")
      .waitForElementVisible('body', 1000)
      .assert.containsText('#hello', 'Hello World!')
      .end();
  }
};