/*global require,process */
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5867;
const app = express();

(async () => {
  app.use(helmet());
  app.use("/public", express.static("public"));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await app.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
