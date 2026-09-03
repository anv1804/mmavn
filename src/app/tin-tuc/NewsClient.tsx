'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { ArticleCard } from '@/components/article/ArticleCard';
import { EmptyState } from '@/components/ui/EmptyState';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  publishedAt: string;
  tags: string[];
}

interface NewsClientProps {
  articles: Article[];
}

const CATEGORY_TABS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'breaking', label: 'Tin nóng' },
  { id: 'analysis', label: 'Phân tích' },
  { id: 'interview', label: 'Phỏng vấn' },
  { id: 'technique', label: 'Kỹ thuật' },
  { id: 'opinion', label: 'Ý kiến' },
  { id: 'gym-spotlight', label: 'Phòng tập' }
];

export function NewsClient({ articles }: NewsClientProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredArticles = activeTab === 'all' 
    ? articles 
    : articles.filter(a => a.category === activeTab);

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const regularArticles = filteredArticles.slice(1);

  return (
    <div className="space-y-8">
      <Tabs 
        tabs={CATEGORY_TABS} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
      />

      {filteredArticles.length === 0 ? (
        <EmptyState title="Chưa có bài viết trong mục này" />
      ) : (
        <>
          {featuredArticle && (
            <div className="mb-8">
              <ArticleCard article={featuredArticle} featured={true} />
            </div>
          )}
          
          {regularArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
