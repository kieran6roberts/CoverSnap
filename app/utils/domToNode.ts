/* eslint-disable @typescript-eslint/no-unused-vars */
import domToImage from 'dom-to-image-more';
import fs from 'file-saver';

const TARGET_WIDTH = 1600;
const TARGET_HEIGHT = 840;

export async function saveDomNodeAsImage(node: React.RefObject<HTMLElement>['current']) {
  if (!node) return { success: false, blob: null };

  try {
    const originalRect = node.getBoundingClientRect();

    const clone = node.cloneNode(true) as HTMLElement;
    document.body.appendChild(clone);

    const scaleFactorWidth = TARGET_WIDTH / originalRect.width;
    const scaleFactorHeight = TARGET_HEIGHT / originalRect.height;
    const SCALE_FACTOR = Math.min(scaleFactorWidth, scaleFactorHeight);

    Object.assign(clone.style, {
      position: 'absolute',
      left: '-9999px',
      margin: '0',
      boxSizing: 'border-box'
    });

    const titleRndWrapper = Array.from(clone.querySelectorAll('[class*="rndWrapper"]'));

    // Remove dashed borders
    if (titleRndWrapper.length > 0) {
      titleRndWrapper.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.border = 'none';
        }
      });
    }

    const blob = await domToImage.toBlob(clone, {
      scale: SCALE_FACTOR
    });

    document.body.removeChild(clone);
    fs.saveAs(blob, 'coverSnap-cover.png');

    return { success: true, blob };
  } catch (_error) {
    return { success: false, blob: null };
  }
}
