import domToImage from 'dom-to-image-more';
import fs from 'file-saver';
import html2canvas from 'html2canvas';

export async function saveDomNodeAsImage(
  node: React.RefObject<HTMLElement>['current'],
  cover: { width: number; height: number; aspectRatio: number }
) {
  if (!node) return { success: false, blob: null };

  const TARGET_WIDTH = cover.width;
  const TARGET_HEIGHT = cover.height;

  try {
    const originalRect = node.getBoundingClientRect();

    const scaleFactorWidth = TARGET_WIDTH / originalRect.width;
    const scaleFactorHeight = TARGET_HEIGHT / originalRect.height;
    const SCALE_FACTOR = Math.min(scaleFactorWidth, scaleFactorHeight);

    const canvas = await html2canvas(node, {
      onclone: (_doc, el) => {
        el.style.borderRadius = '0';
      },
      scale: SCALE_FACTOR,
      useCORS: true,
      logging: false,
      // Otherwise there is a white looking border on the right side of the image
      backgroundColor: null
    });

    const blob = await domToImage.toBlob(canvas, {
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
      scale: 1,
      quality: 1,
      style: {
        'image-rendering': 'smooth'
      }
    });

    fs.saveAs(blob, 'coverSnap-cover.png');
    return { success: true, blob };
  } catch (_error) {
    console.error(_error);
    return { success: false, blob: null };
  }
}
