import DataLoader from 'dataloader';
import { Physician } from '../../models/physician.model.js';

export default function PhysicianLoader() {
    return new DataLoader(async (ids) => {
        const physicians = await Physician.find({ _id: { $in: ids } });

        const physicianMap = new Map();
        physicians.forEach((p) => {
            physicianMap.set(p._id.toString(), p);
        });

        return ids.map((id) => physicianMap.get(id.toString()));
    });
}
