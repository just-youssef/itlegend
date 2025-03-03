import Image from "next/image"

const Header = () => {
  return (
    <div className="flex px-4 py-2 bg-slate-50/90 items-center gap-x-2 border-b border-slate-300 sticky top-0 z-50">
        <Image src="/favicon.ico" width={40} height={40} alt="favicon" />
        <h1 className="font-semibold text-xl">IT Legend</h1>
    </div>
  )
}

export default Header