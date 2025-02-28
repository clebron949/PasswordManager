import { useState } from "react";
import { PasswordGeneratorService } from "../utils/passwordGenerator";
import CopyIcon from "../components/icons/CopyIcon";
const PasswordGenerator = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const passwordLength = parseInt(formData.get("passwordLength") as string);
    const includeUppercase = formData.get("includeUppercase") ? true : false;
    const includeLowercase = formData.get("includeLowercase") ? true : false;
    const includeNumbers = formData.get("includeNumbers") ? true : false;
    const includeSymbols = formData.get("includeSymbols") ? true : false;

    setPassword(
      PasswordGeneratorService.generate({
        length: passwordLength,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSpecialCharacters: includeSymbols,
      })
    );
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log("Copied to clipboard:", text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-center">Password Generator</h1>
        <div className="flex gap-2 max-w-sm mx-auto">
          <div className="flex-1 border border-gray-300 rounded-md h-10 flex items-center justify-center">
            <span className="text-center font-medium">{password}</span>
          </div>
          <button
            type="button"
            className="hover:cursor-pointer"
            onClick={() => handleCopy(password)}
          >
            <CopyIcon />
          </button>
        </div>
        <div className="flex justify-around">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Password Length</label>
            <input
              name="passwordLength"
              min={1}
              max={100}
              defaultValue={12}
              type="number"
              className="border-2 min-w-52 border-gray-300 rounded-md text-center"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <input
                name="includeUppercase"
                type="checkbox"
                defaultChecked
                className="col-span-2 border-2 border-gray-300 rounded-md self-center"
              />
              <label className="col-span-1">Include Uppercase</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                name="includeLowercase"
                type="checkbox"
                defaultChecked
                className="col-span-2 border-2 border-gray-300 rounded-md self-center"
              />
              <label className="col-span-1">Include Lowercase</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                name="includeNumbers"
                type="checkbox"
                defaultChecked
                className="col-span-2 border-2 border-gray-300 rounded-md self-center"
              />
              <label className="col-span-1">Include Numbers</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                name="includeSymbols"
                type="checkbox"
                defaultChecked
                className="col-span-2 border-2 border-gray-300 rounded-md self-center"
              />
              <label className="col-span-1">Include Symbols</label>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#ce0000] text-white font-semibold px-4 py-2 rounded-md hover:cursor-pointer"
          >
            Generate Password
          </button>
        </div>
      </div>
    </form>
  );
};

export default PasswordGenerator;
