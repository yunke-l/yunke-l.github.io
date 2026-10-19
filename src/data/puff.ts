const descriptions = [
  "Puff resting under a desk with one front paw stretched out on the carpet.",
  "Puff stretching out on the carpet beside a small green toy.",
  "Puff lounging on the carpet and looking toward the camera.",
  "Puff curled up on a bed beside the pillows.",
  "Puff stretched out on the carpet, looking up at the camera.",
  "Puff peeking out from under a fabric tunnel."
];

export const puffPhotos = descriptions.map((alt, index) => {
  const filename = `puff-${String(index + 1).padStart(2, "0")}`;
  return {
    src: `/assets/img/cat/${filename}.webp`,
    thumbnail: `/assets/img/cat/${filename}-thumb.webp`,
    filename: `${filename}.webp`,
    alt
  };
});
