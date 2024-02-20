const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createPayment = (data) =>
  prisma.payment.create({
    data,
  });
