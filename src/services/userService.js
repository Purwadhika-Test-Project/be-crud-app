class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    const users = await this.userRepository.getAll();
    return users;
  }

  async getUser(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async updateUser(id, username, email) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedUser = {
      id: existingUser.id,
      username: username || existingUser.username,
      email: email || existingUser.email,
      password: existingUser.password,
    };

    await this.userRepository.update(updatedUser);
    return updatedUser;
  }

  async deleteUser(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(id);
    return user;
  }
}

module.exports = UserService;
