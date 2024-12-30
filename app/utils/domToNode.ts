import domToImage from 'dom-to-image-more';
import fs from 'file-saver';

const TARGET_WIDTH = 1600;
const TARGET_HEIGHT = 840;

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

    const blob = await domToImage.toBlob(clone, {
      height: targetHeight,
      width: targetWidth
    });

    document.body.removeChild(clone);
    fs.saveAs(blob, 'coverSnap-cover.png');

    return { success: true, blob };
  } catch (error) {
    console.error('oops, something went wrong!', error);
    return { success: false, blob: null };
  }
}
