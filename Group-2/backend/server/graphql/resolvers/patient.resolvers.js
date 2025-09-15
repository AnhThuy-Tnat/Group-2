import { patientService } from '../../services/patient.service.js';


export default {
    Query: {
        patients: async (_, { page, limit, filter }) => {
            return await patientService.getAll(page, limit, filter);
        },
        patient: async (_, { id }) => {
            return await patientService.getById(id);
        }
    },
    Mutation: {
        createPatient: async (_, { input }) => {
            return await patientService.create(input);
        },
        updatePatient: async (_, { id, input }) => {
            return await patientService.update(id, input);
        },
        deletePatient: async (_, { id }) => {
            return await patientService.delete(id);
        }
    },
};
