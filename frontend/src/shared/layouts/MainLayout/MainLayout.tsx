import { Header } from "../../../widgets";

interface ILayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: ILayoutProps) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}
