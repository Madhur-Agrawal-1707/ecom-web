import { UserModel } from "./user.model.js";
import type { IUser } from "./auth.interfaces.js";
import type { RegisterDto } from "./auth.types.js";

export class AuthRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email: email.toLowerCase() });
  }

  async findByEmailWithPassword(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email: email.toLowerCase() }).select("+password");
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  async createUser(dto: RegisterDto): Promise<IUser> {
    return UserModel.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      provider: "local",
    });
  }

  async incrementTokenVersion(id: string): Promise<void> {
    await UserModel.updateOne({ _id: id }, { $inc: { tokenVersion: 1 } });
  }
}