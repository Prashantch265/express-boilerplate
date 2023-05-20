const glob = require("glob");
const { logger } = require("../utils/logger");
const j2s = require("joi-to-swagger");
const swaggerAutogen = require("swagger-autogen")();

const schemas = {};

const joiObjects = glob.sync(__dirname + `/../core/**/*.validation.js`);

joiObjects.forEach((obj) => {
  if (process.env.NODE_ENV === "development") {
    logger.info("Validation Schema :: " + obj);
  }

  const schema = require(obj);

  for (const key in schema) {
    schemas[key] = j2s(schema[key]).swagger;
  }
});

const swaggerOptions = {
  info: {
    title: "API Documentation", // Title of your API
    description: "Documentation for Express Boilerplate API", // Description of your API
    version: "1.0.0", // Version of your API
  },
  host: "localhost:3000", // Host and port where your API is running
  basePath: "/", // Base path of your API
  schemes: ["http", "https"], // Schemes used by your API (http, https, etc.)
  consumes: ["application/json"], // Types of data your API consumes
  produces: ["application/json"], // Types of data your API produces
  "@definitions": schemas,
};

const outputFile = `${__dirname}/../doc/swagger-output.json`;
const endpointsFiles = glob.sync(`${__dirname}/../core/**/*.route.js`);

// Function to generate the Swagger specification
module.exports = () => {
  swaggerAutogen(outputFile, endpointsFiles, swaggerOptions)
    .then(() => console.log("Swagger specification generated successfully!"))
    .catch((error) =>
      console.error("Error generating Swagger specification:", error)
    );
};
