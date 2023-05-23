export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-gradient-to-tr from-cyan-400 to-pink-500 py-12 md:py-16">
      {children}
    </div>
  );
}
