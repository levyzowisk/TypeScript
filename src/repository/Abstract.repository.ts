import { PrismaClient } from "@prisma/client";

export class AbstractRepositoy {
    private static prismaClient: PrismaClient;

    protected getConnection(): PrismaClient {
        if(!AbstractRepositoy.prismaClient) {
            AbstractRepositoy.prismaClient = new PrismaClient();
        }
        return AbstractRepositoy.prismaClient;
    }
}