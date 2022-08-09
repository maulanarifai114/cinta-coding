import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IUser } from "../models/users";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [account, setAccount] = useState<IUser | null>(null);

  useEffect(() => {
    const data: IUser = JSON.parse(localStorage.getItem("account") ?? "{}") ?? null;
    if (!data?.id) {
      navigate("/login");
      return;
    }
    setAccount(data);
  }, [location, navigate]);

  return (
    <nav className="d-flex justify-content-between py-4 mb-5">
      <Link to={"/"} className="text-black text-decoration-none">
        <h3 className="fw-bold">Cinta Coding</h3>
      </Link>

      {!account?.id && (
        <Link to={"/login"}>
          <button className="btn btn-primary fw-bold">Login</button>
        </Link>
      )}

      {account?.id && (
        <Link to={"/dashboard"} className="text-black text-decoration-none">
          <h3 className="color-gray">Post</h3>
        </Link>
      )}

      {account?.id && (
        <h3 className="fw-bold">
          Welcome,{" "}
          <Link to={"/profile"} className="text-primary text-decoration-none">
            {account.name}
          </Link>
        </h3>
      )}
    </nav>
  );
}
