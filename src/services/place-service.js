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
  prisma.$queryRaw` select p.id,p.property_name , p.num_guests
  , b.checkin_date,b.checkout_date 
  from bookings b right join  propertys p on b.property_id = p.id  where p.id not in (select p.id
 --   , p.id,b.property_id , p.address,b.checkin_date,b.checkout_date,b.total_price,p.num_guests -- บรรทัดนี้เอาออกซะ
  from bookings b right join  propertys p on b.property_id = p.id
 where 
 ${checkInDate} between b.checkin_date and b.checkout_date 
 or (${checkInDate}  < b.checkin_date and ${checkOutDate} >  b.checkout_date )
 or ( ${checkOutDate} between b.checkin_date and  b.checkout_date )
 or ( ${checkInDate} and ${checkOutDate} between b.checkin_date and  b.checkout_date))
 and ${num_guests} <= p.num_guests  `;
