/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";

function Billing() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [blogInfo, setuserInfo] = useState({
    description: "",
  });

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  const ondescription = (value) => {
    setuserInfo({ ...blogInfo, description: value });
  };
  function submitClick() {
    const formData = new FormData($("#CreateBlog")[0]);
    const text = blogInfo.description;
    formData.append("des", text);
    axios({
      method: "post",
      url: "http://localhost:3000/api/Create_click",
      data: formData,
      crossDomain: true,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }).then((response) => {
      if (response.data.status === "success") {
        alert("Blog Created Successfully");
        window.location.reload();
      } else {
        alert("Enter Valid Input");
      }
    });
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={5}
        p={2}
        mb={-7}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" m={3}>
          Create Blog
        </MDTypography>
      </MDBox>
      <MDBox
        variant="gradient"
        bgColor="muted"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={5}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDBox
          component="form"
          role="form"
          enctype="multipart/form-data"
          id="CreateBlog"
          onSubmit={submitClick}
        >
          <MDBox mb={2}>
            <MDInput type="text" label="Title" name="btitle" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="text" label="Short Description" name="shortdes" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              accept="image/*"
              type="file"
              id="select-image"
              name="inpFile"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            {imageUrl && selectedImage && (
              <MDBox mt={2} textAlign="center">
                <div>Image Preview:</div>
                <img src={imageUrl} alt={selectedImage.name} height="250px" />
              </MDBox>
            )}
          </MDBox>
          <MDBox mb={17} style={{ height: "100px" }}>
            <ReactQuill
              theme="snow"
              onChange={ondescription}
              placeholder="Blog Description"
              style={{ height: "170px" }}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="text" label="Meta Title" name="mtitle" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="text" label="Meta Keyword" name="mkeyword" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="text" label="Meta Description" name="mdescription" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="text" label="SEO url" name="seo_url" fullWidth />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton type="submit" variant="gradient" color="info">
              Create
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
