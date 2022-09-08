import axios, { AxiosError, AxiosInstance } from 'axios';

import { projectAxios } from './BaseService';
import { guestService } from './GuestService';
import { AuthService } from './AuthService';

const mutex: {
  isAlreadyFetchingAccessToken: boolean;
  subscribers: Function[];
} = {
  isAlreadyFetchingAccessToken: false,
  subscribers: [],
};

class RefreshTokens {
  private storage: any;
  private error?: AxiosError;

  public constructor(storage: any) {
    this.storage = storage;
    this.error = undefined;
  }

  public async resetTokenAndReattemptRequest(error: AxiosError) {
    try {
      const { response: errorResponse } = error;
      this.error = error;
      const resetToken = localStorage.getItem('refresh');

      if (!resetToken || !errorResponse) {
        return Promise.reject(error);
      }

      const promise = this.retryOriginalRequest();

      if (!mutex.isAlreadyFetchingAccessToken) {
        mutex.isAlreadyFetchingAccessToken = true;
        const response = await AuthService.refreshToken(resetToken);

        if (!response.data) {
          return Promise.reject(error);
        }

        const { access, refresh } = response.data;
        this.storage.setItem('access', access); // save the newly refreshed token for other requests to use
        this.storage.setItem('refresh', refresh); // save the newly refreshed token for other requests to use
        mutex.isAlreadyFetchingAccessToken = false;
        onAccessTokenFetched(access);
      }
      return promise;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  private async retryOriginalRequest() {
    const that = this;
    return new Promise((resolve) => {
      if (this.error && this.error.response) {
        const { config } = this.error.response;

        this.addSubscriber((access_token: string) => {
          if (config.headers) {
            config.headers.Authorization = 'Bearer ' + access_token;
          }
          resolve(projectAxios(config));
        });
      }
    });
  }

  private addSubscriber(callback: Function) {
    mutex.subscribers.push(callback);
  }
}

const onAccessTokenFetched = (access_token: string) => {
  mutex.subscribers.forEach((callback) => callback(access_token));
  mutex.subscribers = [];
};

export const refreshTokensService = RefreshTokens;
