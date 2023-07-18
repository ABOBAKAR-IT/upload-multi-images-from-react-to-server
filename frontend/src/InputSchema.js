import * as Yup from 'yup';
const InputSchema = Yup.object().shape({
    productName: Yup.string().required('Product name is required'),
    price: Yup.number().required('Price is required'),
    landingImage: Yup.mixed().required('Image is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    // image: Yup.mixed().required('Image is required'),
    // video: Yup.mixed().required('Video is required'),
  });
export default InputSchema;
