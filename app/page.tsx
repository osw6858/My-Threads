import { MainContent } from './_components/MainContent';
import { LeftSideNav } from './_components/LeftSideNav';
import { RightSideNav } from './_components/RightSideNav';
import { TopHeader } from './_components/TopHeader';
import { Provider } from './_components/Provider';

export default function Home() {
  return (
    <>
      <TopHeader />
      <div className="container mx-auto flex justify-between justify-items-center pt-16">
        <LeftSideNav />
        <MainContent />
        <RightSideNav />
      </div>
    </>
  );
}
