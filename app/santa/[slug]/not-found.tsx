import Snowflakes from '@/components/Snowflakes'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative">
      <Snowflakes />
      <div className="max-w-[480px] w-full text-center relative z-10">
        <h1 className="text-5xl mb-4">❄️</h1>
          <h2 className="text-2xl font-bold mb-4 text-winter-blue">
            Линкот не е пронајден
          </h2>
          <p className="text-gray-700">
            Овој Secret-Santa линк не постои.
          </p>
      </div>
    </main>
  )
}

