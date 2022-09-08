import { IFilmSendRequest } from '../../types/films';
import { BaseService, projectAxios } from './BaseService';

class FilmsAPIService extends BaseService {
  public async getMyFilms() {
    return this.get('my_films/');
  }

  public async sendFilm({ image, text, title, lesson_num }: IFilmSendRequest) {
    const { headers } = await this.getHeaders();
    if (this.credentials?.URL) {
      const { URL } = this.credentials;

      const formData = new FormData();
      formData.append('image', image.file as Blob);
      formData.append('text', text);
      formData.append('title', title);
      formData.append('lesson_num', String(lesson_num));

      return await projectAxios.post(`${URL}/blog/films/`, formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
      });
    }
  }
}

export const FilmsService = new FilmsAPIService();
