import { physicianService } from '../../services/physician.service.js';


export default {
    Query: {
        physicians: async () => {
            return await physicianService.getAll();
        },
    }
};
