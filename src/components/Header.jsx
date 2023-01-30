import { List } from "phosphor-react";

function Header() {
  return (
    <div className="w-screen">
      <div className="flex items-center justify-between w-[75vw] lg:w-[60vw] mx-auto py-5">
        <div className="font-bold text-2xl text-blue-400">Image Locker</div>
        <List
          className="cursor-pointer text-gray-700 hover:scale-105"
          size={32}
        />
      </div>

      <h1 className="mx-auto max-w-fit text-[2.5rem] md:text-[2.75rem] mt-10 font-bold text-gray-700">
        Your Gallery
      </h1>
      <h4 className="font-light max-w-fit mx-auto mt-4 text-[0.8rem] md:text-sm text-gray-500">
        View, Upload, or Remove Your Photos.
      </h4>
    </div>
  );
}

export default Header;
