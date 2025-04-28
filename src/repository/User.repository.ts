import { userRegister } from "../interfaces/user.interface";
import { AbstractRepositoy } from "./Abstract.repository";
import { rawNumber, id } from "../types/UserTypes";

// Procurar usar o Prisma.GetPayLoad do prisma definir uma combinação de select ou junção mais complexas.
class UserRepository extends AbstractRepositoy {

    saveUser(user: userRegister): id  {
        try {
            // Fazer querys no sql puro. E verificar os tipos de dados.
            return this.getConnection().user.create({
                data: {
                    ...user
                },
                select: {id: true}
            })
        } catch(error) {
            throw error;
        }
    }

    findUnique(email: string): rawNumber {
        try {
            return this.getConnection().$executeRaw`SELECT EXISTS (SELECT 1 FROM User WHERE email = ${email})`;
        } catch(error) {
            throw error;
        }
    }

    verifiedEmail(id: number): void {
        try {
            this.getConnection().$executeRaw`UPDATE User SET email_verified = true WHERE id = ${id}`;
        } catch(error) {
            throw error;
        }
    }

    checkEmailIsVerify(email: string) {
        try {
            return this.getConnection().$executeRaw`SELECT EXISTS (SELECT 1 FROM User WHERE email = ${email} AND email_verified = true)`
        } catch (error) {
            throw error;
        }
    }

    checkEmailEquals(id: number, email: string) {
        try {
            return this.getConnection().$executeRaw`SELECT EXISTS(SELECT 1 FROM User WHERE email = ${email} AND id = ${id})`;
        } catch(error) {
            throw error;
        }
    }

    findById(id: number): id {
        try {
            return this.getConnection().$queryRaw`SELECT id FROM User WHERE id = ${id}`;
        } catch(error) {
            throw error;
        }
    }

}

export default new UserRepository;