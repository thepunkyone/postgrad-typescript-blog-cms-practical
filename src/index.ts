import app from "./app";
import getConfig, { Config } from "./config";

const conf: Config = getConfig();

app.listen(conf.port, () => {
  console.log(`app is listening on port ${conf.port}`);
});
