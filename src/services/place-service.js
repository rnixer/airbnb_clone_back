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

exports.getAllMyPlace = (userId) =>
  prisma.property.findMany({
    where: { user_id: userId },
  });

exports.deletePlace = (id) =>
  prisma.property.delete({
    where: { id: id },
  });

exports.editPlace = (id, data) =>
  prisma.property.update({
    where: {
      id,
    },
    data: data,
  });
