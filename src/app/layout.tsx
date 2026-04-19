import "./globals.css";

export const metadata = {
  title: "Hammer Modding CopLink",
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
