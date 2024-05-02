import express from "express"; // npm install express
import cors from "cors"; // npm install cors
import ProvinceRouter from "./src/controllers/province-controller.js"

const app = express();
const port = 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/provinces", ProvinceRouter);

//Inicio el server y lo pongo a escuchar

app.listen(port, () => {
    console.log(`Example app listening on por ${port}`)
});