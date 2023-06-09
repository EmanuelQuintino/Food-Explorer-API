import { userAdmin } from "../src/configs/userAdmin";
import { prisma } from "../src/databases";
import bcrypt from "bcrypt";

async function createdAdminUser() {
  try {
    if (!userAdmin.email || !userAdmin.password) {
      throw new Error('As variáveis de ambiente ADMIN_EMAIL ou ADMIN_PASSWORD não estão definidas');
    }

    const existingAdminUser = await prisma.users.findUnique({ where: { email: userAdmin.email } });
    if (existingAdminUser) {
      console.error('Usuário admin já existe!');
      return;
    }

    const passwordHash = await bcrypt.hash(userAdmin.password, 10);
    const createdAdminUser = await prisma.users.create({
      data: {
        name: userAdmin.name,
        email: userAdmin.email,
        password: passwordHash,
        is_admin: userAdmin.isAdmin
      }
    });
    console.log('Usuário admin criado com sucesso:', createdAdminUser);
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
  }
}

createdAdminUser();
