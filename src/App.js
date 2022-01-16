import React, { useEffect, useState } from "react";
import axios from "axios";


import logo from './logo.svg';
import './App.css';

const baseURL = "https://groupe1501-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/0b9a01db-2d21-4480-a22c-2bf9bd1d856e/classify/iterations/Iteration1/url";
const baseURL2 = "http://500160eb-083d-4fed-bbd5-5c01d399388a.westeurope.azurecontainer.io/score";


function App() {
  const [input, setInput] = useState("https://media.istockphoto.com/photos/portrait-of-a-young-man-wearing-protective-face-mask-picture-id1272058180?b=1&k=20&m=1272058180&s=170667a&w=0&h=0VPkjXyMRFM7b2wCtPxdIQfI9oEZFDAR8Wh2SFoJUws=");
  const [inputString, setInputString] = useState("");
  const [inputJson, setInputJson] = useState(
    {

        "WebServiceInput0": [
          {
            "age": 19,
            "sex": "female",
            "bmi": 27.9,
            "children": 0,
            "smoker": "yes",
            "region": "southwest",
            "charges": 16884.924
          },
          {
            "age": 18,
            "sex": "male",
            "bmi": 33.77,
            "children": 1,
            "smoker": "no",
            "region": "southeast",
            "charges": 1725.5523
          },
          {
            "age": 28,
            "sex": "male",
            "bmi": 33,
            "children": 3,
            "smoker": "no",
            "region": "southeast",
            "charges": 4449.462
          },
          {
            "age": 33,
            "sex": "male",
            "bmi": 22.705,
            "children": 0,
            "smoker": "no",
            "region": "northwest",
            "charges": 21984.47061
          },
          {
            "age": 32,
            "sex": "male",
            "bmi": 28.88,
            "children": 0,
            "smoker": "no",
            "region": "northwest",
            "charges": 3866.8552
          }
        ]
  
        
      }
  );
  const [post, setPost] = useState(null);
  const [post2, setPost2] = useState(null);

  function handleClick(e) {
    e.preventDefault();
    axios.post(
      baseURL, 
      {
        Url: input
      },
      {
        headers: {
          "Prediction-Key": "8e28f0b9fc0f43e7b5c3d39e4761dd2b",
          "Content-Type": "application/json"
        }
      }).then((response) => {
      setPost(response.data);
    })
  }

  function handleClick3(e) {
    e.preventDefault();
    setInputJson(JSON.parse(inputString));
  }

  function handleClick2(e) {
    e.preventDefault();
    axios.post(
      baseURL2, 
      {
          Inputs: inputJson
      },
      {
        headers: {
          "Authorization": "Bearer zGnvzNznhsxfzFGGoF86TxfuOx0Uctum",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }).then((response) => {
        setPost2(response.data);
    })
  }

  useEffect(()=> {
    if (post != null)
      console.log(post["predictions"]);
  }, [post])

  useEffect(()=> {
    if (post2 != null)
      console.log(post2.Results.WebServiceOutput0[0]);
  }, [post2])

  useEffect(()=> {
    if (inputString != "")
      console.log(inputString);
  }, [inputString])

  return (
    <div className="App">
      <form>
        <input
            type="text"
            value={input}
            onInput={e => setInput(e.target.value)}
          />

      </form>
      <button onClick={handleClick}>
        RUN
      </button>

      <div>
        <img src={input}></img>
        {post ?
          <p>
            Result : {post.predictions[0].tagName} with probability : {post.predictions[0].probability * 100} %
          </p>
          : <p>
            Result : 
          </p>
        }
        
      </div>
        <form>
          <input
              type="text"
              value={inputString}
              onInput={e => 
                {
                  setInputString(e.target.value.replace(/ /g,''));
                }
                
              }
            />

        </form>
        <button onClick={handleClick3}>
          Validate
        </button>
        <button onClick={handleClick2}>
          RUN
        </button>
        {post2 ?
          <p>
            {post2.Results.WebServiceOutput0.map(item => {
              return <li>ScoredLabels: {item["Scored Labels"]}, Age: {item.age}, Sex: {item.sex}, Bmi: {item.bmi}, Charges: {item.charges}, Children: {item.children}, Smoker: {item.smoker}</li>
            })}
          </p>
          : <p>
            Result : 
          </p>
        }
      <div>

      </div>
    </div>
  );
}

export default App;
