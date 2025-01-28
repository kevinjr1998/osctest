import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from "node:fs";
import { GraphQLError } from 'graphql';
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const typeDefs = readFileSync('./src/schema.graphql', { encoding: 'utf-8' });
//
const verifyToken = async (token) => {
    if (token) {
        // decode token
        const decoded = jwt.verify(token, process.env.SECRET, async function (err, decoded) {
            console.log(err, decoded);
            //  try to find user
            const founduser = await prisma.user.findUnique({
                where: {
                    id: decoded.userId
                }
            });
            //  no user found, throw error, reject request
            if (!founduser) {
                throw new GraphQLError("Invalid User", err);
            }
        });
        //      throw error and reject if not verified user
    }
    else {
        throw new GraphQLError("Invalid token");
    }
};
// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        courses: async (parent, args, contextValue) => {
            const { limit, sortOrder } = args;
            // query database using args passed from query
            const foundCourses = await prisma.courses.findMany({
                take: limit,
                orderBy: sortOrder ? [
                    {
                        courseTitle: sortOrder,
                    }
                ] : []
            });
            // return result
            return foundCourses;
        },
        course: async (parent, args, contextValue) => {
            const course = await prisma.courses.findUnique({
                where: {
                    id: args.id
                }
            });
            return course;
        },
        collections: async () => {
            const categories = await prisma.categories.findMany({});
            return categories;
        },
        collection: async (parent, args, contextValue) => {
            const categories = await prisma.categories.findUnique({
                where: {
                    id: args.id
                },
                include: { courses: true }
            });
            return categories;
        }
    },
    Mutation: {
        register: async (parent, args, context) => {
            // creates user using args passed through mutation
            const createdUser = await prisma.user.create({
                data: {
                    username: args.username,
                    password: args.password
                }
            });
            return { user: createdUser };
        },
        login: async (parent, args, context) => {
            const foundUser = await prisma.user.findFirst({
                where: {
                    username: args.username,
                    password: args.password
                }
            });
            //  sign token using secret
            const token = jwt.sign({ userId: foundUser.id }, process.env.SECRET, { expiresIn: '1h' });
            return { token, user: foundUser };
        },
        addCourse: async (parent, args, context) => {
            await verifyToken(context.token);
            const { input } = args;
            const { courseTitle, courseDescription, courseDuration, courseOutcome, category } = input;
            let foundCategory = undefined;
            // find category using category string provided, could also theoretically use id of category, but id may not always be same
            foundCategory = await prisma.categories.findFirst({
                where: {
                    category: {
                        equals: category?.category
                    }
                }
            });
            //  add course
            const addedCourse = await prisma.courses.create({
                data: {
                    courseTitle: courseTitle,
                    courseDescription: courseDescription,
                    courseDuration: courseDuration,
                    courseOutcome: courseOutcome,
                    ...foundCategory?.id ? {
                        category: {
                            connect: {
                                id: foundCategory?.id || undefined,
                            }
                        }
                    } : {},
                }
            });
            return addedCourse;
        },
        updateCourse: async (parent, args, context) => {
            await verifyToken(context.token);
            const { id, input } = args;
            const { courseTitle, courseDescription, courseDuration, category, courseOutcome } = input;
            const foundCategory = await prisma.categories.findFirst({
                where: {
                    category: {
                        equals: category?.category
                    }
                }
            });
            const updatedCourse = await prisma.courses.update({
                where: {
                    id: id
                },
                include: {
                    category: true
                },
                data: {
                    courseTitle: courseTitle,
                    courseDescription: courseDescription,
                    courseDuration: courseDuration,
                    courseOutcome: courseOutcome,
                    ...foundCategory?.id ? {
                        category: {
                            connect: {
                                id: foundCategory?.id,
                            }
                        }
                    } : {},
                }
            });
            return updatedCourse;
        },
        deleteCourse: async (parent, args, context) => {
            await verifyToken(context.token);
            const deletedCourse = await prisma.courses.delete({
                where: {
                    id: args.id
                },
                include: {
                    category: true
                },
            });
            return deletedCourse;
        }
    }
};
const context = async ({ req }) => {
    const token = req.headers.authorization || '';
    //  reject request if no token provided
    if (!token)
        return "Invalid Token";
    try {
        // verify and decode token
        const decoded = jwt.verify(token, process.env.SECRET);
        //  find user using token
        const foundUser = await prisma.user.findFirst({
            where: {
                id: decoded.userId
            }
        });
        //  no user found, throw error, reject request
        if (!foundUser)
            throw new GraphQLError('User is not authenticated', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                }
            });
        return { token };
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    context
});
console.log(`🚀 Server ready at ${url}`);
