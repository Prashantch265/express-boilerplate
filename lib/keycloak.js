const keycloak = require("keycloak-connect");
const { keycloakConfig } = require("../config/config");
const HttpException = require("../utils/HttpException");
const { logger } = require("../utils/logger");

let keycloakConnectClient;

const initKeycloak = (memoryStore) => {
  if (!memoryStore) {
    logger.warn("memoryStore is required to initiate keycloak");
    return -1;
  }
  logger.info("initalizing keycloak");
  keycloakConnectClient = new keycloak({ store: memoryStore }, keycloakConfig);
  keycloakConnectClient.accessDenied = (req, res) => {
    if (Object.keys(req.kauth) === 0) {
      throw new HttpException(401, "notAuthenticated", "keycloak");
    } else {
      throw new HttpException(403, "notAuthorized", "keycloak");
    }
  };
  return keycloakConnectClient;
};

module.exports = { initKeycloak };
