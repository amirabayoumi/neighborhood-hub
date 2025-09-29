import { Activity } from "lucide-react";
export const Footer = () => {
  return (
    <footer className="bg-dark-purple text-yellow p-4 text-center ">
      <div></div>
      <div className="mb-4 flex justify-center text-4xl">
        <Activity className="text-yellow w-12 h-12" />

        <p className="mb-4">Together, we decide</p>
      </div>

      <p>
        &copy; {new Date().getFullYear()} Amira Bayoumi. All rights reserved.
      </p>
    </footer>
  );
};
