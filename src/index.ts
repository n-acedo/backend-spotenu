import express from "express";
import { AddressInfo } from "net";
import cors from "cors";
import { userRouter } from "./routes/UserRouter";
import { bandRouter } from "./routes/BandRouter";

const app = express();


app.use(express.json());
app.use(cors())
app.use("/users/", userRouter);
app.use("/bands", bandRouter)

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
