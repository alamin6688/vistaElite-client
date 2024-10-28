import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../api/utils";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    createUser,
    signInWithGoogle,
    updateUserProfile,
    loading,
    setLoading,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    // const image = form.image.files[0];

    try {
      setLoading(true);
      // 1. Upload image and get image url
      // const image_url = await imageUpload(image);
      // console.log(image_url);
      //2. User Registration
      const result = await createUser(email, password);
      console.log(result);

      // 3. Save username and photo in firebase
      await updateUserProfile(name);
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
      toast.success("Sign Up Successful!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      {" "}
      <Helmet>
        <title>Sign Up | Vista Elite</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen bg-white px-4">
        <div className="flex flex-col w-full md:max-w-md p-6 rounded-xl sm:p-10 bg-gray-100 text-gray-900 shadow-2xl animate__animated animate__zoomIn">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold uppercase">Sign Up</h1>
            <p className="text-sm text-gray-600">Welcome to Vista Elite</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-md text-gray-600 tracking-wider"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#005DC6] bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              {/* <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div> */}
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
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#005DC6] bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
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
                  "Sign In"
                )}
              </button>
            </div>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-600">
              Or sign up with social accounts
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:underline font-semibold hover:text-[#005DC6] text-gray-600"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
