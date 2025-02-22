export const PasswordConstants = {
  UppercaseLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  LowercaseLetters: "abcdefghijklmnopqrstuvwxyz",
  Numbers: "0123456789",
  SpecialCharacters: "!@#$%^&*()_+-=[]{}?",
} as const;

export interface PasswordGeneratorOptions {
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSpecialCharacters?: boolean;
}

export class PasswordGeneratorService {
  public static generate(options: PasswordGeneratorOptions): string {
    const defaultOptions: PasswordGeneratorOptions = {
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSpecialCharacters: true,
      ...options,
    };

    const characters: string[] = [];
    if (defaultOptions.includeUppercase) {
      characters.push(...PasswordConstants.UppercaseLetters.split(""));
    }
    if (defaultOptions.includeLowercase) {
      characters.push(...PasswordConstants.LowercaseLetters.split(""));
    }
    if (defaultOptions.includeNumbers) {
      characters.push(...PasswordConstants.Numbers.split(""));
    }
    if (defaultOptions.includeSpecialCharacters) {
      characters.push(...PasswordConstants.SpecialCharacters.split(""));
    }

    const password: string[] = Array(defaultOptions.length!).fill("");
    for (let i = 0; i < defaultOptions.length!; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password[i] = characters[randomIndex];
    }

    return password.join("");
  }
}
