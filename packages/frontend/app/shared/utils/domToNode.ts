import * as htmlToImage from 'html-to-image';

export async function getBlobFromDomNode(
  node: React.RefObject<HTMLElement>['current'],
  cover: { width: number; height: number; aspectRatio: number }
) {
  const TARGET_WIDTH = cover.width;
  const TARGET_HEIGHT = cover.height;

  const blob = await htmlToImage.toBlob(node, {
    quality: 1,
    pixelRatio: 1,
    canvasWidth: TARGET_WIDTH,
    canvasHeight: TARGET_HEIGHT,
    style: {
      margin: '0',
      border: '0',
      borderRadius: '0',
      transform: 'scale(1)',
      transformOrigin: 'top left'
    }
  });

  return blob;
}
