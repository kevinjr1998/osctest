/** @format */
import { PrismaClient } from '@prisma/client';
let prisma;
// @ts-ignore
if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
}
// @ts-ignore
prisma = global.prisma;
export default prisma;
