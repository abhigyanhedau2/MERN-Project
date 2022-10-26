import React, { useRef, useState, useEffect } from 'react';
import Button from './Button';
import './ImageUpload.css';

const ImageUpload = (props) => {

    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {

        if (!file)
            return;

        // Helps in reading and parsing files
        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        // Above function will execute once the file reading is done
        fileReader.readAsDataURL(file);

    }, [file]);

    const filePickedHandler = (event) => {

        let pickedFile;
        let fileIsValid = isValid;  // To avoid delay in state - isValid

        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }

        else {
            setIsValid(false);
            fileIsValid = false;
        }

        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {

        filePickerRef.current.click();



    };

    return (
        <div className='form-control'>
            <input
                ref={filePickerRef}
                id={props.id}
                type="file"
                style={{ display: 'none' }}
                accept=".jpg,.png,.jpeg"
                onChange={filePickedHandler}
            />
            <div className={`image-upload ${props.center ? 'center' : ''}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick an image</p>}
                </div>
                <Button type='button' onClick={pickImageHandler}>
                    Pick Image
                </Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )
};

export default ImageUpload;