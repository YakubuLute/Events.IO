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
      width: {
        exact: 1280,
      },
      height: {
        exact: 720,
      },
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

      const capturedImageWidth = video.videoWidth;
      const capturedImageHeight = video.videoHeight;

      canvas.width = capturedImageWidth;
      canvas.height = capturedImageHeight;

      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            onCapture(blob);
          }
        });
      }
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
