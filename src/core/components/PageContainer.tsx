import { clsx } from "clsx";

interface Props {
  children: React.ReactNode;
  center?: boolean;
}

export const PageContainer = ({ children, center = false }: Props) => {


  return (
    <div className="mx-auto">
      <div className={clsx([
        "grid h-full w-full",
        center && "justify-center"
      ])}>
        <div className="overflow-hidden text-gray-700 dark:text-slate-400">
          <div className="flex overflow-x-auto gap-6 pb-4">

            {children}

          </div>
        </div>
      </div>
    </div>
  );
};
