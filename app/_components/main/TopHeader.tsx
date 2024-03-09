import HeaderNavIcons from '../icons/HeaderNavIcons';
import MenuIcon from '../icons/MenuIcon';
import TopLogo from '../icons/TopLogo';

const TopHeader = () => {
  return (
    <header className="h-16 w-full dark:bg-darkMode fixed z-50">
      <div className="container h-full mx-auto my-0 flex items-center px-3 justify-between">
        <div className="sm:hidden" />
        <TopLogo
          height="32px"
          style="cursor-pointer transform transition duration-200 hover:scale-110"
        />
        <HeaderNavIcons />
        <MenuIcon />
      </div>
    </header>
  );
};

export default TopHeader;
