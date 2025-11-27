import html2canvas from "html2canvas";

/**
 * Generates an image (PNG) from raw HTML string.
 * @param html Raw HTML string to render and convert to image
 * @returns Promise resolving to a Blob (PNG) or data URL string
 */
export async function generateImageFromHtml(html: string): Promise<Blob | string> {
  // Create a container element to render the HTML
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.width = "auto";
  container.style.height = "auto";
  container.innerHTML = html;
  document.body.appendChild(container);

  try {
    // Use html2canvas to render the container to canvas
    const canvas = await html2canvas(container, {
      useCORS: true,
    });
    // You can choose to return a Blob or a data URL
    // Example: return as Blob
    return new Promise<Blob | string>((resolve) => {
      canvas.toBlob(
        (blob) => {
          document.body.removeChild(container);
          if (blob) resolve(blob);
          else resolve(canvas.toDataURL("image/png"));
        },
        "image/png"
      );
    });
  } catch (error) {
    document.body.removeChild(container);
    throw error;
  }
}
