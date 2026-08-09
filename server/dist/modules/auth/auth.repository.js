import { UserModel } from "./user.model.js";
export class AuthRepository {
    async findByEmail(email) {
        return UserModel.findOne({ email: email.toLowerCase() });
    }
    async findByEmailWithPassword(email) {
        return UserModel.findOne({ email: email.toLowerCase() }).select("+password");
    }
    async findById(id) {
        return UserModel.findById(id);
    }
    async createUser(dto) {
        return UserModel.create({
            name: dto.name,
            email: dto.email,
            password: dto.password,
            provider: "local",
        });
    }
    async incrementTokenVersion(id) {
        await UserModel.updateOne({ _id: id }, { $inc: { tokenVersion: 1 } });
    }
}
//# sourceMappingURL=auth.repository.js.map