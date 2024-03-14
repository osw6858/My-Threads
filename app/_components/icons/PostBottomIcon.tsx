const PostBottomIcon = () => {
  return (
    <div className="flex pl-10 mt-5 ">
      <svg
        aria-label="좋아요"
        role="img"
        viewBox="0 0 24 22"
        width={23}
        height={23}
        className="mr-3 fill-transparent stroke-black dark:stroke-white stroke-2 cursor-pointer"
      >
        <title>좋아요</title>
        <path d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"></path>
      </svg>

      <svg
        aria-label="답글"
        role="img"
        viewBox="0 0 24 24"
        width={23}
        height={23}
        className="fill-transparent stroke-black dark:stroke-white stroke-2 cursor-pointer"
      >
        <title>답글</title>
        <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"></path>
      </svg>
    </div>
  );
};

export default PostBottomIcon;
