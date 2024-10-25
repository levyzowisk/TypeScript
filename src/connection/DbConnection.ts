// import { PrismaClient } from "../../node_modules/.prisma/client/index";
import { PrismaClient } from '@prisma/client';

class DbConnection {
    
    private constructor() {}

    public static getConnection(): PrismaClient {
        
        return new PrismaClient() ;

    }

 }

 export default DbConnection.getConnection();
