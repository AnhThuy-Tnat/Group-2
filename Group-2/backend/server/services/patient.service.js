import { Patient } from "../models/patient.model.js";
import { Physician } from "../models/physician.model.js";

export const patientService = {
    getAll: async (page = 1, limit = 10, filter = "") => {
        const skip = (page - 1) * limit;

        const condition = {};
        if (filter) {
            condition.email = { $regex: filter, $options: "i" };
        }

        const total = await Patient.countDocuments(condition);
        const patients = await Patient.find(condition)
            .sort({ name: 1 })
            .skip(skip)
            .limit(limit);
        await Patient.populate(patients, { path: "physician" });
        return {
            data: patients,
            total,
            totalPages: Math.ceil(total / limit),
        };
    },
    create: async (input) => {
        const emailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(input.email)) {
            throw new Error(`Email ${input.email} không hợp lệ`);
        }
        const physicianExists = await Physician.findById(input.physician);
        if (!physicianExists) {
            throw new Error(`Physician with id ${input.physician} does not exist`);
        }
        const newPatient = await new Patient(input).save();
        return await newPatient.populate("physician");
    },
    getById: async (id) => {
        const patient = await Patient.findById(id);
        if (!patient) {
            throw new Error(`Patient with id ${id} does not exist`);
        }
        return await patient.populate("physician");
    },
    update: async (id, input) => {
        const emailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(input.email)) {
            throw new Error(`Email ${input.email} không hợp lệ`);
        }
        const patient = await Patient.findById(id);
        if (!patient) {
            throw new Error(`Patient with id ${id} does not exist`);
        }
        if (input.physician) {
            const physicianExists = await Physician.findById(input.physician);
            if (!physicianExists) {
                throw new Error(`Physician with id ${input.physician} does not exist`);
            }
        }
        Object.assign(patient, input);
        const updatedPatient = await patient.save();
        return await updatedPatient.populate("physician");
    },
    delete: async (id) => {
        const patient = await Patient.findById(id);
        if (!patient) {
            throw new Error(`Patient with id ${id} does not exist`);
        }
        await Patient.findByIdAndDelete(id);
        return true;
    }
};
