import Link from 'next/link';
import TopNavIcons from '../icons/TopNavIcons';
import MenuIcon from '../icons/MenuIcon';
import TopLogo from '../icons/TopLogo';
import { END_POINT } from '@/app/_constant/endPoint';
import BottomNav from '../icons/BottomNav';

const TopHeader = () => {
  return (
    <header className="h-16 w-full dark:bg-headerBg fixed z-50 ">
      <div className="container h-full mx-auto my-0 flex items-center px-3 justify-between">
        <div className="sm:hidden w-[26px]" />
        <Link href={END_POINT.MAIN}>
          <TopLogo
            height="32px"
            style="cursor-pointer transform transition duration-200 hover:scale-110"
          />
        </Link>
        <TopNavIcons />
        <BottomNav />
        <MenuIcon />
      </div>
    </header>
  );
};

export default TopHeader;
