const OtpConfigRepository = require("./otp-config.repository");
const { HttpException } = require("../../exceptions/index");

const addOtpConfig = async (payload) => {
  const existingConfig = await OtpConfigRepository.findOneByField({
    type: payload.type,
  });
  if (existingConfig)
    throw new HttpException(400, "duplicateData", "otp-config");
  return await OtpConfigRepository.addOtpConfig(payload);
};

const getOtpConfigById = async (id) => {
  const data = await OtpConfigRepository.findOneByField({ id: id });
  if (!data) throw new HttpException(400, "notFound", "otp-config");
  return data;
};

const getAllOtpConfigs = async () => {
  return await OtpConfigRepository.findAll();
};

module.exports = { getOtpConfigById, getAllOtpConfigs, addOtpConfig };
