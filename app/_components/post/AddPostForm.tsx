'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import PostTooltipIcon from '../icons/PostTooltipIcon';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { uploadImage, uploadPost } from '@/app/_api/post';
import { useAuthStore } from '@/app/_store/auth';
import { STORAGE_ROOT_URL } from '@/app/_constant/endPoint';
import RemoveIcon from '../icons/RemoveIcon';
import ImageSlider from '../common/ImageSlider';
import 'react-quill/dist/quill.bubble.css';
import './style/quillStyle.css';
import 'slick-carousel/slick/slick.css';

export const AddPostForm = () => {
  const [post, setPost] = useState<string | Node>('');
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(false);

  const { userInfo } = useAuthStore();

  const safeHTML = DOMPurify.sanitize(post);

  useEffect(() => {
    if (post === '' || post === '<p><br></p>') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [post]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files === null) return;

    const file = e.target.files?.[0];

    if (file === undefined) return;

    const fileData = {
      image: file,
      uuid: userInfo.uid,
    };

    imageUpload.mutate(fileData);
  };

  const removeImage = (url: string) => {
    const newUrlArray = imagePreviewUrls.filter((preUrl) => preUrl !== url);
    setImagePreviewUrls(newUrlArray);
  };

  const handleSubmit = () => {
    if (isEmpty) {
      return;
    }

    const postData = {
      content: safeHTML,
      userId: userInfo.uid,
      imageUrl: imagePreviewUrls,
    };
    postUpload.mutate(postData);
  };

  const imageUpload = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      if (data?.error !== null) {
        console.log(data.error.message);
        return;
      }
      const url = `${STORAGE_ROOT_URL}${data.data?.path}`;
      setLoading(false);
      setImagePreviewUrls([...imagePreviewUrls, url]);
    },
    onMutate: () => setLoading(true),
  });

  const postUpload = useMutation({
    mutationFn: uploadPost,
    onSuccess: () => {
      setPost('');
      setImagePreviewUrls([]);
    },
  });

  return (
    <>
      <form>
        <ReactQuill
          className="text-gray-700 dark:text-gray-400 placeholder:text-nonSelectIcon"
          theme="bubble"
          onChange={setPost}
          placeholder="스레드를 시작하세요..."
        />

        {loading ? (
          <div>
            <div className="flex justify-center min-h-56">
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          </div>
        ) : (
          <div className="p-1">
            {imagePreviewUrls.length !== 0 && (
              <ImageSlider>
                {imagePreviewUrls.map((url, index) => (
                  <picture
                    className={`${
                      imagePreviewUrls.length > 1 ? 'h-56' : 'h-auto'
                    } relative`}
                    key={url}
                  >
                    <Image
                      draggable={false}
                      src={url}
                      width="500"
                      height="500"
                      className="w-full p-1 h-full object-cover rounded-xl"
                      alt={`Image preview ${index}`}
                      priority={true}
                    />
                    <div
                      className="absolute top-3 right-3"
                      onClick={() => removeImage(url)}
                    >
                      <RemoveIcon />
                    </div>
                  </picture>
                ))}
              </ImageSlider>
            )}
          </div>
        )}
        <label
          className="flex items-center cursor-pointer w-16"
          htmlFor="add-picture"
        >
          <div className="">
            <PostTooltipIcon style="ml-1" />
          </div>
          {imagePreviewUrls.length >= 1 && (
            <span className="text-xs ml-2 text-nonSelectIcon">추가</span>
          )}
        </label>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          id="add-picture"
          onChange={handleImageChange}
        />
      </form>
      <div className="modal-action absolute bottom-3 right-3 sm:flex sm:static">
        <form method="dialog">
          <button
            className={`btn  p-4 rounded-2xl ${
              isEmpty
                ? 'pointer-events-none cursor-not-allowed bg-gray-500 text-white dark:bg-gray-600 dark:text-white'
                : 'bg-black dark:bg-white text-white dark:text-black'
            }`}
            onClick={handleSubmit}
          >
            게시
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPostForm;
