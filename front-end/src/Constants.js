export const BACKEND_URL = 'http://localhost:8080/api/restaurants';
export class FetchStatus {
  static Success = new FetchStatus('Success');
  static Loading = new FetchStatus('Loading');
  static Failure = new FetchStatus('Failure');

  constructor(name) {
    this.name = name;
  }
}
