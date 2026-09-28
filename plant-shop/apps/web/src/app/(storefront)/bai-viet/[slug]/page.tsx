import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stories } from '@/components/storefront/story-data';

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export function generateMetadata({params}:{params:{slug:string}}){const s=stories.find(s=>s.slug===params.slug);return {title:(s?.title||'Cẩm nang')+' | Plant Shop',description:s?.excerpt,alternates:{canonical:'https://thevalkyrie8.github.io/website-demo/bai-viet/'+params.slug+'/'}}}

export default async function StoryDetailPage({ params }: { params: { slug: string } }) {
  const story = stories.find((item) => item.slug === params.slug);
  if (!story) notFound();

  return <article className="story-detail container"><Link className="story-back" href="/bai-viet">← Về thư viện câu chuyện</Link><header className="story-detail-header"><span className="eyebrow">{story.category} · {story.readTime}</span><h1>{story.title}</h1><p>{story.lead}</p></header><div className="story-detail-image" style={{ backgroundImage: `url(${story.image})` }} /><div className="story-detail-body"><aside><span>Plant Shop</span><small>Ghi chú<br />từ khu vườn</small></aside><div>{story.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<div className="story-next"><Link href="/cua-hang">Tìm một chậu cây phù hợp →</Link><Link href="/bai-viet">Đọc câu chuyện khác</Link></div></div></div></article>;
}
