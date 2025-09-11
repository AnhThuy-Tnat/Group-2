import { Physician } from "../../models/physician.model.js";

export const physicianService = {
    getAll: async () => {
        return await Physician.find();
    },
    create: async (input) => {
        const newPhysician = new Physician(input);
        return await newPhysician.save();
    },
};
