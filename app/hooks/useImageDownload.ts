import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { saveDomNodeAsImage } from '~/utils/domToNode';

interface UseImageDownloadProps {
  imageRef: React.RefObject<HTMLElement | null>;
}

export const useImageDownload = ({ imageRef }: UseImageDownloadProps) => {
  const [visible, { open, close }] = useDisclosure(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const downloadImage = async () => {
    open();

    if (imageRef.current) {
      const result = await saveDomNodeAsImage(imageRef.current);

      if (result.success) {
        setIsSuccessModalOpen(true);
        setTimeout(() => {
          close();
        }, 500);
      } else {
        toast.error('Failed to download image. If the issue persists, contact @Kieran6Dev on X.');
      }
    }
  };

  return {
    isLoading: visible,
    isSuccessModalOpen,
    closeSuccessModal: () => setIsSuccessModalOpen(false),
    downloadImage
  };
};
