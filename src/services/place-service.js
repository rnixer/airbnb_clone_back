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

exports.getAllMyPlace = (userId) =>
  prisma.property.findMany({
    where: { user_id: userId },
  });

exports.getAllPlace = () => prisma.property.findMany();

exports.filter = (checkInDate, checkOutDate, num_guests) =>
  prisma.$queryRaw`select distinct(p.property_name)
, p.id , p.address,p.description,p.image,p.nightly_price
 from bookings b right join propertys p on b.property_id = p.id

   WHERE (  b.checkin_date IS NULL and checkout_date is null )
      or ( b.checkin_date  and b.checkout_date not between ${checkInDate} and ${checkOutDate})
         and ( ${checkInDate} and ${checkOutDate} not between b.checkin_date  and b.checkout_date  )
         and ${num_guests} <= p.num_guests
         `;
