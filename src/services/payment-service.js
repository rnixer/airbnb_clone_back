const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// exports.createPayment = (data) =>
//   prisma.payment.create({
//     data,
//   });

exports.getPaymentByPayerId = (
  payerId
) => prisma.$queryRaw` select pro.id as propertyId , pro.property_name , pro.user_id as createId ,pa.id as paymentId,pa.status, b.id as bookindId,b.total_price,u.name,u.id as payerId ,b.image as slipImage,b.checkin_date,b.checkout_date from  propertys pro join payment pa on pa.property_id = pro.id join users u on pa.user_id = u.id join bookings b on pa.booking_id = b.id    
where ${payerId} = pro.user_id  `;

exports.updatePaymentById = (data, id) =>
  prisma.payment.update({
    where: {
      id,
    },
    data: data,
  });
