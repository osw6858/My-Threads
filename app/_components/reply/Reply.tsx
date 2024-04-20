import { CommentType } from '@/app/_types/post';
import Link from 'next/link';
import Image from 'next/image';
import { END_POINT } from '@/app/_constant/endPoint';
import parse from 'html-react-parser';

const Reply = ({ reply }: { reply: CommentType }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="avatar flex items-center">
            <div className="w-9 rounded-full">
              <Link href={`${END_POINT.USER}/${reply.users.user_name}`}>
                <picture>
                  <Image
                    className="rounded-full"
                    width={36}
                    height={36}
                    src={reply.users.avatar_url}
                    alt={''}
                  />
                </picture>
              </Link>
            </div>
          </div>
          <Link href={`${END_POINT.USER}/${reply.users.user_name}`}>
            <p className="ml-3">{reply.users.user_name}</p>
          </Link>
        </div>
      </div>
      <div className="mt-1 flex pl-12">{parse(reply.content)}</div>
    </div>
  );
};

export default Reply;
