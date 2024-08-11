import Burguer from '../../atoms/svg/burguer'
import { Logo } from '../../atoms/svg/logo'
import Search from '../../atoms/svg/search'

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light flex w-full justify-between pb-4 pl-2 pt-3 font-onest md:pl-10">
      <div className="flex items-center gap-2 font-onest text-xl font-bold md:gap-8 ">
        <Logo />
        <button className="hover:text-blue-500">MovieFinder</button>
        <button className="hidden hover:text-blue-500 md:flex">
          My Movies
        </button>
      </div>
      <div className="flex items-center gap-2 pr-2 font-bold md:gap-8 md:pr-10">
        <button>
          <Search />
        </button>
        <div className="hidden items-center gap-8 md:flex">
          <button className="hover:text-blue-500">Sign In</button>
          <button className="text-bold rounded-3xl bg-blue-700 px-4 py-2 text-white hover:bg-blue-600 ">
            Sign Up Now
          </button>
        </div>
        <div className="flex md:hidden">
          <Burguer />
        </div>
      </div>
    </nav>
  )
}
