import { MainContent } from './_components/MainContent';
import { LeftSideNav } from './_components/LeftSideNav';
import { RightSideNav } from './_components/RightSideNav';
import { TopHeader } from './_components/TopHeader';

export default function Home() {
  return (
    <div className="dark:bg-darkMode dark:text-white">
      <TopHeader />
      <div className="container mx-auto flex justify-between justify-items-center pt-16">
        <LeftSideNav />
        <MainContent />
        <RightSideNav />
      </div>
    </div>
  );
}
