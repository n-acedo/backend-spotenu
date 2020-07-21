export class RefreshToken {
  constructor(
    private token: string,
    private device: string,
    private is_active: number,
    private user_id: string
  ) {}

  public getToken(): string {
    return this.token;
  }

  public getDevice(): string {
    return this.device;
  }

  public getIsActive(): number {
    return this.is_active;
  }

  public getUserId(): string {
    return this.user_id;
  }
}