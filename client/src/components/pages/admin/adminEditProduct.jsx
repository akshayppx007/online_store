import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
	uploadImagesApiRequest,
	uploadImagesCloudinaryApiRequest,
} from "./utils/utils";
import { saveAttributeToCatDoc } from "../../../actions/categoryActions";
import EditProductPageComponent from "./components/editProductComponent";

const fetchProduct = async (productId) => {
	const { data } = await axios.get(`/api/admin/product/${productId}`);
	return data;
};

const updateProductApiRequest = async (productId, formInputs) => {
	const { data } = await axios.put(`/api/admin/product/${productId}`, {
		...formInputs,
	});
	return data;
};

const AdminEditProduct = () => {
	const { categories } = useSelector((state) => state.categories);

	const reduxDispatch = useDispatch();

	const imageDeleteHandler = async (imagePath, productId) => {
		let encoded = encodeURIComponent(imagePath);
		if (process.env.NODE_ENV !== "production") {
			// to do: change to !==
			await axios.delete(`/api/admin/product/image/${encoded}/${productId}`);
		} else {
			await axios.delete(
				`/api/admin/product/image/${encoded}/${productId}?cloudinary=true`
			);
		}
	};

	return (
		<EditProductPageComponent
			categories={categories}
			fetchProduct={fetchProduct}
			updateProductApiRequest={updateProductApiRequest}
			reduxDispatch={reduxDispatch}
			saveAttributeToCatDoc={saveAttributeToCatDoc}
			imageDeleteHandler={imageDeleteHandler}
			uploadImagesApiRequest={uploadImagesApiRequest}
			uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
		/>
	);
};

export default AdminEditProduct;
