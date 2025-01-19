import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
  return (
    <div className="shadow bg-black dark:bg-gray-300 h-16">
      <div className="mx-72 pt-4 flex justify-between">
        <div className="flex flex-col text-white dark:text-black justify-center h-full ml-4">
          <div>Rydr</div>
        </div>
        <div className="flex">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
