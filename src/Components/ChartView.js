import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import axios from "axios";
const ChartView = (props) => {
  const [historydata, sethistorydata] = useState([]);
  const [showGraph, setshowGraph] = useState(false);
  const fetchdata = async () => {
    let rowdata = [];
    axios
      .get(`https://api.coincap.io/v2/assets/${props.id}/history`, {
        params: {
          interval: "d1",
          limit: 7,
        },
      })
      .then((response) => {
        response.data.data.map((val) => {
          rowdata.push([new Date(val.time), parseInt(val.priceUsd)]);
          sethistorydata([...rowdata]);
        });
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);
  useEffect(() => {
    setshowGraph(true);
  }, [historydata]);

  return (
    <>
      {showGraph ? (
        <Chart
          width={200}
          height={100}
          color={"red"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[["day", "price"], ...historydata]}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ChartView;
