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

import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive";
import "datatables.net-scroller";

function Tables() {
  const myData = {};
  let id = {};

  $(document).ready(function () {
    $("#data_post").DataTable({
      responsive: true,
      searchDelay: 500,
      processing: true,
      serverSide: true,
      destroy: true,
      dom:
        "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
      ajax: {
        url: "http://localhost:3000/api/postd_click",
        type: "POST",
        data: function (d) {
          return $.extend(d, myData);
        },
      },
      order: [[0, "desc"]],
      columns: [
        { data: "_id" },
        { data: "title" },
        { data: "image" },
        { data: "created_date" },
        { data: "status" },
        { data: "_id" },
      ],
      columnDefs: [
        {
          targets: 0,
          className: "text-center",
          orderable: true,
          render: function (data) {
            id = data;
            return data;
          },
        },
        {
          targets: 1,
          className: "text-left",
          orderable: true,
          render: function (data) {
            return data;
          },
        },
        {
          targets: 2,
          className: "text-left",
          orderable: false,
          render: function (data) {
            const img =
              ' <img style="background:grey;height: 130px;width: 130px;border: 2px solid black;border-radius: 25px;" id="blah" src="http://localhost:3000/' +
              data +
              '">';
            return img;
          },
        },
        {
          targets: 3,
          className: "text-left",
          orderable: false,
          render: function (data) {
            return data.toLocaleString();
          },
        },
        {
          targets: 4,
          className: "text-left",
          orderable: false,
          render: function (data) {
            let status;
            if (data === 1) {
              status =
                '<input data-toggle="toggle" type="checkbox" role="switch" data-name="' +
                id +
                '" checked="true" onchange="updateStatus(this)"/></div>';
            } else {
              status =
                '<input data-switch="true" data-name="' +
                id +
                '" type="checkbox" onchange="updateStatus(this)"/></a>';
            }
            return status;
          },
        },
        {
          targets: 5,
          className: "text-left",
          orderable: false,
          render: function (data) {
            const action =
              '<center><div class="row" p={2} ><a href="/edit/?id=' +
              data +
              '" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3 text-center">' +
              '<span class="svg-icon svg-icon-md svg-icon-primary">' +
              '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
              '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
              '<rect x="0" y="0" width="24" height="24"></rect>' +
              '<path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path>' +
              '<path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>' +
              "</g>" +
              "</svg>" +
              "</span>" +
              "</a>" +
              '<a onclick="deleteBlog(this)" data-name="' +
              data +
              '" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3 text-center">' +
              '<span class="svg-icon svg-icon-md svg-icon-primary">' +
              '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">' +
              '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
              '<rect x="0" y="0" width="24" height="24"></rect>' +
              '<path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>' +
              '<path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>' +
              "</g>" +
              "</svg>" +
              "</span>" +
              "</a></div></center>";
            return action;
          },
        },
      ],
    });
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Blog Posts
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Table className="table table-light mt-10" id="data_post">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody />
                </Table>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
