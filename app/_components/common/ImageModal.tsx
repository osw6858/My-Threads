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
