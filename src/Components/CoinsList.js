import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ChartView from "./ChartView";
import { Link } from "react-router-dom";
const Coinslist = () => {
  const [Coin, setCoin] = useState([]);
  const [status, setstatus] = useState(false);
  const [searchValue, setsearchValue] = useState("");
  const [pageNo, setpageNo] = useState(5);
  const [oldpage, setoldpage] = useState(0);
  const [data, setdata] = useState([]);
  const [buttons, setbuttons] = useState([]);
  const [previouspage, setpreviouspage] = useState(0);
  const [Nextpage, setNextpage] = useState(5);
  useEffect(() => {
    axios.get(`https://api.coincap.io/v2/assets`).then((response) => {
      setCoin(response.data.data.splice(oldpage, pageNo));
      setdata(response.data.data);
      let array = [];
      for (let i = 1; i <= response.data.data.length / 5; i++) {
        array.push(i);
      }
      setbuttons(array);
    });
  }, [status]);

  useEffect(() => {
    setCoin(data.slice(previouspage, Nextpage));
  }, [previouspage, Nextpage]);
  const handleFilter = (Coin) => {
    if (status) {
      const arr = Coin.sort(function (a, b) {
        return a.rank - b.rank;
      });
      setCoin([...arr]);
      setstatus(!status);
    } else {
      const arr = Coin.sort(function (a, b) {
        return b.rank - a.rank;
      });
      setCoin([...arr]);
      setstatus(!status);
    }
  };

  const handlePagination = (e) => {
    if (e.target.value == 0) {
      setCoin(data.splice(oldpage, pageNo));
    } else {
      setCoin(data.slice(e.target.value * 5 - 5, e.target.value * 5));
    }
  };

  const handleNext = () => {
    console.log(previouspage, Nextpage);
    setpreviouspage(Nextpage);
    setNextpage(Nextpage + 5);
  };
  const handlePrevious = () => {
    if (Nextpage < data.length - 1 / 2 && Nextpage > 0) {
      setNextpage(previouspage);
      setpreviouspage(previouspage - 5);
    } else {
      setpreviouspage(0);
      setNextpage(5);
    }
  };

  return (
    <div className="mainContainer">
      <div className="card p-5 text-center">
        <input
          type="text"
          className="form-control form-control-sm m-3 w-25"
          placeholder="Search..."
          onChange={(e) => {
            setsearchValue(e.target.value);
          }}
        />

        <table className="">
          <thead className="position-sticky fixed-top">
            <tr>
              <th>
                Id
                <i
                  className={`fa fa-caret-${status ? "up" : "down"} p-2`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleFilter(Coin)}
                ></i>
              </th>
              <th>Name</th>
              <th>Rank</th>
              <th>Symbol</th>
              <th>Supply</th>
              <th>Max Supply</th>
              <th>
                Market Cap
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 25 25"
                >
                  <path
                    fill="#e9ecef"
                    d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c.564-1.789 1.632-3.932 1.821-4.474.273-.787-.211-1.136-1.74.209l-.34-.64c1.744-1.897 5.335-2.326 4.113.613-.763 1.835-1.309 3.074-1.621 4.03-.455 1.393.694.828 1.819-.211.153.25.203.331.356.619-2.498 2.378-5.271 2.588-4.408-.146zm4.742-8.169c-.532.453-1.32.443-1.761-.022-.441-.465-.367-1.208.164-1.661.532-.453 1.32-.442 1.761.022.439.466.367 1.209-.164 1.661z"
                  />
                </svg>
              </th>
              <th>
                Volume(24Hr)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 25 25"
                >
                  <path
                    fill="#e9ecef"
                    d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c.564-1.789 1.632-3.932 1.821-4.474.273-.787-.211-1.136-1.74.209l-.34-.64c1.744-1.897 5.335-2.326 4.113.613-.763 1.835-1.309 3.074-1.621 4.03-.455 1.393.694.828 1.819-.211.153.25.203.331.356.619-2.498 2.378-5.271 2.588-4.408-.146zm4.742-8.169c-.532.453-1.32.443-1.761-.022-.441-.465-.367-1.208.164-1.661.532-.453 1.32-.442 1.761.022.439.466.367 1.209-.164 1.661z"
                  />
                </svg>
              </th>
              <th>Price Usd</th>
              <th>Change Percent(24Hr)</th>
              <th>Last 7 Days</th>
              <th></th>
            </tr>
          </thead>
          {Coin.filter((val) => {
            return val.name.toLowerCase().includes(searchValue.toLowerCase());
          }).map?.((Coinval) => {
            return (
              <tbody>
                <tr key={Coinval.id}>
                  <td>{Coinval.id}</td>
                  <td>{Coinval.name}</td>
                  <td>{Coinval.rank}</td>
                  <td>{Coinval.symbol}</td>
                  <td>{parseInt(Coinval.supply).toFixed(0)}</td>
                  <td>{parseInt(Coinval.maxSupply).toFixed(0)}</td>
                  <td>{"$" + parseInt(Coinval.marketCapUsd).toFixed(0)}</td>
                  <td>
                    <p>{"$" + parseInt(Coinval.volumeUsd24Hr).toFixed(0)}</p>
                    <p>{parseInt(Coinval.vwap24Hr).toFixed(0)}</p>
                  </td>
                  <td>{"$" + parseInt(Coinval.priceUsd).toFixed(0)}</td>
                  <td>
                    <i
                      className={`fa fa-caret-${
                        Coinval.changePercent24Hr < 0 ? "down" : "up"
                      } `}
                      style={{
                        color: Coinval.changePercent24Hr < 0 ? "red" : "green",
                      }}
                    >
                      {parseInt(Coinval.changePercent24Hr).toFixed(3) + "%"}
                    </i>
                  </td>
                  <td>
                    <ChartView id={Coinval.id} />
                  </td>
                  <Link to={`/Currencydetailpage/${Coinval.id}`}>
                    <td style={{ cursor: "pointer" }}>
                      <i className="fa fa-ellipsis-v"></i>
                    </td>
                  </Link>
                </tr>
              </tbody>
            );
          })}
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end">
            <li class="page-item ">
              <button
                class="page-link"
                href="#"
                tabindex="-1"
                onClick={handlePrevious}
              >
                Previous
              </button>
            </li>
            {buttons.map((btn, i) => {
              return (
                <li class="page-item">
                  <button
                    class="page-link"
                    href="#"
                    value={i}
                    onClick={handlePagination}
                  >
                    {btn}
                  </button>
                </li>
              );
            })}

            <li class="page-item">
              <button
                class="page-link"
                href="#"
                tabindex="-1"
                onClick={handleNext}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Coinslist;
