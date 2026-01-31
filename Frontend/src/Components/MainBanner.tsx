import { Link } from "react-router-dom";
import { PATHS } from "../Data/paths";

function MainBanner() {
  const date = new Date();

  return (
    <main className="w-full bg-white text-black">
      <ol className="flex items-center p-3 w-full m-3 justify-between">
        <div className="flex gap-2">
          <li className="justify-start items-start">
            <Link to={PATHS.HOME}>Escritorio/</Link>
          </li>
          <li className="">
            <Link to={PATHS.COMPRAS}>Compras</Link>
          </li>
        </div>
        <li className="justify-end items-end">
          {date.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </li>
      </ol>
    </main>
  );
}

export default MainBanner;
