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

function Edit() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [mounted, setMounted] = useState(false);

  let [quillvalue] = useState(0);
  const id = new URLSearchParams(window.location.search).get("id");

  if (id) {
    if (!mounted) {
      axios({
        method: "post",
        url: "http://localhost:3000/api/getdata_click",
        data: { id: id },
      }).then((response) => {
        document.getElementById("bid").value = id;
        document.getElementById("btitle").value = response.data.data.title;
        document.getElementById("shortdes").value = response.data.data.short_des;
        document.getElementById("blah").src = "http://localhost:3000" + response.data.data.image;
        document.getElementById("imgpath").value =
          "http://localhost:3000" + response.data.data.image;
        window.quillvalue = response.data.data.des;
        document.getElementById("des").defaultValue = response.data.data.des;
        document.getElementById("mtitle").value = response.data.data.meta_title;
        document.getElementById("mkeyword").value = response.data.data.meta_keyword;
        document.getElementById("mdescription").value = response.data.data.meta_desc;
        document.getElementById("seo_url").value = response.data.data.seo_url;
      });
    }
  }

  quillvalue = window.quillvalue;

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
      document.getElementById("hide").style.display = "none";
    }
    setMounted(true);
  }, [selectedImage]);

  const ondescription = (content, delta, source, editor) => {
    const text = editor.getText(content);
    window.des = text;
  };
  function submitClick() {
    const formData = new FormData($("#CreateBlog")[0]);
    const text = window.des;
    formData.append("des", text);
    axios({
      method: "post",
      url: "http://localhost:3000/api/Bloged_click",
      data: formData,
      crossDomain: true,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }).then((response) => {
      if (response.data.status === "success") {
        alert("Blog Edited Successfully");
        window.location.href = "/posts";
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
          Edit Blog
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
          <MDInput
            type="text"
            label="Title"
            name="bid"
            id="bid"
            fullWidth
            style={{ display: "none" }}
          />
          <MDInput
            type="text"
            label="Title"
            name="imgpath"
            id="imgpath"
            fullWidth
            style={{ display: "none" }}
          />
          <MDBox mb={2}>
            <MDInput type="text" label="Title" name="btitle" id="btitle" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Short Description"
              id="shortdes"
              name="shortdes"
              fullWidth
            />
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
            <MDBox mt={2} textAlign="center" id="hide">
              <div>Image Preview:</div>
              <img id="blah" alt="hello" height="250px" />
            </MDBox>
          </MDBox>
          <MDBox mb={17} style={{ height: "100px" }}>
            <ReactQuill
              id="des"
              theme="snow"
              onChange={ondescription}
              value={quillvalue}
              style={{ height: "170px" }}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="text" id="mtitle" label="Meta Title" name="mtitle" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="text" id="mkeyword" label="Meta Keyword" name="mkeyword" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              id="mdescription"
              label="Meta Description"
              name="mdescription"
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="text" id="seo_url" label="SEO url" name="seo_url" fullWidth />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton type="submit" variant="gradient" color="info">
              Edit
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Edit;
