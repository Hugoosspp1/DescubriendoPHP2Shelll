export function downloadFile(
  filename: string,
  content: string,
  contentType = 'text/plain;charset=utf-8',
): void {
  const objectUrl = URL.createObjectURL(new Blob([content], { type: contentType }));
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();

  // Let the browser begin the download before releasing its object URL.
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}
