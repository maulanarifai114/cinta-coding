import React from "react";
import { Link, To } from "react-router-dom";

interface IBackButton extends React.HTMLAttributes<HTMLElement> {
  to: To;
}

export default function BackButton({ to, ...props }: IBackButton) {
  return (
    <Link to={to} className="w-fit-content" {...props}>
      <button className="btn btn-primary btn-icon p-0 rounded-circle d-flex justify-content-center align-items-center">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
    </Link>
  );
}
