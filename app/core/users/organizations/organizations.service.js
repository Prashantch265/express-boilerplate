const OrganizationsRepository = require("./organizations.repository");
const { NotFoundException } = require("@exceptions");

const getOrganizationById = async (id) => {
  const organization = await OrganizationsRepository.getById(id);
  if (!organization) throw new NotFoundException("Organization not found");
  return organization;
};

module.exports = { getOrganizationById };
