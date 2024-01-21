import { ReactNode, Fragment, FC } from 'react';
import NavBar from '@/components/nav-bar';
import { cn } from '@/lib/utils';
import { ClassNameValue } from 'tailwind-merge';

type PageWrapperWithNavBarProps = {
  children: ReactNode;
  isContentCentered?: boolean;
  classNames?: ClassNameValue;
};

const PageWrapperWithNavBar: FC<PageWrapperWithNavBarProps> = ({
  children,
  isContentCentered = false,
  classNames,
}) => {
  return (
    <Fragment>
      <NavBar />
      <main
        className={cn(
          'w-screen h-[calc(100vh_-_68px)] min-h-[600px] bg-primary-content',
          {
            'flex justify-center items-center': isContentCentered,
            classNames: !!classNames,
          }
        )}
      >
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </Fragment>
  );
};

export { PageWrapperWithNavBar };
