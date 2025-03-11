import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl text-gray-200 mb-4">Article not found</h1>
        <p className="text-xl text-gray-400 mb-8">
          The journal article you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/journals"
          className="inline-block px-6 py-3 bg-sienna text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Back to Journals
        </Link>
      </div>
    </div>
  );
}