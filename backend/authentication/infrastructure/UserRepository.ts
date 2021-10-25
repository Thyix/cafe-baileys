import { PrismaClient } from "@prisma/client";
import UserDto from "./UserDto";

class UserRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  public async addUser(user: UserDto): Promise<void> {
    await this.client.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    });
  }
}

export default UserRepository;
