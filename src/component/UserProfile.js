import React, { useState, useEffect } from "react";
import "./UserProfile.css";

export default function App() {
  const [data, setData] = useState({
    loading: false,
    error: null,
    result: [],
  });

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectValue, setSelectValue] = useState("all");

  useEffect(() => {
    const handleLoadData = async () => {
      setData({
        ...data,
        error: null,
        result: [],
        loading: true,
      });
      setFilteredData([]);

      try {
        const request = await fetch(
          "https://api.enye.tech/v1/challenge/records"
        );
        const response = await request.json();
        setData({
          ...data,
          loading: false,
          result: response.records.profiles,
          error: null,
        });
        setFilteredData(response.records.profiles);
      } catch (error) {
        setData({
          ...data,
          loading: false,
          result: [],
          error: error.message,
        });
        setFilteredData([]);
      }
    };
    handleLoadData();
  }, []);

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
    let inputValue = e.target.value;
    let filteredInput =
      inputValue.length > 0 &&
      data.result.filter(
        (item) =>
          item.FirstName.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.LastName.toLowerCase().includes(inputValue.toLowerCase())
      );
    if (inputValue === "") {
      setFilteredData(data.result);
    } else {
      setFilteredData(filteredInput);
    }
  };

  const handleSelectValue = (e) => {
    setSelectValue(e.target.value);

    let selectedValue = e.target.value;
    let filteredInput =
      selectedValue.length > 0 &&
      data.result.filter(
        (item) =>
          item.Gender.toLowerCase() === selectedValue.toLowerCase() ||
          item.PaymentMethod.toLowerCase() === selectedValue.toLowerCase()
      );

    if (e.target.value === "all") {
      setFilteredData(data.result);
    } else {
      setFilteredData(filteredInput);
    }
  };

  const handleFilterTitle = (title) => {
    const filter = [];
    data.result.forEach((item) => filter.push(item[title]));
    return [...new Set([...filter])];
  };

  return (
    <div className="user-profile">
      {data.loading && (
        <div>
          <h3>Loading</h3>
        </div>
      )}
      {data.error && (
        <div>
          <h3>Error : {data.error}</h3>
        </div>
      )}
      {data.result && data.result.length > 0 && (

        <>
          <input
            type="text"
            placeholder="search"
            value={searchValue}
            onChange={handleSearchValue}
          />
          <button>Search</button>

          <div>
            Filter:{" "}
            <select value={selectValue} onChange={handleSelectValue}>
              <option value="all">All</option>
              <optgroup label="Gender">
                {handleFilterTitle("Gender").map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </optgroup>
              <optgroup label="Payment Method">
                {handleFilterTitle("PaymentMethod").map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </optgroup>
            </select>
          </div>

          <table className='table'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Payment Method</th>
                <th>Credit Card Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 &&
                filteredData.slice(0, 20).map((record) => {
                  const {
                    FirstName,
                    LastName,
                    Gender,
                    Email,
                    PhoneNumber,
                    PaymentMethod,
                    CreditCardType,
                  } = record;

                  return (
                    <tr>
                      <td>{FirstName}</td>
                      <td>{LastName}</td>
                      <td>{Gender}</td>
                      <td>{Email}</td>
                      <td>{PhoneNumber}</td>
                      <td>{PaymentMethod}</td>
                      <td>{CreditCardType}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
