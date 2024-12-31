const SignUp = () => {
  return (
    <form className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Sign-Up</h1>
          <p className="text-balance text-muted-foreground">
            Enter your info to create an account
          </p>
        </div>
        <div className="grid gap-2">
          <label htmlFor="email">Username</label>
          <input
            className="input input-bordered w-full"
            id="username"
            placeholder="jhon"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            className="input input-bordered w-full"
            id="email"
            type="email"
            placeholder="jhon@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <label htmlFor="password">Password</label>
          </div>
          <input
            className="input input-bordered w-full max-w-xs"
            id="password"
            type="password"
            required
          />
        </div>
        <button type="submit" className="w-full btn btn-outline">
          Create an Account
        </button>
      </div>
    </form>
  );
};
export default SignUp;