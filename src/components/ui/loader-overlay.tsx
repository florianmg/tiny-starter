import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

type LoaderOverlayProps = {
  isLoading: boolean;
  children: ReactNode;
  label?: string;
  className?: string;
};

const LoaderOverlay: React.FC<LoaderOverlayProps> = ({
  isLoading,
  children,
  label,
  className,
}) => (
  <div className={cn(`relative w-full h-full ${className && className}`)}>
    <div
      className={cn(
        'bg-white absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center z-50 flex-col gap-3',
        {
          invisible: !isLoading,
        }
      )}
    >
      <Loader2 className="animate-spin" />
      {label && <p>{label}</p>}
    </div>
    {children}
  </div>
);

export { LoaderOverlay };
