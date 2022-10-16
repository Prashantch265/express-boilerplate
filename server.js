const app = require("./app");
const { port } = require("./config/config");
const { logger } = require("./utils/logger");

app.listen(port, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${process.env.NODE_ENV} =======`);
  logger.info(`🚀 App listening on the port ${port}`);
  logger.info(`=================================`);
});
