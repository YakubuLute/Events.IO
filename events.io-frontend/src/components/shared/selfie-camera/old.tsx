import React, {
  forwardRef,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import styles from './styles.module.scss';
import { useUserMedia } from './useUserMedia';

type Props = {
  circleRef: RefObject<HTMLDivElement>;
  onClear: () => void;
  onCapture: (data: Blob) => void;
  containerRef: RefObject<HTMLDivElement>;
};

export type CameraRefProps = {
  handleCapture: () => void;
  handleClear: () => void;
};

const Camera: React.ForwardRefRenderFunction<CameraRefProps, Props> = (
  props,
  ref
) => {
  const { circleRef, onClear, onCapture, containerRef } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  const mediaStream = useUserMedia({
    audio: false,
    video: {
      facingMode: 'user',
    },
  });

  if (mediaStream && videoRef.current) {
    videoRef.current.srcObject = mediaStream;
  }

  const handleCanPlay = () => {
    if (videoRef.current) {
      setVideoPlaying(true);
      videoRef.current.play();
    }
  };

  const handleCapture = useCallback(() => {
    if (
      canvasRef.current &&
      videoRef.current &&
      circleRef.current &&
      containerRef.current
    ) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      // const circle = circleRef.current;
      const container = containerRef.current;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const capturedImageWidth = video.videoWidth;
      const capturedImageHeight = video.videoHeight;

      const isLandscape = capturedImageWidth > capturedImageHeight;

      canvas.width = containerWidth;
      canvas.height = containerHeight;

      const aspectRatio = isLandscape
        ? capturedImageWidth / capturedImageHeight
        : capturedImageHeight / capturedImageWidth;

      let imageWidth: number, imageHeight: number;
      if (containerWidth / containerHeight > aspectRatio) {
        imageWidth = containerHeight * aspectRatio;
        imageHeight = containerHeight;
      } else {
        imageWidth = containerWidth;
        imageHeight = containerHeight / aspectRatio;
      }

      const x = (containerWidth - imageWidth) / 2;
      const y = (containerHeight - imageHeight) / 2;

      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(video, x, y, imageWidth, imageHeight);

        canvas.toBlob((blob) => {
          if (blob) {
            onCapture(blob);
          }
        });
      }

      // const circleRect = circle.getBoundingClientRect();
      // const containerRect = container.getBoundingClientRect();

      // const circleLeft = circleRect.left - containerRect.left;
      // const circleTop = circleRect.top - containerRect.top;

      // const rect = {
      //   left: circleLeft,
      //   top: circleTop,
      //   width: circleRect.width,
      //   height: circleRect.height,
      // };
      // const croppedImageData = ctx?.getImageData(
      //   rect.left,
      //   rect.top,
      //   rect.width,
      //   rect.height
      // );

      // const croppedCanvas = document.createElement('canvas');
      // croppedCanvas.width = rect.width;
      // croppedCanvas.height = rect.height;
      // const croppedCtx = croppedCanvas.getContext('2d');
      // croppedCtx?.putImageData(croppedImageData as ImageData, 0, 0);

      // croppedCanvas.toBlob((blob) => {
      //   if (blob) {
      //     onCapture(blob);
      //   }
      // });
    }
  }, [circleRef, containerRef, onCapture]);

  const handleClear = useCallback(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        onClear();
      }
    }
  }, [onClear]);

  useImperativeHandle(
    ref,
    () => {
      return {
        handleCapture,
        handleClear,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <video
        ref={videoRef}
        onCanPlay={handleCanPlay}
        hidden={!isVideoPlaying}
        autoPlay
        muted
        playsInline
        className={styles.video}
      />
      <canvas ref={canvasRef} className={styles.canvas} />
    </>
  );
};

export default forwardRef(Camera);
