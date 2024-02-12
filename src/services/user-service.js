const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.findUserByEmail = (email) => {
  prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};
