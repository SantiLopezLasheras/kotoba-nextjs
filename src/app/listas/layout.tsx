import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function ListasLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-[600px] bg-gradient-to-r from-blue-500 to-purple-500">
      {children}
    </div>
  );
}
