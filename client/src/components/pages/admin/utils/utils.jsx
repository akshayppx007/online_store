import axios from "axios";

export const uploadImagesApiRequest = async (images, productId) => {
  const formData = new FormData();
  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
  const { data } = await axios.post("/api/admin/product/images/new?productId=" + productId, formData);
  return data;
};

export const uploadImagesCloudinaryApiRequest = (images,productId) => {
    const url = "https://api.cloudinary.com/v1_1/dtrhzpgsd/image/upload";
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        let file = images[i];
        formData.append("file", file);
        formData.append( "upload_preset" ,"ml_default");
        fetch(url, {
            method: "POST",
            body: formData,
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            axios.post("/api/admin/product/images/new?cloudinary=true&productId=" + productId, data);
        })
    }
}