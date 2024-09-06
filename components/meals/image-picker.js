'use client';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';
export default function ImagePicker({ label, name }) {
  const imageRef = useRef();
  const [pickedImage, setpickedImage] = useState();
  function inputImageHandler() {
    imageRef.current.click();
  }
  function pickedImageHandler(event) {
    const file = event.target.files[0];
    if (!file) {
      setpickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setpickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }
  return (
    <div className={classes['picker']}>
      <label htmlFor={name}>{label}</label>
      <div className={classes['controls']}>
        <div className={classes['preview']}>
          {!pickedImage && <p>No file is selected!</p>}
          {pickedImage && <Image src={pickedImage} alt="Image selected by user!" fill />}
        </div>
        <input
          className={classes['input']}
          type="file"
          id={name}
          name={name}
          accept="image/png,image/jpeg "
          ref={imageRef}
          onChange={pickedImageHandler}
        />
        <button className={classes['button']} type="button" onClick={inputImageHandler}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
