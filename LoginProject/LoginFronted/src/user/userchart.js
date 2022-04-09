import React, { useEffect, useState } from "react";
import UserNavbar from "../core/userNavbar";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Userchart = () => {
  const [label, setLabel] = useState();
  const [data, setData] = useState();

  const [graph, setGraph] = useState();
  console.log(graph);

  const pieData = {
    maintainAspectRatio: false,
    responsive: false,
    labels: label && label,
    datasets: [
      {
        data: data && data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      let userJwt = JSON.parse(localStorage.getItem("jwt"));
      let userId = userJwt.user._id;
      axios(`${process.env.REACT_APP_BACKEND}/getGraphData?userId=${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        let dataArr = [];
        let arr = [];
        response.data.graphData.growth.forEach((val) => {
          dataArr.push(val.number);
          arr.push(val.country);
        });
        setLabel(arr);
        setData(dataArr);
        console.log(arr);
      });
    }
  }, []);

  return (
    <div>
      <UserNavbar />
      <div style={{ width: "100%", display: "flex", marginTop:"100px" }}>
        <div style={{ maxHeight: "150px", width: "30%", marginLeft: "auto"}}>
          <Pie data={pieData} />
        </div>

        <div style={{ maxHeight: "500px", width: "60%", marginRight: "auto" }}>
          <Bar data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Userchart;
