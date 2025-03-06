import Image from 'next/image'
import hero from '../../../../public/images/home/vecteezy_photo-of-a-colorful-assortment-of-fresh-fruits-and_26859140.jpg'

export default function Hero() {
  return (
    <div className="relative w-full h-[75vh]">
      <Image
        src={hero}
        alt="تصویر غذا"
        fill
        className="object-cover brightness-[0.35]"
        priority
        placeholder="blur"
        sizes="100vw"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          سفارش آنلاین غذا
        </h1>
        <p className="text-lg mb-8 text-center max-w-3xl mx-auto">
          با چند کلیک ساده، بهترین غذاها را از معتبرترین رستوران‌های شهر سفارش دهید
        </p>
        <button 
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full transition-all duration-300"
        >
          سفارش دهید
        </button>
      </div>
    </div>
  )
}