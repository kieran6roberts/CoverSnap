import fs from 'file-saver';
import * as htmlToImage from 'html-to-image';

export async function saveDomNodeAsImage(
  node: React.RefObject<HTMLElement>['current'],
  cover: { width: number; height: number; aspectRatio: number }
) {
  if (!node) return { success: false, blob: null };

  const TARGET_WIDTH = cover.width;
  const TARGET_HEIGHT = cover.height;

  try {
    const blob = await htmlToImage.toBlob(node, {
      quality: 1,
      // Gives double the expected size otherwise
      canvasWidth: TARGET_WIDTH / 2,
      canvasHeight: TARGET_HEIGHT / 2,
      style: {
        margin: '0',
        border: '0',
        borderRadius: '0'
      }
    });

    if (!blob) {
      throw new Error('Failed to generate blob');
    }
    fs.saveAs(blob, 'coverSnap-cover.png');
    return { success: true, blob };
  } catch (_error) {
    console.error(_error);
    return { success: false, blob: null };
  }
}
