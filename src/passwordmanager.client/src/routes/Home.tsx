import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { Password } from "../models/password";
import { PasswordService } from "../services/password";

const Home = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const passwordService = new PasswordService();

  useEffect(() => {
    const fetchPasswords = async () => {
      const passwords = await passwordService.getPasswords();
      setPasswords(passwords);
    };
    fetchPasswords();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold tracking-tight">My Passwords</h1>
        <NavLink
          to="/0"
          className="rounded-md bg-[#2C2CFF] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Password
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 my-6">
        <input
          type="text"
          name="account-number"
          id="account-number"
          className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#2C2CFF] sm:pr-9 sm:text-sm/6"
          placeholder="Search ..."
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-gray-400 sm:size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <ul role="list" className="divide-y divide-gray-100">
        {passwords.map((password) => (
          <li key={password.id}>
            <NavLink
              to={`/${password.id}`}
              className="flex items-center gap-x-6 px-3 py-4 cursor-pointer hover:bg-slate-100 hover:rounded-md"
            >
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-gray-500">
                <span className="text-xs font-medium text-white">
                  {password.name.match(/[A-Z]/g)?.join("") ||
                    password.name[0].toUpperCase()}
                </span>
              </span>
              <div className="flex justify-between flex-1">
                <span className="overflow-hidden">{password.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
