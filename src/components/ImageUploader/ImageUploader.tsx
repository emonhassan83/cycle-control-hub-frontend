const uploadImageToImgbb = async (file: File) => {  
    const url = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`;
    
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const imageData = await response.json();
      
      console.log({file, formData, imageData});
      if (imageData.status === 200) {
        const imageUrl = imageData?.data?.display_url;
        return imageUrl;
      } else {
        console.error("Error uploading image:", imageData);
        // throw new Error(imageData.error);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  
  export default uploadImageToImgbb;
  