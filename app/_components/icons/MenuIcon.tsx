'use client';

import { supabase } from '@/app/_supabase/supabaseClient';
import DarkModeBtn from '../common/DarkModeBtn';
import { useQueryClient } from '@tanstack/react-query';
import {
  GET_ACTIVE_USER,
  GET_CURRENT_USER,
  GET_USER_INFO,
} from '@/app/_constant/queryKeys';

const MenuIcon = ({ style }: { style?: string }) => {
  const client = useQueryClient();

  async function signOut() {
    await supabase.auth.signOut();
    client.removeQueries({ queryKey: [GET_ACTIVE_USER] });
    client.removeQueries({ queryKey: [GET_USER_INFO] });
    client.removeQueries({ queryKey: [GET_CURRENT_USER] });
  }

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
        {/* <li>
          <span>좋아요</span>
        </li>
        <li>
          <span>문제 신고</span>
        </li> */}
        <li>
          <span
            className="text-darkFontColor dark:text-lightFontColor font-semibold"
            onClick={signOut}
          >
            로그아웃
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MenuIcon;
