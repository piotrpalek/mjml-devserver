require("@babel/register");
const mjml2html = require('mjml');
const fs = require('fs')
const path = require('path')
const { compile } = require('handlebars');
const prettier = require("prettier");

function requireUncached(module){
  delete require.cache[require.resolve(module)]
  return require(module)
}

function formatJson(jsonString) {
  return prettier.format(jsonString, {
    parser: "json"
  });
}

module.exports = function() {
  const context = requireUncached('./mail/context');
  const rawTemplate = fs.readFileSync(path.resolve(__dirname, 'mail/index.mjml.hbs'), 'utf8')
  const template = compile(rawTemplate);
  const testMjml = template(context);

  const testHtml = mjml2html(testMjml).html;
  const mainHtml = mjml2html(rawTemplate).html;

  fs.writeFileSync(path.resolve(__dirname, 'mail/index.html'), testHtml,'utf8');
  fs.writeFileSync(path.resolve(__dirname, 'mail/prod.html'), mainHtml,'utf8');
  fs.writeFileSync(path.resolve(__dirname, 'mail/contextProd.json'), formatJson(JSON.stringify(context)),'utf8');
}
