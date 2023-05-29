import './../styles/global.css';
import '@fontsource-variable/inter';
import SupabaseProvider from './supabase-provider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
