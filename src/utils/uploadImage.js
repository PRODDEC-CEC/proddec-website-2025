const uploadImage = async (file) => {
    const cloudName = 'dxnunm5qz'; // Replace with your Cloudinary cloud name
    const uploadPreset = 'proddecImages'; // Replace with your unsigned upload preset

    if (!cloudName || !uploadPreset || cloudName === 'YOUR_CLOUD_NAME') {
        throw new Error("Cloudinary configuration missing. Please check src/utils/uploadImage.js");
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error.message || 'Image upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export default uploadImage;
