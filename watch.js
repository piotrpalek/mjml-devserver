const bs = require("browser-sync").create();
const build = require('./build');

build();

bs.watch("**/*.{hbs,js}").on("change", function(event, file) {
  try {
    build();
    bs.reload();
    console.log('\nTemplate compiled.\n')
  } catch(e) {
    bs.notify("Error: please check console for more details", 90000);
    console.error('\n\nError occured: \n\n', e);
  }
});

bs.init({
    server: "./mail"
});
