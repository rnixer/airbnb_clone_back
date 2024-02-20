const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createPayment = (data) =>
  prisma.payment.create({
    data,
  });

exports.getPaymentByPayerId = (
  payerId
) => prisma.$queryRaw` select pro.id, pro.property_name , pro.user_id as createId ,pa.id,pa.status, b.id,b.total_price,u.name,u.id as payerId ,b.image as slipImage from  propertys pro join payment pa on pa.property_id = pro.id join users u on pa.user_id = u.id join bookings b on pa.booking_id = b.id   where (select pro.user_id from propertys pro join payment pa on pa.property_id = pro.id 
  where ${payerId} = pa.user_id  ) `;
