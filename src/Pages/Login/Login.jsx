import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const { signInWithGoogle, signIn, loading, setLoading, resetPassword } =
    useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      // 1. sign in user
      await signIn(email, password);
      navigate(from);
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) return toast.error("Please write your email first!");
    try {
      await resetPassword(email);
      toast.success("Request Success! Check your email for further process...");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
    console.log(email);
  };

  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();

      navigate(from);
      toast.success("Login Successful!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Vista Elite</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen bg-white px-4">
        <div className="flex flex-col w-full md:max-w-md p-6 rounded-xl sm:p-10 bg-gray-100 text-gray-900 shadow-2xl animate__animated animate__zoomIn">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold uppercase">LogIn!</h1>
            <p className="text-sm text-gray-600">
              Sign in to access your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-md text-gray-600 tracking-wider"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  onBlur={(e) => setEmail(e.target.value)}
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#005DC6] bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="text-md mb-2 text-gray-600 tracking-wider"
                  >
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  id="password"
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-[#005DC6] focus:font-bold bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="bg-[#005DC6] font-semibold tracking-wider w-full rounded-md py-3 text-white"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
          <div className="space-y-1">
            <button
              onClick={handleResetPassword}
              className="text-xs hover:underline hover:text-rose-500 text-gray-400"
            >
              Forgot password?
            </button>
          </div>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-600">
              Or login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>

          <button
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer rounded-md"
          >
            <FcGoogle size={36} />

            <p className="font-semibold tracking-wide">Continue with Google</p>
          </button>

          <p className="px-6 text-sm text-center text-gray-600">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/signup"
              className="hover:underline font-semibold hover:text-[#005DC6] text-gray-600"
            >
              Sign up Now!
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
