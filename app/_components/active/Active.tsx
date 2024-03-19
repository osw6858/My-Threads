import { ActiveType } from '@/app/_types/active';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import Link from 'next/link';
import { END_POINT } from '@/app/_constant/endPoint';

const Active = ({ active }: { active: ActiveType }) => {
  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  return (
    <Link href={`${END_POINT.COMMENT}/${active.post_id}`}>
      <div className="flex my-4 w-full min-h-16">
        <div>
          <div className="avatar flex items-center">
            <div className="w-9 rounded-full">
              <picture>
                <Image
                  height={20}
                  width={20}
                  src={active.users?.avatar_url}
                  alt=""
                />
              </picture>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full pl-3">
          <div className="grid gap-2">
            <p className="font-semibold">{active.users.user_name}</p>
            <p className="text-lightFontColor dark:text-darkFontColor pr-7">
              {active.content}
            </p>
          </div>
          <div>
            <p className="min-w-[45px] text-sm">
              {dayjs(active.created_at).fromNow()}
            </p>
          </div>
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-800" />
    </Link>
  );
};

export default Active;
