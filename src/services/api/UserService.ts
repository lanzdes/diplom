import { BaseService } from './BaseService';

class UserAPIService extends BaseService {
  public async getUsers() {
    return this.get('');
  }

  public async getMyUser() {
    return this.get('me/');
  }

  public async deleteUser(id: number) {
    return this.remove(`${id}`);
  }
}

export const UserService = new UserAPIService();
