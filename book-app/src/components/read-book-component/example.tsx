import { type ReactNode } from "react";

type Props = {
  title: string;
  actions?: ReactNode;
  above?: ReactNode;
  children: ReactNode;
};

export const Example = ({ title, actions, children, above = null }: Props) => {
  return (
    <div className="w-full h-full grid grid-cols-1 gap-4">
      <div className="flex items-center gap-2 flex-wrap justify-center mt-[30px]">
        <h1 className="h1">{title}</h1>
        {actions && (
          <div className="flex items-start flex-wrap gap-2">{actions}</div>
        )}
      </div>
      {above}
      <div className="md:aspect-video aspect-[3/4] w-full rounded overflow-hidden p-0 mt-[15px]">
        {children}
      </div>
    </div>
  );
};
