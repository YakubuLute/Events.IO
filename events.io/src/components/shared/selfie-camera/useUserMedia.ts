import { useEffect, useState } from 'react';

export const useUserMedia = (constraints: MediaStreamConstraints) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const enableVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMediaStream(stream);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!mediaStream) {
      enableVideoStream();
    } else {
      return () => {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaStream]);

  return mediaStream;
};
