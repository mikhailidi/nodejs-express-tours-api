export default class User {
  public id: number;

  constructor(public name: string, public email: string) {
    this.id = Math.floor(Math.random() * 100) + Math.random();
  }
}
