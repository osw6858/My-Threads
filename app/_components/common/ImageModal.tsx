import Image from 'next/image';
import { ImageType } from '@/app/_types/post';
import ImageSlider from './ImageSlider';

interface Image {
  modalId: string;
  images: ImageType[];
  width: number;
  height: number;
  alt: string;
}

const ImageModal = ({ modalId, images, width, height, alt }: Image) => {
  return (
    <dialog id={modalId} className="modal bg-black bg-opacity-85">
      <div className="modal-box bg-transparent shadow-none p-0 overflow-hidden rounded-none">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 z-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="opacity-50"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          </button>
        </form>
        <ImageSlider slidesToShow={1}>
          {images.map((image) => (
            <div key={image.image_id}>
              <picture>
                <Image
                  className={`w-screen h-auto cursor-grab`}
                  width={width}
                  height={height}
                  src={image.image_url}
                  alt={alt}
                  priority
                />
              </picture>
            </div>
          ))}
        </ImageSlider>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>닫기</button>
      </form>
    </dialog>
  );
};

export default ImageModal;
