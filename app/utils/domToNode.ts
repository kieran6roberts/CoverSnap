import domToImage from 'dom-to-image-more';
import fs from 'file-saver';
import html2canvas from 'html2canvas';

const TARGET_WIDTH = 1600;
const TARGET_HEIGHT = 840;

export async function saveDomNodeAsImage(node: React.RefObject<HTMLElement>['current']) {
  if (!node) return { success: false, blob: null };

  try {
    const originalRect = node.getBoundingClientRect();
    const canvas = await html2canvas(node, {
      onclone: (_doc, el) => {
        el.style.borderRadius = '0';
      }
    });

    const scaleFactorWidth = TARGET_WIDTH / originalRect.width;
    const scaleFactorHeight = TARGET_HEIGHT / originalRect.height;
    const SCALE_FACTOR = Math.min(scaleFactorWidth, scaleFactorHeight);

    const blob = await domToImage.toBlob(canvas, {
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
      scale: SCALE_FACTOR
    });

    fs.saveAs(blob, 'coverSnap-cover.png');
    return { success: true, blob };
  } catch (_error) {
    console.error(_error);
    return { success: false, blob: null };
  }
}
