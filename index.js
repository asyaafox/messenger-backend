import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


import api from "./core/api.js";
import "./core/sync.js";


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", api);


app.use("/docs", swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use((err, req, res, next) => { // why this doesn't work ??!?!?!?!?!?!?!?!??!
  console.error("!!!!!!!!!!!!!!!!!!");
  console.error("Error in root, you doing something wrong!");
  res.status(500).json({ error: "Internal server error" });
})
app.listen(PORT, () => {  
  console.log(`Server listening on http://${process.env.SERVER_ADRESS}:${PORT}`);
  console.log(`Swagger on http://${process.env.SERVER_ADRESS}:${PORT}/docs`)
});
