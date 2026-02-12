/**
 * Optimizes Cloudinary Image URLs
 * Adds auto format and quality parameters if not present.
 * @param {string} url - The original image URL
 * @param {number} width - Optional width to resize to
 * @returns {string} - The optimized URL
 */
const getOptimizedImageUrl = (url, width) => {
    if (!url) return '';
    if (!url.includes('cloudinary.com')) return url; // Return as is if not Cloudinary

    // Check if already optimized
    if (url.includes('f_auto,q_auto')) return url;

    // Split URL to inject parameters
    const parts = url.split('/upload/');
    if (parts.length < 2) return url;

    let params = 'f_auto,q_auto';
    if (width) params += `,w_${width}`;

    return `${parts[0]}/upload/${params}/${parts[1]}`;
};

export default getOptimizedImageUrl;
