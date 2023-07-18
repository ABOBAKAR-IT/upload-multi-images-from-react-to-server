import { IconButton, TextField, Button, Typography, Grid, Container, Box, Paper } from "@mui/material";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import InputSchema from "./InputSchema.js";

export default function AddInventory({ closeModel }) {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChangelandingImage = (event) => {
    const imageFile = event.target.files[0];
    setFile(imageFile);
    setFileUrl(URL.createObjectURL(imageFile));
    productFormik.setFieldValue("landingImage", imageFile);
  };

  const handleChangeImage = (event) => {
    const imageFile = event.target.files;
    productFormik.setFieldValue("image", imageFile);
  };

  const handleChangeVideo = (event) => {
    const imageFile = event.target.files[0];
  
    productFormik.setFieldValue("video", imageFile);
  };
 

  const productFormik = useFormik({
    initialValues: {
      productName: "",
      price: "",
      category: "",
      landingImage: "",
      description: "",
      discount: 0,
      image: [],
      video: null,
    },
    // validationSchema: InputSchema,
    onSubmit: async (values, action) => {
      try {
        setIsLoading(true);

        let formData = new FormData();
        formData.append("productName", values.productName);
        formData.append("price", values.price);
        formData.append("category", values.category);
        formData.append("landingImage", values.landingImage);
        formData.append("description", values.description);
        formData.append("discount", values.discount);

        var data = await axios.post(
          "http://localhost:4000/upload",
          formData
        );

        setIsLoading(false);
        console.log("response ", data.data);

        if (data.data) {
          Swal.fire({
            icon: "success",
            title: "Your work has been saved",
          });
        
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went error!",
          });
       
        }
      } catch (error) {
        
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "request error!",
        });
      

        console.log(error);
      }

      console.log(productFormik.errors);
      action.resetForm();
    },
  });

  const main_grid = { width: "100%", height: "100vh", overflowY: "hidden" };
  const main_box = {
    width: "100%",
    height: "100%",
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
          <Typography variant="h4" component="h3" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} className='Typo_name'>
            Add Product
          </Typography>

          <Container sx={con_main}>
            <Grid item xs={8} width={{ lg: '19rem', md: '17rem' }}>
              <br />
             





              <TextField
                id="outlined-basic"
                name="productName"
                label="Name"
                variant="outlined"
                sx={{ ml: "5px", mb: "10px" }}
                {...productFormik.getFieldProps("productName")}
                error={productFormik.touched.productName && Boolean(productFormik.errors.productName)}
                helperText={productFormik.touched.productName && productFormik.errors.productName}
              />
              <TextField
                id="outlined-basic"
                name="category"
                label="Category"
                variant="outlined"
                sx={{ ml: "5px", mb: "10px" }}
                {...productFormik.getFieldProps("category")}
                error={productFormik.touched.category && Boolean(productFormik.errors.category)}
                helperText={productFormik.touched.category && productFormik.errors.category}
              />
              {/* Other text input fields... */}

             
                <input
                 
                  accept="image/*"
                  type="file"
                  name="landingImage"
                  onChange={handleChangelandingImage}
                />
                <input
                 
                 accept="image/*"
                 type="file"
                 multiple
                 name="image"
                 onChange={handleChangeImage}
               />
                 <input
                 
                 accept="video/*"
                 type="file"
                 name="video"
                 onChange={handleChangeVideo}
               />
            
              <br />

             
            

              <br />

              {!file && (
                <small style={{ color: "red" }}>
                  {productFormik.errors.item_pic}
                </small>
              )}

              <br />

              <Button
                onClick={productFormik.handleSubmit}
                disabled={isLoading}
                variant="contained"
                sx={{ color: "yellow", float: "right" }}
              >
                Submit
              </Button>
            </Grid>
          </Container>
        </Paper>
      </Box>
    </Grid>
  );
}
