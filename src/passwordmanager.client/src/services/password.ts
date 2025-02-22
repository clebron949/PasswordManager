import { Password as PasswordType } from "../components/models/password";

export class PasswordService {
  async getPasswords() {
    const response = await fetch("/api/passwords");
    return (await response.json()) as PasswordType[];
  }

  async getPassword(id: number) {
    const response = await fetch(`/api/passwords/${id}`);
    return (await response.json()) as PasswordType;
  }

  async createPassword(password: PasswordType) {
    const response = await fetch("/api/passwords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(password),
    });
    return response.ok;
  }

  async updatePassword(password: PasswordType) {
    const response = await fetch(`/api/passwords/${password.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(password),
    });
    return response.ok;
  }

  async deletePassword(id: number) {
    const response = await fetch(`/api/passwords/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  }
}
