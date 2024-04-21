import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Image from 'next/image';
import { ImageType } from '@/app/_types/post';
import ImageControls from './ImageControls';

interface Image {
  modalId: string;
  images: ImageType[];
  width: number;
  height: number;
  alt: string;
}

const ImageModal = ({ modalId, images, width, height, alt }: Image) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex flex-col mt-3">
          {images.map((image) => (
            <picture className="mb-2" key={image.image_id}>
              <TransformWrapper wheel={{ disabled: true }} disablePadding>
                <div className="relative">
                  <ImageControls />
                  <TransformComponent>
                    <Image
                      className={`p-3`}
                      width={width}
                      height={height}
                      src={image.image_url}
                      alt={alt}
                      priority
                    />
                  </TransformComponent>
                </div>
              </TransformWrapper>
            </picture>
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default ImageModal;
