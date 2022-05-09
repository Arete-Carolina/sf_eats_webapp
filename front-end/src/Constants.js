export const BACKEND_URL = 'http://sfeatsbackend-env.eba-puurspjt.us-east-1.elasticbeanstalk.com/api/restaurants';
export class FetchStatus {
  static Success = new FetchStatus('Success');
  static Loading = new FetchStatus('Loading');
  static Failure = new FetchStatus('Failure');

  constructor(name) {
    this.name = name;
  }
}
