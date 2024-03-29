import { ReactNode, Fragment, FC } from 'react';
import NavBar from '@/components/nav-bar';
import { cn } from '@/lib/utils';

type PageWrapperWithNavBarProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  isContentCentered?: boolean;
};

const PageWrapperWithNavBar: FC<PageWrapperWithNavBarProps> = ({
  children,
  isContentCentered = false,
  className,
}) => {
  return (
    <Fragment>
      <NavBar />
      <main
        className={cn('w-screen min-h-page bg-primary-content py-10', {
          'flex justify-center items-center': isContentCentered,
        })}
      >
        <div className={cn('max-w-page mx-auto', className)}>{children}</div>
      </main>
    </Fragment>
  );
};

export { PageWrapperWithNavBar };
