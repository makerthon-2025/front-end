import '@/style/global.css'

export const metadata = {
  title: "NewsBot",
  description: "NewsBot",
  icons: {
    icon: 'https://cdn-icons-png.flaticon.com/128/14958/14958196.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body style={{
        height: '100dvh',
        display: 'grid',
        gridTemplateRows: '10% 70% 20%',
        backgroundColor: '#18191a'
      }}>
        {children}
      </body>
    </html>
  );
}
