import { BaseService } from './BaseService';

export class GuestService extends BaseService {
  private storage: Storage;
  constructor() {
    super();
    this.storage = localStorage;
  }

  protected async getHeaders() {
    return {
      headers: {
        Authorization: ``,
      },
    };
  }
}

export const guestService = new GuestService();
