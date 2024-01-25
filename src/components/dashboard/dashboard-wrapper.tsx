import { FC } from 'react';

type DashboardWrapperProps = {
  children: React.ReactNode;
};

const DashboardWrapper: FC<DashboardWrapperProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export { DashboardWrapper };
