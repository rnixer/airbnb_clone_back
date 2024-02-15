const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// exports.updatePlaceById = (data, id) =>
//   prisma.property.update({ data, where: { property_name: "a" } });

exports.createPlace = (input) => prisma.property.create({ data: input });
exports.findPropertyName = (propertyName) =>
  prisma.property.findFirst({
    where: {
      property_name: propertyName,
    },
  });
exports.findMobilePromptpay = (mobilePromptpay) =>
  prisma.property.findFirst({
    where: {
      mobile_promptpay: mobilePromptpay,
    },
  });
