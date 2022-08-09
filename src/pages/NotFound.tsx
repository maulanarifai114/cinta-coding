import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center flex-column ">
      <h1 className="mb-4">404 | Page not found</h1>
      <Link to={"/dashboard"} className="text-decoration-none fw-bold">
        Back to home
      </Link>
    </div>
  );
}
