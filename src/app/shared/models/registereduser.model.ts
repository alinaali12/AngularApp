export class RegisteredUser {
  public id: number;
  public name: string;
  public email_address: string;
  public phone_number: number;
  public job_type: string;
  public password: string;
  public file_name: string;

  public deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}