import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { inter } from "@/app/ui/fonts";

export const metadata = {
  title: "kotoba",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
