import React from 'react';
import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function Header() {
    const {currentUser} = useSelector(state => state.user)

  return (
    <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to='/Home'>
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                <span className="text-slate-700 ">Espacios Mexico</span>
            </h1>
        </Link>
        <form className="bg-slate-100 rounded-lg flex items-center">
            <input type="text" placeholder="Buscar..." 
            className="bg-transparent p-3 focus:outline-none w-24 sm:w-64"/>
            <FaSearch className="text-slate-500 mr-4" />
        </form>
        <ul className="flex gap-4 ">
            <Link to='/Home'>
            <li className="hidden sm:inline text-slate-700 hover:underline hover:cursor-pointer">Inicio</li>
            </Link>
            <Link to='/About'>
            <li className="hidden sm:inline text-slate-700 hover:underline hover:cursor-pointer">Acerca de Nosotros</li>
            </Link>
            <Link to='/profile'>
            {currentUser ? (
                <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="Profile Picture" />
            ): ( 
                <li className="  text-slate-700 hover:underline hover:cursor-pointer">Inicia Sesion</li>            
            )}
            </Link>
        </ul>
        </div>
    </header>
  )
}
