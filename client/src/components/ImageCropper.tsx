import { ChangeEvent, useState, useRef } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// TODO:
//  1. Allow admins to
//   1.1 Update bio picture (Cloudinary)
//   1.2 Update bio description
//   1.3 Update job photo (Cloudinary)
const Cropper = () => {
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState('');
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  });
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

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
      const croppedImageUrl = canvas.toDataURL();
      console.log(croppedImageUrl);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e)}
      />
      <ReactCrop
        crop={crop}
        aspect={1}
        circularCrop={true}
        onChange={(c) => setCrop(c)}
      >
        <img src={image} ref={imgRef} />
      </ReactCrop>
      <button className="btn" onClick={getCroppedImage}>
        Crop Image
      </button>
    </div>
  );
};

export default Cropper;
