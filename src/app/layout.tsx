import "./globals.css";

export const metadata = {
  title: "Bitterhafen CopLink",
  description: "Desktop-System für die Landespolizei Bitterhafen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
