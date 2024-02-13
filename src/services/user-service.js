const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.findUserByEmail = (email) =>
  prisma.user.findFirst({
    where: {
      email: email,
    },
  });
// console.log(email);

exports.createUser = (input) => prisma.user.create({ data: input });

exports.findUserById = (id) => prisma.user.findFirst({ where: { id } });
