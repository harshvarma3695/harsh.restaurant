import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "./food.css";
const Food = () => {
  const [area, setArea] = useState("Canadian");
  const [meal, setMeal] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const foodApi = async () => {
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`,
      );
      let data = await response.json();

      setMeal(data.meals);
    };

    foodApi();
  }, [area]);

  const searchApi = async (e) => {
     e.preventDefault();
     if(!search) return;
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`,
      );
      let data = await response.json();

      setMeal(data.meals);
      setSearch(" ");
    };


  return (
    <>
      <div
        style={{
          maxWidth: "100%",
          background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 40px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <img src={logo} alt="Harsh Restaurant Logo" width="150px" />
        </div>
        <h1
          style={{
            color: "#fff",
            fontSize: "32px",
            textAlign: "center",
            flex: "1",
          }}
        >
          Welcome to Harsh Restaurant
        </h1>
        <form onSubmit={searchApi}>
          <input 
            type="text"
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
            placeholder="Search Meal"
            style={{ marginRight: "20px" }}
          />
        </form>
        <div
          className="nav-button"
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          <button onClick={()=>setArea("Russian")}>Russian</button>
          <button onClick={()=>setArea("Indian")}>Indian</button>
          <button onClick={()=>setArea("American")}>American</button>
          <button onClick={()=>setArea("Thai")}>Thai</button>
          <button onClick={()=>setArea("Canadian")}>Canadian</button>
          <button onClick={()=>setArea("British")}>British</button>
        </div>
      </div>
      <div style={{ backgroundColor: "yellowgreen" }}>
        <div
          style={{
            backgroundColor: "black",
            maxWidth: "1180px",
            display: "flex",
            flexWrap: "wrap",
            margin: "auto",
          }}
        >
          {meal.map((data) => {
            return (
              <div key={data.idMeal}>
                <div>
                  <img
                    src={data.strMealThumb}
                    alt=""
                    style={{
                      width: "250px",
                      height: "280px",
                      margin: "20px",
                      alignContent: "center",
                    }}
                  />
                </div>
                <h3
                  style={{
                    display: "flex",
                    color: "yellow ",
                    justifyContent: "center",
                    textAlign: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {data.strMeal}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Food;
