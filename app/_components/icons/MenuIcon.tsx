import DarkModeBtn from '../common/DarkModeBtn';

const MenuIcon = ({ style }: { style?: string }) => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="mb-3">
        <svg
          aria-label="더 보기"
          role="img"
          viewBox="0 0 24 24"
          height="26px"
          width="26px"
          className={`${style} cursor-pointer transform transition duration-200 hover:scale-110`}
        >
          <title>더 보기</title>
          <rect
            className="fill-black dark:fill-white"
            rx="1.25"
            x="3"
            y="7"
            width="21px"
            height="2.5px"
          ></rect>
          <rect
            className="fill-black dark:fill-white"
            width="14px"
            height="2.5px"
            rx="1.25"
            x="10"
            y="15"
          ></rect>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
      >
        <li>
          <DarkModeBtn></DarkModeBtn>
        </li>
        <li>
          <span>좋아요</span>
        </li>
        <li>
          <span>문제 신고</span>
        </li>
        <li>
          <span>로그아웃</span>
        </li>
      </ul>
    </div>
  );
};

export default MenuIcon;
