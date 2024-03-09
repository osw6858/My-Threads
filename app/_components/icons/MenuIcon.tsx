const MenuIcon = ({ style }: { style?: string }) => {
  return (
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
  );
};

export default MenuIcon;
