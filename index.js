import express from "express"; // npm install express
import cors from "cors"; // npm install cors
import ProvinceRouter from "./src/controllers/province-controller.js";
import CategoryRouter from "./src/controllers/categories-controller.js";
import UsersRouter from "./src/controllers/users-controller.js";
import EventRouter from "./src/controllers/event-controller.js"

const app = express();
const port = 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/provinces", ProvinceRouter);
app.use("/api/event-category", CategoryRouter);
app.use("/api/user", UsersRouter);
app.use("/api/event", EventRouter);

//Inicio el server y lo pongo a escuchar

app.listen(port, () => {
    console.log(`Example app listening on por ${port}`)
})