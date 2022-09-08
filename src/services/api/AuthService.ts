import { IUserAuth, IUserConfirm, IUserLogin } from '../../types/user';
import { GuestService } from './GuestService';

// import { IUserAuth } from '../types/user';

class AuthAPIService extends GuestService {
  public async signUp(profile: IUserAuth) {
    return this.post('users/', profile);
  }

  public async login(profile: IUserLogin) {
    return this.post('jwt/create/', profile);
  }

  public async confirmRegistration(profile: IUserConfirm) {
    return this.post('users/activation/', profile);
  }

  // public async getUsers(profile: IUserAuth) {
  //   return this.get('users/');
  // }

  // public async getMyUser() {
  //   return this.get('users/me/');
  // }

  public async deleteUser(id: number) {
    return this.remove(`users/${id}`);
  }

  public async refreshToken(refresh: string) {
    // const data = new FormData();

    // data.append('refresh', refreshToken);

    return this.post('jwt/refresh/', { refresh });
  }
}

export const AuthService = new AuthAPIService();
