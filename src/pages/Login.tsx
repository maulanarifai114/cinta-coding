import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Users } from "../models/users";
import http from "../services/http";

interface Login {
  username: string;
  password: string;
  error: string;
}

export default function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, setError, clearErrors } = useForm<Login>();
  const onSubmit: SubmitHandler<Login> = async (data) => {
    if (data.username.toLowerCase() !== data.password.toLowerCase()) {
      setError("error", { message: "Password Wrong" });
      return;
    }

    const users = (await http.get<Users[]>("/users")).data;
    const account = users.find((user) => user.username.toLowerCase() === data.username.toLowerCase());
    if (!account) {
      setError("error", { message: "Account not found" });
      return;
    }

    localStorage.setItem("account", JSON.stringify(account));
    navigate("/dashboard");
  };

  const onChange = () => clearErrors();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container text-center h-100 d-flex align-items-center justify-content-center flex-column">
      <h4 className="mb-5">Login Page</h4>
      <div className="width-login">
        {formState.errors.username && <p className="mb-2 text-danger text-start">{formState.errors.username.message}</p>}
        <input {...register("username", { required: { message: "Username Required *", value: true }, onChange })} className={`form-control ${formState.errors.username ? "mb-2" : "mb-4"}`} type="text" placeholder="username" />
        {formState.errors.password && <p className="mb-2 text-danger text-start">{formState.errors.password.message}</p>}
        <input {...register("password", { required: { message: "Password Required *", value: true }, onChange })} className="form-control mb-4" type="password" placeholder="password" />

        <button className={`btn btn-primary fw-bold w-100 ${formState.errors.error && "mb-4"}`}>Login</button>

        {formState.errors.error && <p className="mb-2 text-danger">{formState.errors.error.message}</p>}
      </div>
    </form>
  );
}
