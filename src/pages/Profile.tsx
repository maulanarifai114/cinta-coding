import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { IUser } from "../models/users";

export default function Profile() {
  const [account, setAccount] = useState<IUser | null>(null);

  useEffect(() => {
    const data: IUser = JSON.parse(localStorage.getItem("account") ?? "{}") ?? null;
    setAccount(data);
  }, []);

  return (
    <div className="width-panel d-flex justify-content-center flex-column mx-auto">
      <BackButton to={"/dashboard"} className="mb-4"></BackButton>

      <table className="table">
        <tbody>
          <tr>
            <td className="color-gray fw-bold">Username</td>
            <td className="color-gray fw-bold">:</td>
            <td className="fw-bold">{account?.username}</td>
          </tr>
          <tr>
            <td className="color-gray fw-bold">Email</td>
            <td className="color-gray fw-bold">:</td>
            <td className="fw-bold">{account?.email}</td>
          </tr>
          <tr>
            <td className="color-gray fw-bold">Address</td>
            <td className="color-gray fw-bold">:</td>
            <td className="fw-bold">
              {account?.address.street}, {account?.address.city}
            </td>
          </tr>
          <tr>
            <td className="color-gray fw-bold">Phone</td>
            <td className="color-gray fw-bold">:</td>
            <td className="fw-bold">{account?.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
