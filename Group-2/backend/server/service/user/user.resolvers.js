import { getUsers, getUserById, createUser } from "./user.service.js";

export const userResolvers = {
    Query: {
        users: getUsers,
        user: (_, { id }) => getUserById(id),
    },
    Mutation: {
        createUser: (_, args) => createUser(args),
    },
};
