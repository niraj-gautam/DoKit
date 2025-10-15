import { WikiEntry } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface WikiViewerProps {
  entry: WikiEntry;
}

export const WikiViewer = ({ entry }: WikiViewerProps) => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{entry.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Created {format(entry.createdAt, 'MMM dd, yyyy')}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Updated {format(entry.updatedAt, 'MMM dd, yyyy')}
          </div>
        </div>

        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {entry.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.label}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-lg text-muted-foreground leading-relaxed">
          {entry.description}
        </p>
      </div>

      <div 
        className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: entry.body }}
      />
    </div>
  );
};
