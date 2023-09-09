'use client'

export const SignIn = () => {

  return (
    <form action={"/api/user/signin"} method='POST'>
      <label>
        Email:
        <input 
          type="email"
          name = "email"
        />
      </label>

      <label>
        Password: 
        <input
          type="password" 
          name = "password"
        />
      </label>

      <button type="submit">Sign In</button>
    </form>
  );
}
