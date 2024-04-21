import { openModal } from '@/app/_helper/openModal';
import { useQueryClient } from '@tanstack/react-query';

const CommentIcon = ({ id, isReply }: { id: number; isReply: boolean }) => {
  const client = useQueryClient();

  const handleComment = () => {
    if (!isReply) {
      openModal(`open-comment-modal${id}`);
    } else {
      openModal(`open-reply-modal${id}`);
    }
  };

  return (
    <div onClick={handleComment}>
      <svg
        aria-label="답글"
        role="img"
        viewBox="0 0 24 24"
        width={23}
        height={23}
        className="fill-transparent stroke-black dark:stroke-white stroke-2 cursor-pointer w-[20px] h-[20px] sm:w-[23px]"
      >
        <title>답글</title>
        <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"></path>
      </svg>
    </div>
  );
};

export default CommentIcon;
