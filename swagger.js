import swaggerAutogen from "swagger-autogen";
const doc = {
  info: {
    title: "Connect API",
    description: "Description",
  },
  basePath: "/",
  host: `${process.env.SERVER_ADRESS}:${process.env.PORT}`,
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Enter your bearer token in the format **Bearer &lt;token&gt;**",
    },
  },
  definitions: {
    Login: {
      $username: "username",
      $password: "password",
    },
    AddUser: {
      $username: "username",
      $fullName: "Full Name",
      $password: "password",
    },
  },
};

const outputFile = "./swagger.json";
const routes = ["./index.js"];
await swaggerAutogen()(outputFile, routes, doc);
await import("./index.js");
