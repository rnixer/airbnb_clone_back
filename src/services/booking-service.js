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
