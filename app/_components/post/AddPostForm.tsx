'use client';

import { ChangeEvent, useState } from 'react';
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
  const [loading, setLoading] = useState(false);

  const { userInfo } = useAuthStore();

  const safeHTML = DOMPurify.sanitize(post);

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
      setPost('');
      setImagePreviewUrls([]);
    },
    onMutate: () => setLoading(true),
  });

  const postUpload = useMutation({ mutationFn: uploadPost });

  return (
    <>
      <form className="">
        <ReactQuill
          className="text-black dark:text-white placeholder:text-white"
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
          <div className="p-3">
            {imagePreviewUrls.length !== 0 && (
              <ImageSlider>
                {imagePreviewUrls.map((url, index) => (
                  <picture
                    className={`w-32 ${
                      imagePreviewUrls.length > 1 && 'h-56'
                    } relative`}
                    key={url}
                  >
                    <Image
                      draggable={false}
                      src={url}
                      width="500"
                      height="500"
                      className="w-full p-1 h-full object-cover rounded-lg"
                      alt={`Image preview ${index}`}
                      priority={true}
                    />
                    <div
                      className="absolute top-0 right-0"
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
        <label className="cursor-pointer" htmlFor="add-picture">
          <PostTooltipIcon />
        </label>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          id="add-picture"
          onChange={handleImageChange}
        />
      </form>
      <div className="modal-action">
        <form method="dialog">
          <button
            className="btn bg-black dark:bg-white text-white dark:text-black p-4 rounded-2xl"
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
