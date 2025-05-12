import { Loader } from "../assets/index";

export const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img
        loading="lazy"
        src={Loader}
        alt=""
        className="w-10 h-10 animate-spin"
      />
    </div>
  );
};
