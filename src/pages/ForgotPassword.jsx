import { useState } from "react";
import { Link } from "react-router";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  function onChange(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    toast.success("Email was sent");
    try {
    } catch (error) {
      toast.error("Could not send reset password");
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="w-full md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://plus.unsplash.com/premium_photo-1726863173328-9437d391141a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGtleXxlbnwwfHwwfHx8MA%3D%3D"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out"
              type="text"
              id="email"
              value={email}
              placeholder="Email Address"
              onChange={onChange}
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have a account?
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Sign in insted
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-2 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-900"
              type="submit"
            >
              Send reset Password
            </button>
            <div
              className=" flex my-4 before:border-t  before:flex-1 items-center before:border-gray-300
          after:border-t  after:flex-1 items-center after:border-gray-300"
            >
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
