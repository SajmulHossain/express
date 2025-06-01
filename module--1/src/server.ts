import app from "./app";
import { client } from "./config/mongodb";
const port = 3000;

let server;
const bootstrap = async () => {
  await client.connect();
  await console.log('Mongodb connected');
    server = app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
}

bootstrap();