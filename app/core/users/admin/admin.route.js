const AdminController = require("./admin.controller");
const validator = require("@middlewares/joi.middleware");
const { createAdminSchema, updateAdminSchema } = require("./admin.validation");

module.exports = (router) => {
  router.route("/admins").get(AdminController.getAllAdmins);

  router
    .route("/admins")
    .post(validator(createAdminSchema), AdminController.createAdmin);

  router
    .route("/admins/:userId")
    .get(AdminController.getAdminById)
    .put(validator(updateAdminSchema), AdminController.updateAdmin)
    .delete(AdminController.deleteAdmin);
};
