import "../globals.css";
import Image from "next/image";

// Standalone layout for the login page — no sidebar, no header
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark flex flex-col w-full h-screen relative">
        <header className="absolute top-0 left-0 w-full py-4 px-5">
          <Image
            src={"/mobile-logo.svg"}
            width={80}
            height={68}
            alt="Crystal company logo"
            className="block"
          />
        </header>
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
