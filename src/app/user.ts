export class User {
  name: string;
  email: string;
  password: string;
  college: string;
  contact: string;
  address: string;

  constructor(name, email, password, college, contact, address) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.college = college;
    this.contact = contact;
    this.address = address;
  }
}
