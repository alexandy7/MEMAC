import { cn } from '@/lib/utils';

interface PageContentProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const PageContent = ({
  title,
  description,
  children,
  className,
}: PageContentProps) => {
  return (
    <div className={cn('container mx-auto max-w-7xl', className)}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default PageContent;
