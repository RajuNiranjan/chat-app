import { Link } from "react-router-dom";
import { GroupLogo } from "../../assets";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuthStore } from "../../zustand/auth/auth.store";
import { Loader } from "../../assets";

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    if (name === "confirmPassword" || name === "password") {
      if (name === "password") {
        if (value !== formData.confirmPassword) {
          setError("Passwords do not match");
        } else if (
          value.length < 8 ||
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            value
          )
        ) {
          setError(
            "Use 8 or more characters with a mix of letters, numbers & symbols"
          );
        } else {
          setError(null);
        }
      } else {
        if (value !== formData.password) {
          setError("Passwords do not match");
        } else if (
          formData.password.length < 8 ||
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            formData.password
          )
        ) {
          setError(
            "Use 8 or more characters with a mix of letters, numbers & symbols"
          );
        } else {
          setError(null);
        }
      }
    }

    setFormData(updatedFormData);
  };

  const { signup, isSignupLoading } = useAuthStore();

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup({
      userName: formData.username,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#F5F5F5]">
      <div className="border   border-[#66666650] h-[650px] w-[850px] shadow-lg rounded-xl p-[40px] flex justify-between items-center">
        <div className="w-[534px]  h-full ">
          <div className="space-y-[10px] mb-[40px]">
            <div className="h-10 w-10 bg-[#66666650] rounded-full animate-bounce delay-1000" />
            <div>
              <h1 className="font-medium text-[32px] text-[#333333]">
                Create an account
              </h1>
              <p className="text-[#333333] text-[16px]">
                Already have an account?{" "}
                <Link to="/login" className="text-[#111111] underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>

          <form onSubmit={handleSignup} className="w-full space-y-[20px]">
            <div className="flex flex-col gap-1 ">
              <label htmlFor="username" className="text-[16px] text-[#666666]">
                User Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChangeInput}
                placeholder="John Deo"
                className="w-full border border-[#66666635] rounded-md p-[10px] text-[16px] text-[#333333] focus:outline-none focus:border-[#66666675]"
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="email" className="text-[16px] text-[#666666]">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChangeInput}
                placeholder="john@deo.com"
                className="w-full border border-[#66666635] rounded-md p-[10px] text-[16px] text-[#333333] focus:outline-none focus:border-[#66666675]"
              />
            </div>
            <div className="space-y-1">
              <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-1 w-full  ">
                  <label
                    htmlFor="password"
                    className="text-[16px] text-[#666666]"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChangeInput}
                    placeholder="••••••••"
                    className="w-full border border-[#66666635] rounded-md p-[10px] text-[16px] text-[#333333] focus:outline-none focus:border-[#66666675]"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full  ">
                  <label
                    htmlFor="confirmPassword"
                    className="text-[16px] text-[#666666]"
                  >
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChangeInput}
                    placeholder="••••••••"
                    className="w-full border border-[#66666635] rounded-md p-[10px] text-[16px] text-[#333333] focus:outline-none focus:border-[#66666675]"
                  />
                </div>
              </div>

              <p className="text-[14px] text-[#ff0000]">{error}</p>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  name="showPassword"
                  id="showPassword"
                  className="peer accent-[#111111] cursor-pointer w-[18px] h-[18px]"
                />
                <p className="text-[16px] text-[#333333]">Show password</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/login"
                className="underline text-[#111111] text-[16px]"
              >
                log in instead
              </Link>
              <button
                type="submit"
                disabled={isSignupLoading}
                className="w-[249px] h-[54px] bg-[#66666666] text-white rounded-full text-[20px] 
                hover:bg-[#66666680] 
                active:bg-[#666666]
                disabled:bg-[#66666666] disabled:cursor-not-allowed disabled:transform-none
                transition-all duration-300 
                cursor-pointer flex items-center justify-center"
              >
                {isSignupLoading ? (
                  <div className="flex items-center gap-2">
                    <span>Creating...</span>
                    <img
                      src={Loader}
                      alt="Loader"
                      className="w-6 h-6 animate-spin"
                    />
                  </div>
                ) : (
                  <span>Create an account</span>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="w-[300px] h-full flex items-center justify-center">
          <img
            src={GroupLogo}
            alt="Group Logo"
            className="w-[200px] h-[200px] "
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
