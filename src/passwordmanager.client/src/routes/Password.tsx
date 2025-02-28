import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Password as PasswordType } from "../models/password";
import { PasswordService } from "../services/password";
import LeftArrowIcon from "../components/icons/LeftArrowIcon";
import DeleteIcon from "../components/icons/DeleteIcon";
import CopyIcon from "../components/icons/CopyIcon";

const Password = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState<PasswordType | null>(null);
  const passwordService = new PasswordService();

  useEffect(() => {
    fetchPassword(id);
  }, []);

  async function fetchPassword(id: string | undefined) {
    let password: PasswordType;
    if (id && id !== "0") {
      password = (await passwordService.getPassword(parseInt(id))) ?? {
        id: 0,
        name: "",
        username: "",
        password: "",
      };
    } else {
      password = {
        id: 0,
        name: "",
        username: "",
        password: "",
      };
    }
    setPassword(password);
  }

  const handleSavePassword = async () => {
    let consoleMessage = "";
    if (password?.id) {
      const result = await passwordService.updatePassword(password);
      consoleMessage = result ? "Password updated" : "Password not updated";
    } else {
      const result = await passwordService.createPassword(password!);
      consoleMessage = result ? "Password created" : "Password not created";
    }
    console.log(consoleMessage);
    navigate("/");
  };

  const handleDeletePassword = async () => {
    let consoleMessage = "";
    if (password?.id) {
      const result = await passwordService.deletePassword(password.id);
      consoleMessage = result ? "Password deleted" : "Password not deleted";
    }
    console.log(consoleMessage);
    navigate("/");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log("Copied to clipboard:", text);
  };

  return (
    <div>
      <Link
        to="/"
        className="flex items-center gap-1 font-medium text-sm text-gray-800 hover:text-gray-700"
      >
        <LeftArrowIcon />
      </Link>

      <div className="mt-6 mb-3 flex justify-end items-center">
        <button
          className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={handleDeletePassword}
        >
          <DeleteIcon className="size-4 fill-red-600" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Name
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="text"
              name="name"
              id="name"
              value={password?.name || ""}
              onChange={(e) =>
                setPassword((prev) =>
                  prev ? { ...prev, name: e.target.value } : null
                )
              }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <button
              onClick={() => password?.name && handleCopy(password.name)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <CopyIcon />
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Username
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="text"
              name="username"
              id="username"
              value={password?.username || ""}
              onChange={(e) =>
                setPassword((prev) =>
                  prev ? { ...prev, username: e.target.value } : null
                )
              }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <button
              onClick={() =>
                password?.username && handleCopy(password.username)
              }
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <CopyIcon />
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Password
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="text"
              name="password"
              id="password"
              value={password?.password || ""}
              onChange={(e) =>
                setPassword((prev) =>
                  prev ? { ...prev, password: e.target.value } : null
                )
              }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <button
              onClick={() =>
                password?.password && handleCopy(password.password)
              }
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <CopyIcon />
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSavePassword}
            className="mt-6 rounded-md bg-[#2C2CFF] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Password;
