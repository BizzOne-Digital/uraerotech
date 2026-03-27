export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Test Card 1 - Red */}
        <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">🔴 Test 1: Red Background</h1>
          <p className="text-lg">If you see RED background, Tailwind is working!</p>
        </div>

        {/* Test Card 2 - Blue */}
        <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">🔵 Test 2: Blue Background</h1>
          <p className="text-lg">If you see BLUE background, Tailwind is working!</p>
        </div>

        {/* Test Card 3 - Primary Color */}
        <div className="bg-primary-500 text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">✅ Test 3: Custom Primary Color</h1>
          <p className="text-lg">If you see CUSTOM BLUE (#2b6f99), custom colors work!</p>
        </div>

        {/* Test Card 4 - Gradient */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-4">🎨 Test 4: Gradient</h1>
          <p className="text-lg">If you see a gradient, advanced Tailwind features work!</p>
        </div>

        {/* Test Card 5 - Hover Effect */}
        <button className="w-full bg-primary-500 hover:bg-primary-600 text-white p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
          <h1 className="text-2xl font-bold">🖱️ Test 5: Hover Me!</h1>
          <p className="text-sm mt-2">Hover to test transitions and transforms</p>
        </button>

        {/* Instructions */}
        <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-primary-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Tailwind Status Check</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              <span>If all cards show colors → Tailwind is working</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">❌</span>
              <span>If cards are plain white → Tailwind is NOT working</span>
            </li>
          </ul>
          <div className="mt-6 p-4 bg-primary-50 rounded border border-primary-200">
            <p className="text-sm text-primary-900">
              <strong>Next Step:</strong> If this page looks styled, go back to the homepage and refresh with Ctrl+Shift+R
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
