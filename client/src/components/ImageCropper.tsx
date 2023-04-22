import { ChangeEvent, useState, useEffect, useRef } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface Props {
  setPhoto: React.Dispatch<React.SetStateAction<File | null>>;
  circle: boolean;
}

// TODO:
//  1. Allow admins to
//   1.1 Update bio picture (Cloudinary)
//   1.2 Update bio description
//   1.3 Update job photo (Cloudinary)
//  2. ONLY ALLOW IMAGE UPLOADS
const Cropper: React.FC<Props> = ({ setPhoto, circle }) => {
  const [image, setImage] = useState('');
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  });
  const [display, setDisplay] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // Allows user to hide the image
  const toggleDisplay = () => {
    display ? setDisplay(false) : setDisplay(true);
  };

  // Sets the image uploaded by user pre-crop
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Saves a cropped version of the uploaded image
  const getCroppedImage = () => {
    const img = imgRef.current;
    if (img && crop) {
      const canvas = document.createElement('canvas');
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;
      canvas.width = crop.width!;
      canvas.height = crop.height!;
      canvas.style.background = 'transparent';
      const ctx = canvas.getContext('2d')!;
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        crop.width! / 2,
        crop.height! / 2,
        crop.width! / 2,
        0,
        2 * Math.PI
      );
      ctx.clip();
      ctx.drawImage(
        img,
        crop.x! * scaleX,
        crop.y! * scaleY,
        crop.width! * scaleX,
        crop.height! * scaleY,
        0,
        0,
        crop.width!,
        crop.height!
      );
      ctx.restore();
      canvas.toBlob((blob) => {
        if (blob) {
          const photo = new File([blob], 'croppedImage.png', {
            type: 'image/png'
          });
          setPhoto(photo);
        }
      }, 'image/png');
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e)}
      />
      {
        image ?
        <button onClick={() => toggleDisplay()} className="border-2 border-black text-black hover:brightness-75 cursor-pointer bg-red-300 p-2 rounded-lg">
          Toggle Display
        </button>
        : null
      }
      { 
        display ?
        <ReactCrop
          crop={crop}
          aspect={circle ? 1 : undefined}
          circularCrop={circle}
          onChange={(c) => setCrop(c)}
          onComplete={() => getCroppedImage()}
        >
          <img src={image} ref={imgRef} onLoad={() => getCroppedImage()} />
        </ReactCrop>
        : null
      }
    </div>
  );
};

export default Cropper;
