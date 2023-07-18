import {React,useState} from 'react';
import { useFormik } from "formik";
import axios from "axios";
import validationSchema from "./schema/CreatSchema";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Container,
  Grid,
  Typography,
  Select,
  Box,
  Paper,
  Stack,
  InputAdornment,
  MenuItem,
} from "@mui/material";

const initialValues = {
  productName: "",
  price: "",
  category: "",
  landingImage:"",
  description: "",
  discount: 0,
  image: [],
  video: null,
};

const formData = new FormData();
const CreateProductForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:async (values) => {
    
      try {
      console.log("ahmad sab")
      formData.append("productName", values.productName);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("landingImage", values.landingImage);
      formData.append("description", values.description);
      formData.append("discount", values.discount);

      // Append each image file individually
     
       // formData.append('image', values.image);
       if (Array.isArray(values.image) && values.image.length > 0) {
        values.image.forEach((image) => {
          formData.append("image", image);
        });
      }

      formData.append("video", values.video);

        const response = await axios.post("http://localhost:8000/addproduct", formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
alert("call done")
        console.log("response ",response.data);
        // Handle response
      } catch (error) {
        alert(error)
        console.error(error);
        // Handle error
      }
    }
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;
  const handleImageChange = (event) => {
    const imageFiles = Array.from(event.currentTarget.files);
    setFieldValue("image", imageFiles);
  };
const handleLandingImageChange=(event)=>{
  const landingImg=event.currentTarget.files[0];
  const imageUrl = URL.createObjectURL(landingImg);
  setFieldValue("landingImage", landingImg);
  setImagePreview(imageUrl);

}
  const handleVideoChange = (event) => {
    setFieldValue("video", event.currentTarget.files[0]);
  };
  const main_grid = { width: "100%", height: "100vh", overflowY: "hidden" };
  const main_box = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const paper_div = {
    width: {
      xs: "23rem",
      sm: "30rem",
      md: "30rem",
      lg: "30rem",
    },
    height: {
      xs: "36rem",
      sm: "39rem",
      md: "35rem",
      lg: "35rem",
    },
    borderRadius: "10px",
  };
  const con_main = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Grid id="main_grid_product" sx={main_grid}>
      <Box sx={main_box}>
        <Paper className="paper_div" sx={paper_div}>
        <Typography  variant="h4" component="h3" style={{width:'100%',display:'flex',justifyContent:'center'}} className='Typo_name'>
                  Add Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <Container sx={con_main}>
              <Stack
                spacing={{ xs: 0.5, sm: 0.5, md: 1, lg: 1 }}
                sx={{ width: "100%" }}
              >
                

                <Stack direction={'row'} spacing={1}>
                <Grid item xs={8} width={{lg :'19rem',md:'17rem'}}>
                  <TextField
                    name="productName"
                    label="Product Name"
                    value={values.productName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.productName && !!errors.productName}
                    helperText={touched.productName && errors.productName}
                    fullWidth
                    height={{lg:'30px'}}
                  />
                </Grid>
                <Grid item xs={8} width={{lg :'14rem',md:'12rem'}}>
                  <TextField
                    name="price"
                    label="Price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} width={{lg :'12rem',md:'13rem'}}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.category && !!errors.category}
                      displayEmpty
                      input={<OutlinedInput label="Category" />}
                    >
                      <MenuItem value="swords">Swords</MenuItem>
                      <MenuItem value="knife">Knife</MenuItem>
                      <MenuItem value="demoscus">Demoscus</MenuItem>
                    </Select>
                    {touched.category && errors.category && (
                      <Typography color="error" fontSize={12}>{errors.category}</Typography>
                    )}
                  </FormControl>
                </Grid>
                </Stack>
                
                <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLandingImageChange}
                    // style={{position:'fixed',top:'10rem'}}
                  />

                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      
                       {imagePreview!=null? <img
                          src={imagePreview}
                          style={{ maxWidth: "50px", maxHeight: "50px" }}
                          
                        />:null}
                      
                      {touched.landingImage && errors.landingImage && (
                        <Typography color="error" fontSize={12}>{errors.landingImage}</Typography>
                      )}
                    </div>
              
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    name="discount"
                    label="Discount"
                    value={values.discount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.discount && !!errors.discount}
                    helperText={touched.discount && errors.discount}
                    InputProps={{
                      inputProps: {
                        min: 0,
                        max: 100,
                        step: 5,
                      },
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </Grid>
              <Stack>
                  <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                   

                    onChange={handleImageChange}
                  />

                  {Array.isArray(values.image) && values.image.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {values.image.map((image, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index + 1}`}
                          style={{ maxWidth : "60px", maxHeight : "60px" }} 
                        />
                      ))}
                      {touched.image && errors.image && (
                        <Typography color="error" fontSize={12}>{errors.image}</Typography>
                      )}
                    </div>
                  )}
                </Grid><br/>
                <Grid item xs={12} >
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                  />
                  {touched.video && errors.video && (
                    <Typography color="error" fontSize={12}>{errors.video}</Typography>
                  )}
                </Grid>
              </Stack>
                <Grid item   xs={4} >
                  <Button id='addproduct-button' type="submit" variant="contained" color="primary" >
                    Add Product
                  </Button>
                </Grid>
              </Stack>
            </Container>
          </form>
        </Paper>
      </Box>
    </Grid>
  );
};

export default CreateProductForm;
