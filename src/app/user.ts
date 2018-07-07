export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  college: string;
  contact: string;
  address: string;

  constructor(id, name, email, password, college, contact, address) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.college = college;
    this.contact = contact;
    this.address = address;
  }
}
