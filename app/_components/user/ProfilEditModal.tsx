import { END_POINT, STORAGE_ROOT_URL } from '@/app/_constant/endPoint';
import { ProfileData } from '@/app/_types/inputType';
import { UserType } from '@/app/_types/user';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import ProfilInput from '../common/ProfilInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GET_ALL_POSTS,
  GET_CURRENT_USER,
  GET_USER_INFO,
  GET_USER_POST,
  GET_USER_PROFILE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_IMAGE,
} from '@/app/_constant/queryKeys';
import { updateProfile, uploadProfilImage } from '@/app/_api/user';
import { useRouter } from 'next/navigation';
import { SUPABASE_ERROR_MESSAGE } from '@/app/_constant/modalErrorMessage';
import { openModal } from '@/app/_helper/openModal';

const ProfilEditModal = ({
  modalId,
  user,
}: {
  modalId: string;
  user: UserType;
}) => {
  const [profilImage, setProfilImage] = useState(user.avatar_url);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [changingImage, setChangingImage] = useState(false);
  const [Userurl, setUserUrl] = useState(user.user_name);
  const client = useQueryClient();
  const route = useRouter();

  const handleEditProfile = (data: ProfileData) => {
    const userName = data.user_name;

    const profileDatas = {
      uuid: user.uuid,
      user_name: data.user_name,
      avatar_url: profilImage,
      user_intro: data.user_intro,
    };
    console.log(profileDatas);

    changeProfile.mutate(profileDatas);
    setUserUrl(data.user_name);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files === null) return;

    const file = e.target.files?.[0];

    if (file === undefined) return;

    const fileData = {
      image: file,
      uuid: user.uuid,
    };
    updateProfilImage.mutate(fileData);
    setChangingImage(true);
  };

  const updateProfilImage = useMutation({
    mutationKey: [UPDATE_PROFILE_IMAGE, user.uuid],
    mutationFn: uploadProfilImage,
    onSuccess: (data) => {
      if (data?.error !== null) {
        console.log(data.error.message);
        return;
      }
      const url = `${STORAGE_ROOT_URL}${data.data?.path}`;

      setProfilImage(url);
      setChangingImage(false);
    },
  });

  const changeProfile = useMutation({
    mutationKey: [UPDATE_PROFILE, user.uuid],
    mutationFn: updateProfile,
    onSuccess: (data) => {
      if (data?.error !== null) {
        if (data?.error.message === SUPABASE_ERROR_MESSAGE.duplicateNickname) {
          openModal('duplicate-nickname');
          return;
        }
        console.log(data?.error.message);

        setError('프로필 수정 중 문제 발생');
        return;
      }
      setSuccess('변경 완료!');

      const queryKeys = [
        [GET_USER_INFO, Userurl],
        [GET_CURRENT_USER],
        [GET_ALL_POSTS, user.uuid],
        [GET_USER_POST, user.user_name],
        [GET_USER_PROFILE],
      ];

      queryKeys.forEach((queryKey) => {
        client.invalidateQueries({ queryKey });
      });

      route.push(`${END_POINT.USER}/${Userurl}`);
    },
  });

  const { handleSubmit, control } = useForm<ProfileData>({
    defaultValues: {
      avatar_url: user.avatar_url,
      user_intro: user.user_intro,
      user_name: user.user_name,
    },
  });

  return (
    <dialog id={modalId} className="modal">
      <div className="relative modal-box overflow-y-visible p-11 h-auto">
        <h3 className="absolute -top-9 left-52 max-w-24 font-bold text-base  text-white hidden sm:block">
          프로필 편집
        </h3>
        <>
          <form onSubmit={handleSubmit(handleEditProfile)}>
            {error && (
              <p className="pl-3 mb-3 text-sm text-lightFontColor dark:text-darkFontColor">
                {error}
              </p>
            )}
            {success && (
              <p className="pl-3 mb-3 text-sm text-lightFontColor dark:text-darkFontColor">
                {success}
              </p>
            )}
            <div className="flex justify-between items-center">
              <ProfilInput name="user_name" control={control} type="text" />
              <div className="avatar flex items-center">
                <div className="w-12 rounded-full">
                  <label className="cursor-pointer" htmlFor="profil-image">
                    {changingImage ? (
                      <div className="flex justify-center items-center">
                        <span className="loading loading-spinner loading-md"></span>
                      </div>
                    ) : (
                      <picture className="">
                        <Image
                          className="rounded-full "
                          height={55}
                          width={55}
                          alt=""
                          src={profilImage}
                        />
                      </picture>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <ProfilInput name="user_intro" control={control} type="text" />
            <input
              className="hidden"
              type="file"
              accept="image/*"
              id="profil-image"
              onChange={handleImageChange}
            />
            <div className="modal-action">
              <button
                className={`btn  p-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black `}
              >
                변경
              </button>
            </div>
          </form>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>닫기</button>
      </form>
    </dialog>
  );
};

export default ProfilEditModal;
