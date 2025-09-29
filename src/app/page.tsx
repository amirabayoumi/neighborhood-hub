import { MessageCircle } from "lucide-react";
import { Vote } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative text-center py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-pale-green to-light-purple/60"></div>
        <h1 className="relative text-5xl lg:text-6xl font-bold text-dark-purple leading-tight">
          Help Shape Our{" "}
          <span className="bg-gradient-to-r from-purple-950 to-green-700 bg-clip-text text-transparent">
            Neighborhood
          </span>
        </h1>
        <p className="relative mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Share your thoughts, highlight issues, and vote for what matters most
          in our community.
        </p>
      </section>

      <section className="py-20 bg-white text-center px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          by following these simple steps you can help make your neighborhood a
          better place.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-pale-green to-green-50 rounded-2xl border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <MessageCircle className="w-6 h-6 text-green-900" />
              <h3 className="text-2xl font-bold text-green-900">
                Share Your Voice
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Report a problem or suggest improvements in your neighborhood.
              Join others in finding solutions that matter most.
            </p>
            <Link
              href="/ideas"
              className="text-green-900 font-semibold hover:text-green-700"
            >
              Report & Improve →
            </Link>
          </div>

          <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-xl transition">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <Vote className="w-6 h-6 text-purple-900" />
              <h3 className="text-2xl font-bold text-purple-900">
                Join Polls & Surveys
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Vote on shared ideas, take part in surveys, and help set community
              priorities together.
            </p>
            <Link
              href="/poll"
              className="text-purple-900 font-semibold hover:text-purple-700"
            >
              Vote Now →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
