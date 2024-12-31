const Login = () => {
  return (
    <form className="p-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-balance text-muted-foreground">
            Login to your account
          </p>
        </div>
        <div className="grid gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="input input-bordered w-full"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <label htmlFor="password">Password</label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <input
            className="input input-bordered w-full max-w-xs"
            id="password"
            type="password"
            required
          />
        </div>
        <button type="submit" className="w-full btn btn-outline">
          Login
        </button>
      </div>
    </form>
  );
};
export default Login;