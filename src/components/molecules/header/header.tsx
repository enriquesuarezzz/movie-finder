export function Header() {
  return (
    <header className="h-fit  w-full bg-gradient-to-r from-blue-950/80  to-blue-700/80">
      <div className="flex flex-col ">
        <div className="flex flex-col items-center justify-center pt-6 text-center ">
          <div className="text-[35px] font-bold text-white md:text-[40px] lg:text-[50px]">
            MovieFinder
          </div>
          <img
            src="/images/header_image.avif"
            alt="movies posters"
            className="pb-4 pt-2 md:pb-10 md:pt-10"
          />
        </div>
      </div>
    </header>
  )
}
