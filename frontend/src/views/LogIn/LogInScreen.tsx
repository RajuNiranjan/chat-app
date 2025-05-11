import { Link } from "react-router-dom";
import { GroupLogo } from "../../assets";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuthStore } from "../../zustand/auth/auth.store";
import { Loader, EyeOpenIcon, EyeCloseIcon } from "../../assets";

const LogInScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUserName: "",
    password: "",
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
  };

  const { login, isLoginLoading } = useAuthStore();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      emailOrUserName: formData.emailOrUserName,
      password: formData.password,
    });
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#F5F5F5]">
      <div className=" h-[650px] w-[850px]  flex justify-between items-center">
        <div className="w-[300px] h-full flex items-center justify-center">
          <img
            src={GroupLogo}
            alt="Group Logo"
            className="w-[200px] h-[200px] "
          />
        </div>
        <div className="w-[500px]  h-full border shadow-lg rounded-xl p-[40px]  border-[#66666650] ">
          <div className="space-y-[10px] text-center mb-[40px]">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 bg-[#66666650] rounded-full animate-bounce delay-1000" />
              <h1 className="font-medium text-[32px] text-[#333333]">Log in</h1>
            </div>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-[20px]">
            <div className="flex flex-col gap-1 ">
              <label htmlFor="username" className="text-[16px] text-[#666666]">
                User Name
              </label>
              <input
                type="text"
                name="emailOrUserName"
                value={formData.emailOrUserName}
                onChange={handleChangeInput}
                placeholder="John Deo"
                className="w-full border border-[#66666635] rounded-md p-[10px] text-[16px] text-[#333333] focus:outline-none focus:border-[#66666675]"
              />
            </div>
            <div className="space-y-1">
              <div className="flex flex-col gap-1 w-full  ">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[16px] text-[#666666]"
                  >
                    Password
                  </label>
                  <div className="flex items-center gap-2">
                    <img
                      src={showPassword ? EyeOpenIcon : EyeCloseIcon}
                      alt="Eye"
                      className="w-[18px] h-[18px] cursor-pointer transition-all duration-300"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                    <p className="text-[16px] text-[#666666]">
                      {showPassword ? "Hide" : "Show"}
                    </p>
                  </div>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChangeInput}
                  placeholder="••••••••"
                  className="w-full border border-[#66666635] rounded-md p-[10px] text-[16px] text-[#333333] focus:outline-none focus:border-[#66666675]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoginLoading}
              className="w-full h-[54px] bg-[#66666666] text-white rounded-full text-[20px] 
                hover:bg-[#66666680] 
                active:bg-[#666666]
                disabled:bg-[#66666666] disabled:cursor-not-allowed disabled:transform-none
                transition-all duration-300 
                cursor-pointer flex items-center justify-center"
            >
              {isLoginLoading ? (
                <div className="flex items-center gap-2">
                  <span>Logging In...</span>
                  <img
                    src={Loader}
                    alt="Loader"
                    className="w-6 h-6 animate-spin"
                  />
                </div>
              ) : (
                <span>Log In</span>
              )}
            </button>
          </form>
          <div className="flex items-center gap-2 my-[20px]">
            <hr className="w-full border-[#66666635]" />
            <span className="text-[16px] text-[#666666]">OR</span>
            <hr className="w-full border-[#66666635]" />
          </div>
          <p className="text-center text-[16px] text-[#333333]">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInScreen;
