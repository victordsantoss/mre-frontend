import '../configs/styles/reset.css';

export const metadata = {
  title: 'MRE - Frontend',
  description: 'MRE - Frontend',
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
