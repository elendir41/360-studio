import Image from 'next/image';
import Link from 'next/link';
import logo from '~/assets/logo.svg';

export default function NotFound() {
  return (
    <>
      <div className="flex min-h-full flex-col">
        <header className="mx-auto w-full px-4 pt-6 lg:px-8">
          <nav className="flex items-center justify-between" aria-label="Global">
            <div className="flex flex-1 justify-start">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image className="h-12 w-12" src={logo} alt="logo" />
              </a>
            </div>
            <div className="flex flex-1 justify-end">
              <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Connexion <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
          <p className="text-base font-semibold leading-8 text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page non trouvée</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Désolé, nous n&apos;avons pas pu trouver cette page.</p>
          <div className="mt-10">
            <Link href="/" className="text-sm font-semibold leading-7 text-indigo-600">
              <span aria-hidden="true">&larr;</span> Revenir à l&apos;accueil
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
