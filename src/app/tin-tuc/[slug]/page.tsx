import { notFound } from 'next/navigation';
import { articles, getFighterById } from '@/data/mock-data';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { FighterCard } from '@/components/fighter/FighterCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);
  
  return {
    title: article ? `${article.title} | MMAVN Hub` : 'Bài viết không tồn tại'
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Find related fighters
  const relatedFighters = (article as any).relatedFighterIds
    ? ((article as any).relatedFighterIds as string[])
        .map(id => getFighterById(id))
        .filter(f => f !== undefined)
    : [];

  // Format date
  const date = new Date(article.publishedAt);
  const formattedDate = new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="h-64 md:h-96 w-full mb-8 relative overflow-hidden bg-gradient-to-br from-card to-background border-border">
        {article.coverImage && (
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end">
          <div className="p-6 md:p-10 w-full">
            <Badge variant="default" className="mb-4">{article.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center text-muted-foreground gap-4 text-sm">
              <span className="font-medium text-foreground">{article.author}</span>
              <span>•</span>
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2 mb-8">
        {article.tags.map(tag => (
          <Badge key={tag} variant="default">#{tag}</Badge>
        ))}
      </div>

      <div className="prose prose-invert max-w-none mb-12">
        <p className="text-xl text-muted-foreground mb-8 font-medium leading-relaxed">
          {article.excerpt}
        </p>
        
        {/* Placeholder for content since mock data doesn't have it */}
        <div className="space-y-6 text-foreground leading-relaxed">
          <p>
            Đây là nội dung bài viết. Trong thực tế, phần này sẽ được lấy từ cơ sở dữ liệu hoặc CMS,
            chứa nội dung chi tiết của bài báo với đầy đủ định dạng HTML hoặc Markdown.
          </p>
          <p>
            MMAVN Hub cung cấp nền tảng thông tin toàn diện về MMA tại Việt Nam, kết nối các võ sĩ,
            phòng tập và người hâm mộ trên cả nước. Giải đấu đang ngày càng phát triển với nhiều tài năng trẻ
            đầy triển vọng xuất hiện từ khắp các tỉnh thành.
          </p>
          <p>
            Các trận đấu trong thời gian tới hứa hẹn sẽ mang lại những màn trình diễn mãn nhãn cho khán giả,
            khi các võ sĩ đều đang tập luyện với cường độ cao nhất để chuẩn bị cho sự kiện.
          </p>
        </div>
      </div>

      {relatedFighters.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-6">Võ sĩ liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedFighters.map(fighter => (
              <FighterCard key={fighter.id} fighter={fighter as any} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
