import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Image from 'next/image';
import { ImageType } from '@/app/_types/post';
import ImageControls from './ImageControls';
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
    <dialog id={modalId} className="modal bg-black bg-opacity-85 ">
      <div className="modal-box bg-transparent shadow-none overflow-hidden p-0">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute"></button>
        </form>
        <ImageSlider slidesToShow={1}>
          {images.map((image) => (
            <div key={image.image_id}>
              <TransformWrapper wheel={{ disabled: true }} disablePadding>
                <div className="relative">
                  <ImageControls />
                  <TransformComponent>
                    <picture>
                      <Image
                        className={`w-screen h-auto`}
                        width={width}
                        height={height}
                        src={image.image_url}
                        alt={alt}
                        priority
                      />
                    </picture>
                  </TransformComponent>
                </div>
              </TransformWrapper>
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
