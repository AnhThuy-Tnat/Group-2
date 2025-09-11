import User from "../../models/user.model.js";

export const getUsers = async () => await User.find();
export const getUserById = async (id) => await User.findById(id);
export const createUser = async ({ name, email, password }) => {
    const user = new User({ name, email, password });
    return await user.save();
};
