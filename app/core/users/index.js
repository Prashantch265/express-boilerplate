module.exports = {
  controllers: {
    adminUserController: require("./admin/admin.controller"),
    corporateUserController: require("./corporate-users"),
    normalUserController: require("./normal-users"),
    organizationController: require("./organizations"),
  },
  services: {
    adminUserService: require("./admin/admin.service"),
    corporateUserService: require("./corporate-users"),
    normalUserService: require("./normal-users"),
    organizationService: require("./organizations"),
  },
  repositories: {},
};
