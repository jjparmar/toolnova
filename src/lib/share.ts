/**
 * Social sharing utilities
 */

/**
 * Share via Web Share API (mobile-friendly)
 */
export async function shareNative(
  title: string,
  text: string,
  url?: string,
): Promise<boolean> {
  if (!navigator.share) {
    return false;
  }

  try {
    await navigator.share({
      title,
      text,
      url: url || window.location.href,
    });
    return true;
  } catch (error) {
    // User cancelled or share failed
    console.error("Share failed:", error);
    return false;
  }
}

/**
 * Share on Twitter/X
 */
export function shareOnTwitter(text: string, url?: string): void {
  const tweetUrl = url || window.location.href;
  const twitterUrl =`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(tweetUrl)}`;
  openInNewTab(twitterUrl);
}

/**
 * Share on LinkedIn
 */
export function shareOnLinkedIn(url?: string): void {
  const shareUrl = url || window.location.href;
  const linkedInUrl =`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  openInNewTab(linkedInUrl);
}

/**
 * Share on Facebook
 */
export function shareOnFacebook(url?: string): void {
  const shareUrl = url || window.location.href;
  const facebookUrl =`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  openInNewTab(facebookUrl);
}

/**
 * Share via WhatsApp
 */
export function shareOnWhatsApp(text: string): void {
  const whatsappUrl =`https://wa.me/?text=${encodeURIComponent(text)}`;
  openInNewTab(whatsappUrl);
}

/**
 * Share via Email
 */
export function shareViaEmail(subject: string, body: string): void {
  const mailtoUrl =`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}

/**
 * Generate shareable link with parameters
 */
export function generateShareableLink(toolName: string, input: string): string {
  const baseUrl = window.location.origin;
  const params = new URLSearchParams({
    tool: toolName,
    input: input.substring(0, 200), // Limit to 200 chars for URL
  });
  return`${baseUrl}?${params.toString()}`;
}

/**
 * Copy link to clipboard
 */
export async function copyLinkToClipboard(url?: string): Promise<void> {
  const linkToCopy = url || window.location.href;
  await navigator.clipboard.writeText(linkToCopy);
}

/**
 * Generate QR code URL using a free API
 */
export function generateQRCodeURL(text: string, size: number = 200): string {
  return`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
}

/**
 * Utility: Open URL in new tab
 */
function openInNewTab(url: string): void {
  const newWindow = window.open(url,"_blank","noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
}

/**
 * Check if Web Share API is supported
 */
export function isWebShareSupported(): boolean {
  return typeof navigator !=="undefined" &&"share" in navigator;
}

/**
 * Share result with attribution
 */
export function shareResult(toolName: string, result: string): string {
  const attribution =`\n\n---\nGenerated with ToolNova\n🔗 toolnovahub.com`;
  return result + attribution;
}
