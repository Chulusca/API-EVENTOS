import express from "express";
import cors from "cors";
import ProvinceRouter from "./src/controllers/province-controller.js";
import CategoryRouter from "./src/controllers/categories-controller.js";
import UsersRouter from "./src/controllers/users-controller.js";
import EventRouter from "./src/controllers/event-controller.js";
import EventEnrollmentRouter from "./src/controllers/event-enrollment-controller.js";
import EventLocationRouter from "./src/controllers/event-locations-controller.js";
import LocationsRouter from './src/controllers/locations-controller.js';
import ngrok from "@ngrok/ngrok";
import 'dotenv/config';

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/provinces", ProvinceRouter);
app.use("/api/event-category", CategoryRouter);
app.use("/api/user", UsersRouter);
app.use("/api/event", EventRouter);
app.use("/api/event/enrollment", EventEnrollmentRouter);
app.use("/api/event-location", EventLocationRouter);
app.use("/api/location", LocationsRouter);

// Inicio el server y lo pongo a escuchar
app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);

    // Configuración de ngrok
    try {
        const listener = await ngrok.forward({
            addr: port,
            authtoken: process.env.NGROK_AUTHTOKEN, // Use the environment variable
            domain: "pheasant-primary-sincerely.ngrok-free.app" // Use the static IP
        });
        console.log(`Ingress established at: ${listener.url()}`);
    } catch (error) {
        console.error("Error establishing ngrok tunnel:", error);
    }
});