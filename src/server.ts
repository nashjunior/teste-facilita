import { server } from "./app";

const loadApp = async () => {
  try {

    server.log.info(`🗄️ Started all Databases`);
    server.listen(
      {
        port: Number.parseInt(process.env.PORT ?? '4000', 10),
        host: '0.0.0.0',
      },
      async err => {
        if (err) throw err;
      },
    );
  } catch (error) {
    server.log.error((error as Error).message);

    process.exit(1);
  }
};

loadApp()
