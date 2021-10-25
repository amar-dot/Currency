import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import axios from "axios";
import { useParams } from "react-router-dom";
const Currencydetailpage = () => {
  const [historydata, sethistorydata] = useState([]);
  const [showGraph, setshowGraph] = useState(false);
  const [Interval, setInterval] = useState("");
  const { id } = useParams();
  const [DisplayData, setDisplayData] = useState({});
  useEffect(() => {
    fetchdata();
  }, [Interval]);
  const fetchdata = async () => {
    let rowdata = [];
    axios
      .get(`https://api.coincap.io/v2/assets/${id}/history`, {
        params: {
          interval: Interval,
          limit: 7,
        },
      })
      .then((response) => {
        response.data.data.map((val) => {
          rowdata.push([new Date(val.time), parseInt(val.priceUsd)]);
          sethistorydata([...rowdata]);
        });
      });

    axios.get(`https://api.coincap.io/v2/assets/${id}`).then((response) => {
      setDisplayData(response.data.data);
    });
  };

  const handleDiffrentData = (e) => {
    setInterval(e.target.id);
  };

  return (
    <div>
      <div className="container p-5 ">
        <div className="card " style={{ backgroundColor: "#f9fbfd" }}>
          <p style={{ fontSize: "28px", fontWeight: "bolder", padding: "5px" }}>
            BitCoin
            <span className="text-secondary p-2">{DisplayData.symbol}</span>
          </p>
          <div className="card-head p-3">
            <div className="card box" id="topbox">
              <ul>
                <li>
                  Price
                  <p>{"$" + parseInt(DisplayData.priceUsd).toFixed(0)}</p>
                </li>
                <li>
                  24hr% change{" "}
                  <p>
                    <i
                      className={`fa fa-caret-${
                        DisplayData.changePercent24Hr < 0
                          ? "down text-danger"
                          : "up text-success"
                      } `}
                    >
                      {parseInt(DisplayData.changePercent24Hr).toFixed(2) + "%"}
                    </i>
                  </p>
                </li>

                <li>
                  Market Cap
                  <p>{"$" + parseInt(DisplayData.marketCapUsd).toFixed()}</p>
                </li>
                <li>
                  volume(24H)
                  <p>{"$" + parseInt(DisplayData.volumeUsd24Hr).toFixed()}</p>
                </li>
                <li>
                  <p>
                    {" "}
                    USD<i className="fa fa-caret-down p-2"></i>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="card-body">
            <div className="HourBOX">
              <ul>
                <li id="h1" onClick={handleDiffrentData}>
                  1hr
                </li>
                <li id="h12" onClick={handleDiffrentData}>
                  12hr
                </li>
                <li id="d1" onClick={handleDiffrentData}>
                  1day
                </li>
              </ul>
            </div>
            <Chart
              width={"auto"}
              height={"auto"}
              color={"red"}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[["day", "price"], ...historydata]}
            />
          </div>
          <div className="card">
            <div className="card-body" id="footer">
              <div className="p-2" style={{ fontWeight: "bolder" }}>
                Key metrices
              </div>
              <div className="p-1">
                <i className="fa fa-twitter"></i>
                <i className="fa fa-facebook"></i>
                <i className="fa fa-linkedin"></i>
              </div>
            </div>
            <div className="card-footer">
              <ul>
                <li>
                  <p>24Hour Low</p>
                  <p>{"$" + parseInt(DisplayData.priceUsd).toFixed(0)}</p>
                </li>
                <li>
                  <p>24Hour High</p>
                  <p>{"$" + parseInt(DisplayData.volumeUsd24Hr).toFixed()}</p>
                </li>
                <li>
                  <p>Net Change</p>
                  <p>{"$" + parseInt(DisplayData.marketCapUsd).toFixed()}</p>
                </li>
                <li>
                  <p>24Hour Open</p>
                  <p>{"$" + parseInt(DisplayData.volumeUsd24Hr).toFixed()}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Currencydetailpage;
