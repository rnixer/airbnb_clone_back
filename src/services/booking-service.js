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
      payment: {
        select: {
          status: true,
        },
      },
    },
  });

exports.deleteBookingsByPaymentStatus = async () => {
  const bookingToDelete = await prisma.booking.findFirst({
    where: {
      payment: {
        status: "FAILURE",
      },
    },
  });

  // console.log("bookingToDelete", bookingToDelete);
  const result = await prisma.booking.delete({
    where: {
      id: bookingToDelete.id,
    },
  });
  return result;
};
