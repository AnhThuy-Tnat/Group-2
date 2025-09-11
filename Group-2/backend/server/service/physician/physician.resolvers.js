import { physicianService } from "./physician.service.js";

export const physicianResolvers = {
    Query: {
        physicians: async () => {
            return await physicianService.getAll();
        },
    },
    Mutation: {
        createPhysician: async (_, { input }) => {
            return await physicianService.create(input);
        },
    },
};
