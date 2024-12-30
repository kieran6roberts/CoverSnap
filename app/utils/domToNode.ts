import domToImage from 'dom-to-image-more';
import fs from 'file-saver';

export async function saveDomNodeAsImage(node: React.RefObject<HTMLElement>['current']) {
  try {
    const blob = await domToImage.toBlob(node, {
      height: 840,
      width: 1600
    });

    fs.saveAs(blob, 'coverSnap-cover.png');
  } catch (error) {
    console.error('oops, something went wrong!', error);
    return false;
  }
  return true;
}
