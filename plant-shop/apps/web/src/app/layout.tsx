import './globals.css';
import './overrides.css';
import './atelier.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plant Shop | Cây xanh, hoa tươi & cảm hứng sống xanh',
  metadataBase: new URL('https://thevalkyrie8.github.io/website-demo/'),
  openGraph: { title: 'Plant Shop — Mang thiên nhiên về phía bạn', description: 'Khám phá cây xanh, hoa tươi, chậu và dịch vụ cảnh quan.', locale: 'vi_VN', type: 'website', images: ['https://thevalkyrie8.github.io/website-demo/assets/images/hero.jpg'] },
  description: 'Cửa hàng cây cảnh, chậu vật tư và dịch vụ chăm sóc cây',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
