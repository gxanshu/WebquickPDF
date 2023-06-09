import {saveAsPDF} from "./exportAsPdf"

/**
 * function to convert Text with sapce to text with dashes
 * @param text: string
 * @returns Anshu Meena -> anshu-meena
 */
export function spaceToDash(text: string) {
  return text.toLowerCase().replaceAll(" ", "-");
}


/**
 * function to convert Text with sapce to text with dashes
 * @param text: string
 * @returns anshu-meena -> Anshu meena
 */
export function DashToSpace(text: string) {
  return text.replaceAll("-", " ");
}


/**
 * function to get image from firebase storage bucket
 * @param id: string
 * @param imageName: string
 * return https url form that {id}.jepg
 */
export function getHttpImage(id: string) {
  return `https://firebasestorage.googleapis.com/v0/b/quickpdf-codenanshu.appspot.com/o/${encodeURIComponent(
    `${id}`
  )}?alt=media`;
}

/**
 * function to convert cm values to Pixels
 * @param inch: number
 * @returns pixels: number
 */
export function inToPx(inch: number): number {
  const pxPerIn = 96;
  return Math.round(inch * pxPerIn);
}

export function inToPt(inch: number): number {
  const ptPrIn = 72;
  return Math.round(inch * ptPrIn);
}

export {
  saveAsPDF
}