import { userRegister } from "../interfaces/user.interface";
import { AbstractRepositoy } from "./Abstract.repository";

class UserRepository extends AbstractRepositoy {

    saveUser(user: userRegister) {
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

    findUnique(email: string) {
        try {
            return this.getConnection().$executeRaw`SELECT EXISTS (SELECT 1 FROM user WHERE email = ${email})`;
        } catch(error) {
            throw error;
        }
    }

    verifiedEmail(id: number) {
        try {
            return this.getConnection().$executeRaw`UPDATE user SET email_verified = true WHERE id = ${id}`;
        } catch(error) {
            throw error;
        }
    }

    findById(id: number) {
        try {
            return this.getConnection().$queryRaw`SELECT id FROM user WHERE id = ${id}`;
        } catch(error) {
            throw error;
        }
    }

}

export default new UserRepository;