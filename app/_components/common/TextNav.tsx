'use client';

import Link from 'next/link';

interface TextNavProps {
  title: string;
  style?: string;
  href: string;
}

const TextNav = ({ title, style, href }: TextNavProps) => {
  return (
    <Link
      className={`text-lightFontColor dark:text-darkFontColor ${style}`}
      href={href}
    >
      <span className="cursor-pointer">{title}</span>
    </Link>
  );
};

export default TextNav;
