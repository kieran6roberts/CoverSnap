import domToImage from 'dom-to-image-more';
import fs from 'file-saver';

const TARGET_WIDTH = 1600;
const TARGET_HEIGHT = 840;
const CONTAINER_MAX_WIDTH = 900;
const SCALE_FACTOR = TARGET_WIDTH / CONTAINER_MAX_WIDTH;

export async function saveDomNodeAsImage(node: React.RefObject<HTMLElement>['current']) {
  if (!node) return { success: false, blob: null };

  try {
    const clone = node.cloneNode(true) as HTMLElement;
    document.body.appendChild(clone);

    const targetWidth = TARGET_WIDTH;
    const targetHeight = TARGET_HEIGHT;

    Object.assign(clone.style, {
      position: 'absolute',
      left: '-9999px',
      width: `${targetWidth}px`,
      height: `${targetHeight}px`,
      transform: 'none',
      transformOrigin: 'top left'
    });

    const titleElement = clone.querySelector('[class*="title"]');
    const subtitleElement = clone.querySelector('[class*="subtitle"]');

    if (titleElement instanceof HTMLElement) {
      titleElement.style.fontSize = `${36 * SCALE_FACTOR}px`;
    }

    if (subtitleElement instanceof HTMLElement) {
      subtitleElement.style.fontSize = `${24 * SCALE_FACTOR}px`;
    }

    const blob = await domToImage.toBlob(clone, {
      height: targetHeight,
      width: targetWidth
    });

    document.body.removeChild(clone);
    fs.saveAs(blob, 'coverSnap-cover.png');

    return { success: true, blob };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return { success: false, blob: null };
  }
}
