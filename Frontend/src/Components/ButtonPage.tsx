import { useNavigate } from "react-router-dom"

interface ButtonPageProps {
    title: string
    description: string
    linkPage: string
}

function ButtonPage({ title, description, linkPage }: ButtonPageProps) {

    const navigate = useNavigate()

    const handleSubPage = () => {
        navigate(linkPage)
    }

    return (
        <div className="rounded-lg flex px-3 py-2 mx-2 items-center w-1/2 justify-between h-auto shadow-lg shadow-cyan-700 border-2 border-blue-400 transition-all duration-300 hover:bg-slate-300 hover:brightness-110 active:bg-slate-200 active:brightness-90 active:scale-95 cursor-pointer" onClick={handleSubPage}>
            <i className="text-rose-500 w-1/12">icono</i>
            <span className="h-full w-0 border-rose-500 border-2 py-3. select-none5"></span>
            <div className="h-auto w-9/12 justify-items-center text-left">
                <h2 className="text-rose-500 text-2xl select-none">{title}</h2>
                <p className="text-sky-600 text-lx select-none">{description}</p>
            </div>
        </div>
    )
}

export default ButtonPage