import { FC } from 'react';

type PageTitleProps = {
  title: string;
};

const PageTitle: FC<PageTitleProps> = ({ title }) => (
  <span className="font-extrabold text-center text-7xl block">{title}</span>
);

export { PageTitle };
