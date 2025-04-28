import { Prisma } from "@prisma/client";

export type id = Promise<Prisma.UserGetPayload<{
    select: {
        id: true
    }
}>>

export type rawNumber = Prisma.PrismaPromise<number>