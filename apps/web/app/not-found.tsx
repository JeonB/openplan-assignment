import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="mt-2 text-gray-500">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-black-100 px-8 text-white transition-colors hover:bg-black-100/80"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
