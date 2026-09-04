import { NewsClient } from './NewsClient';
import { articles } from '@/data/mock-data';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata = {
  title: 'Tin tức | MMAVN Hub'
};

export default function NewsPage() {
  // Sort articles by publishedAt descending
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8 space-y-6 sm:space-y-8">
      <SectionHeader 
        title="Tin Tức MMA" 
        subtitle="Cập nhật thông tin mới nhất về giới võ thuật tổng hợp Việt Nam" 
      />
      <div>
        <NewsClient articles={sortedArticles} />
      </div>
    </div>
  );
}
