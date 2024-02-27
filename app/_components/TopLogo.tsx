import Image from 'next/image';
import TopImage from '../public/login_pic.webp';

const TopLogo = () => {
  return (
    <picture className="absolute top-0 w-[1780px]">
      <Image priority alt="" src={TopImage} width={1785} height={510} />
    </picture>
  );
};

export default TopLogo;
