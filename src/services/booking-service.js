const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createBooking = (data) =>
  prisma.booking.create({
    data,
  });

exports.getBookedList = (userId) =>
  prisma.booking.findMany({
    where: { user_id: userId },
    select: {
      checkin_date: true,
      checkout_date: true,
      total_price: true,
      user_id: true,

      property: {
        select: {
          property_name: true,
          address: true,
          image: true,
          id: true,
        },
      },
    },
  });

//   const userCheckinDate = new Date();  // รับค่าจาก user
// const userCheckoutDate = new Date(); // รับค่าจาก user

// const result = await prisma.$queryRaw`
//   SELECT DISTINCT p.property_name
//   FROM propertys p
//   WHERE p.id NOT IN (
//     SELECT DISTINCT b.property_id
//     FROM bookings b
//     WHERE (
//       (b.checkin_date BETWEEN ${userCheckinDate} AND ${userCheckoutDate})
//       OR (b.checkout_date BETWEEN ${userCheckinDate} AND ${userCheckoutDate})
//       OR (${userCheckinDate} BETWEEN b.checkin_date AND b.checkout_date)
//       OR (${userCheckoutDate} BETWEEN b.checkin_date AND b.checkout_date)
//     )
//   );
// `;

// console.log(result);