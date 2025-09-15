import { patientTypeDefs } from "../service/patient/patient.typeDefs.js";
import { patientResolvers } from "../service/patient/patient.resolvers.js";

import { physicianTypeDefs } from "../service/physician/physician.typeDefs.js";
import { physicianResolvers } from "../service/physician/physician.resolvers.js";

export const typeDefs = [patientTypeDefs, physicianTypeDefs];
export const resolvers = [patientResolvers, physicianResolvers];