import { navBarLinks } from '../Data/data';
import { CgSearch } from 'react-icons/cg';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import ResponsiveMenu from './ResponsiveMenu';
import { MdLocalPharmacy } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface NavBarProps {
    textButton: string;
    functionButton: () => void;
}

function Nav({ textButton, functionButton }: NavBarProps) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className='h-1/6 bg-white shadow-md justify-center items-center flex gap-6 w-full rounded-md'>
                <div className="max-w-full min-h-full container flex justify-between items-center p-5 gap-3 flex-wrap">
                    {/* Logo */}
                    <div className="text-xl flex items-center gap-3 font-bold uppercase">
                        <MdLocalPharmacy className='text-6xl' />
                        <div className="flex flex-col gap-1 max-w-48">
                            <h2 className='text-xl'>Drogería calady</h2>
                            <p className="text-secondary text-lg">Calle el mango</p>
                        </div>
                    </div>
                    {/* Menu */}
                    <div className='hidden md:block'>
                        <ul className='flex items-center gap-6 text-gray-600'>{
                            navBarLinks.map((item) => (
                                <li key={item.id} className='flex items-center gap-6'
                                >
                                    <div className='flex items-center gap-1 px-2'>
                                        <i className='text-2xl'>{item.icon && <item.icon />}</i>
                                        <Link to={item.link} className='inline-block p-1 hover:text-primary font-semibold'>{item.name}</Link>
                                    </div>
                                </li>
                            ))
                        }</ul>
                    </div>
                    {/* Icons */}
                    <div className="flex items-center gap-4"><button className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200">
                        <CgSearch />
                    </button>
                        <button className="hover:bg-primary text-primary font-semibold hover:text-white rounded-md border-primary px-6 py-2 duration-200 hidden md:block" onClick={functionButton}>{textButton}</button>
                    </div>
                    {/* Mobile hamburguer */}
                    <div className="md:hidden">
                        <MdMenu
                            onClick={() => setOpen(!open)}
                            className='text-4xl'
                        />
                    </div>
                </div>
            </nav>

            {/* Mobile sidebar section */}
            <ResponsiveMenu open={open} navbarLinks={navBarLinks} />
        </>
    )
}

export default Nav