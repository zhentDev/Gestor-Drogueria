import { useNavigate } from "react-router-dom";
import React from "react";

interface ButtonPageProps {
  title: string;
  description: string;
  linkPage: string;
  icon: React.ReactNode; // Acepta un componente de icono
}

function ButtonPage({ title, description, linkPage, icon }: ButtonPageProps) {
  const navigate = useNavigate();

  const handleSubPage = () => {
    navigate(linkPage);
  };

  return (
    <button
      type="button"
      className="rounded-lg flex p-4 mx-2 items-center w-2/5 justify-between h-auto shadow-lg shadow-cyan-700/50 border-2 border-blue-400 transition-all duration-300 hover:bg-slate-200 hover:border-cyan-400 active:bg-slate-300 active:scale-[0.98] cursor-pointer text-left"
      onClick={handleSubPage}
    >
      <div className="text-sky-500 w-1/12 flex justify-center items-center">
        {icon}
      </div>
      <div className="h-full w-0 border-rose-500/50 border-l-2 mx-4"></div>
      <div className="h-auto w-10/12">
        <h2 className="text-slate-700 font-bold text-xl select-none">
          {title}
        </h2>
        <p className="text-sky-800 text-sm select-none">{description}</p>
      </div>
    </button>
  );
}

export default ButtonPage;
