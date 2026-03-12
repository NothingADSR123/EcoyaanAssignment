import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        <Image
          src="https://prod-cdn.ecoyaan.com/pb-cs-app/images/ecoyaan-favicon.ico"
          alt="EcoYaan Logo"
          width={32}
          height={32}
          className="object-contain"
        />
        <h1 className="text-2xl font-semibold text-green-700">Ecoyaan</h1>
      </div>
    </header>
  );
}
