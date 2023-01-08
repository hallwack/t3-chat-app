import React from "react";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-100">
      <div className="rounded-md bg-blue-200 p-8">
        <div className="flex flex-col items-start justify-center">
          <h1>Login</h1>
          <div>
            <div>
              <label className=""></label>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
