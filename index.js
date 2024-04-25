import express from "express"; // npm install express
import cors from "cors"; // npm install cors
import ProvinceRouter from "./controllers/province-controller.js"

const app = express();
const por = 3000;

//Middlewares
app.use(cors());
app.use(express.json());

//Endpoints

app.use("/api/province", ProvinceRouter);

//Inicio el server y lo pongo a escuchar

app.listen(port, () => {
    console.log(`Example app listening on por ${port}`)
});