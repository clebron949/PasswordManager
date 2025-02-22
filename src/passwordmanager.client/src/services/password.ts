import { Password as PasswordType } from "../models/password";

export class PasswordService {
  async getPasswords() {
    const response = await fetch("/api/passwords");
    return response.ok ? (await response.json()) as PasswordType[] : [];
  }

  async getPassword(id: number) {
    const response = await fetch(`/api/passwords/${id}`);
    return response.ok ? (await response.json()) as PasswordType : null;
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
