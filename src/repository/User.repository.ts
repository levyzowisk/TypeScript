import { userRegister } from "../interfaces/user.interface";
import { AbstractRepositoy } from "./Abstract.repository";
import { rawNumber, id } from "../types/UserTypes";
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

    findById(id: number): id {
        try {
            return this.getConnection().$queryRaw`SELECT id FROM User WHERE id = ${id}`;
        } catch(error) {
            throw error;
        }
    }

}

export default new UserRepository;