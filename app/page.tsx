import Snowflakes from '@/components/Snowflakes'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative">
      <Snowflakes />
      <div className="max-w-[480px] w-full text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-winter-blue">
          ❄️ Secret Santa ❄️
        </h1>
        <p className="text-gray-700 text-lg font-medium">
          Ве молиме користете го вашиот личен линк за пристап.
        </p>
      </div>
    </main>
  )
}

