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
        className={cn(
          'w-screen min-h-[calc(100vh_-_70px)] bg-primary-content py-10',
          className,
          {
            'flex justify-center items-center': isContentCentered,
          }
        )}
      >
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </Fragment>
  );
};

export { PageWrapperWithNavBar };
