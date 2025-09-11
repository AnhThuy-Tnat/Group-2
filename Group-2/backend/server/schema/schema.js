import { userTypeDefs } from "../service/user/user.typeDefs.js";
import { userResolvers } from "../service/user/user.resolvers.js";

import { patientTypeDefs } from "../service/patient/patient.typeDefs.js";
import { patientResolvers } from "../service/patient/patient.resolvers.js";

import { physicianTypeDefs } from "../service/physician/physician.typeDefs.js";
import { physicianResolvers } from "../service/physician/physician.resolvers.js";


export const typeDefs = [userTypeDefs, patientTypeDefs, physicianTypeDefs];
export const resolvers = [userResolvers, patientResolvers, physicianResolvers];