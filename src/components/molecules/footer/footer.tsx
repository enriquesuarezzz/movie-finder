import { Logo } from '../../atoms/svg/logo'

export function Footer() {
  return (
    <footer className="fixed bottom-0  w-full rounded-t-lg bg-gray-900 ">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="flex flex-col items-center  md:flex-row md:justify-between">
          <div className="flex items-center justify-center gap-2 pb-6">
            <Logo color="white" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              MovieFinder
            </span>
          </div>

          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                My Movies
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-2 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
        <span className="block text-center text-sm text-gray-500 dark:text-gray-400">
          <p> © 2024 Enrique Suarez </p>
        </span>
      </div>
    </footer>
  )
}
