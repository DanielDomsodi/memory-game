import { Header } from '../../components/header';

export default function HomeLayout({ children }) {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Header />
      <main className="container mx-auto px-4 pt-4">{children}</main>
    </>
  );
}
