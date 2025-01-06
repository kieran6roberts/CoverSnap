import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { toast } from 'sonner';

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
        toast.error('Failed to download image. If the issue persists, contact @Kieran6Dev on X.', {
          action: {
            label: 'Contact me',
            onClick: () => window.open('https://x.com/Kieran6Dev', '_blank')
          },
          duration: 15000
        });
        setTimeout(() => {
          close();
        }, 500);
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
