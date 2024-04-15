export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full bg-slate-500">
      {children}
    </div>
  );
};
