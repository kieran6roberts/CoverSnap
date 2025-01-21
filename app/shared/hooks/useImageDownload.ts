import { useDisclosure } from '@mantine/hooks';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import fs from 'file-saver';

import { getBlobFromDomNode } from '~/shared/utils/domToNode';

const RETRY_ATTEMPTS = 3;

interface UseImageDownloadProps {
  imageRef: React.RefObject<HTMLElement | null>;
  cover: {
    width: number;
    height: number;
    aspectRatio: number;
  };
}

enum ImageErrorMap {
  CONVERSION_FAILED = 'CONVERSION_FAILED',
  SAVE_FAILED = 'SAVE_FAILED',
  NODE_NOT_FOUND = 'NODE_NOT_FOUND',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR'
}

const errorMessages: Record<ImageErrorMap, string> = {
  [ImageErrorMap.CONVERSION_FAILED]:
    'Failed to convert image. Please try again. Contact support if the issue persists.',
  [ImageErrorMap.SAVE_FAILED]: 'Failed to save image, please try again. Contact support if the issue persists.',
  [ImageErrorMap.NODE_NOT_FOUND]: 'Image element not found. Please refresh the page and try again.',
  [ImageErrorMap.UNEXPECTED_ERROR]:
    'An unexpected error occurred. Please try again. Contact support if the issue persists.'
};

class ImageDownloadError extends Error {
  constructor(
    message: string,
    public readonly code: ImageErrorMap
  ) {
    super(message);
    this.name = 'ImageDownloadError';
  }
}

export const useImageDownload = ({ imageRef, cover }: UseImageDownloadProps) => {
  const [visible, { open, close: closeSpinner }] = useDisclosure(false);
  const [isDownloadDisabled, setIsDownloadDisabled] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const retryCountRef = useRef(0);

  const downloadImage = async () => {
    open();

    try {
      retryCountRef.current += 1;

      if (!imageRef?.current) {
        throw new ImageDownloadError(errorMessages[ImageErrorMap.NODE_NOT_FOUND], ImageErrorMap.NODE_NOT_FOUND);
      }

      const blob = await getBlobFromDomNode(imageRef.current, cover);

      if (!blob) {
        throw new ImageDownloadError(errorMessages[ImageErrorMap.CONVERSION_FAILED], ImageErrorMap.CONVERSION_FAILED);
      }
      try {
        fs.saveAs(blob, 'cvrsnap-cover.png');
      } catch {
        throw new ImageDownloadError(errorMessages[ImageErrorMap.SAVE_FAILED], ImageErrorMap.SAVE_FAILED);
      }
      retryCountRef.current = 0;
      setIsSuccessModalOpen(true);
    } catch (error) {
      const canRetry = retryCountRef.current < RETRY_ATTEMPTS;
      const _error =
        error instanceof ImageDownloadError
          ? error
          : new ImageDownloadError(errorMessages[ImageErrorMap.UNEXPECTED_ERROR], ImageErrorMap.UNEXPECTED_ERROR);
      const errorLabel = canRetry ? 'Retry' : 'Contact Support';
      const errorAction = canRetry ? () => downloadImage() : () => window.open('https://x.com/Kieran6Dev', '_blank');

      toast.error(_error.message, {
        action: {
          label: errorLabel,
          onClick: errorAction
        },
        duration: 15000,
        position: 'top-center'
      });

      if (!canRetry) {
        setIsDownloadDisabled(true);
      }
    } finally {
      setTimeout(() => {
        closeSpinner();
      }, 500);
    }
  };

  return {
    isLoading: visible,
    isSuccessModalOpen,
    closeSuccessModal: () => setIsSuccessModalOpen(false),
    downloadImage,
    isDownloadDisabled
  };
};
