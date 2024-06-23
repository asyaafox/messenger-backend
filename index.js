import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

import api from "./api.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", api);

app.use("/docs", swaggerUi.serve);
app.get("/docs", swaggerUi.setup(swaggerDocument));
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`Server listening on http://localhost:${PORT}`);
});
