import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const categories = [
    {category: "Maths"},
    {category: "Physics"},
    {category: "Chemistry"}
]

const courses = [{
    courseTitle: 'Applied Maths'},
    {courseTitle: 'Applied Physics'},
    {courseTitle: 'Applied Maths'},
]


const seed = async () =>{
    await prisma.categories.createMany({data: categories})
    await prisma.courses.createMany({data: courses})
}


seed().catch(console.error)