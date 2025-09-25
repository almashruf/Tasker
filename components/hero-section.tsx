import Image from "next/image"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="mb-4">
              <Image src="/tasker-logo.png" alt="Tasker Logo" width={200} height={80} className="h-16 w-auto" />
            </div>
            <p className="text-lg text-orange-100 max-w-2xl text-pretty">
              Effortlessly Organize, Prioritize, and Conquer Tasks with Tasker - Your Personal Productivity Ally for
              Seamless Goal Achievement and Stress-Free Task Management.
            </p>
          </div>

          <div className="flex-shrink-0 ml-8">
            <div className="relative">
              {/* Task cards illustration */}
              <div className="grid grid-cols-2 gap-3 transform rotate-12">
                <div className="w-24 h-16 bg-blue-400 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded opacity-80"></div>
                </div>
                <div className="w-24 h-16 bg-green-400 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded opacity-80"></div>
                </div>
                <div className="w-24 h-16 bg-yellow-400 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded opacity-80"></div>
                </div>
                <div className="w-24 h-16 bg-pink-400 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded opacity-80"></div>
                </div>
              </div>

              {/* Hand illustration */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-300 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
