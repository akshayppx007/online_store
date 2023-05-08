import axios from "axios";
import {
	uploadImagesApiRequest,
	uploadImagesCloudinaryApiRequest,
} from "./utils/utils";
import { useSelector } from "react-redux";
import {
	newCategory,
	deleteCategory,
	saveAttributeToCatDoc,
} from "../../../actions/categoryActions";
import { useDispatch } from "react-redux";
import CreateProductPageComponent from "./components/createProductsComponent";

const createProductApiRequest = async (formInputs) => {
	const { data } = await axios.post(`/api/admin/product/new`, {
		...formInputs,
	});
	return data;
};

const AdminCreateProduct = () => {
	const { categories } = useSelector((state) => state.categories);
	const dispatch = useDispatch();

	return (
		<CreateProductPageComponent
			createProductApiRequest={createProductApiRequest}
			uploadImagesApiRequest={uploadImagesApiRequest}
			uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
			categories={categories}
			reduxDispatch={dispatch}
			newCategory={newCategory}
			deleteCategory={deleteCategory}
			saveAttributeToCatDoc={saveAttributeToCatDoc}
		/>
	);
};

export default AdminCreateProduct;
