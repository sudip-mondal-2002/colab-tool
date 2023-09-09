'use client'

export const Signup = () => {

 
  return (
    <form action={"/api/user/signup"} method='POST'>

      <label>
        Name:
        <input
          type="text"
          name="name"
        />
      </label>

      <label>
        Email:
        <input
          type="email"  
          name="email"
        />  
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
        />
      </label>

      <button type="submit">Signup</button>

    </form>
  );
}
