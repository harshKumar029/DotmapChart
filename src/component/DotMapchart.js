import React from 'react';
import DottedMap from "dotted-map";
import './d.css'

const Dotmapchart = () => {
  const map = new DottedMap({ height: 120, grid: "vertical" });

  const points = [
    {
      lat: 43.0,
      lng: -75.0,
      region: "SE",
      data: 590
    },
    {
      lat: 43.0,
      lng: -75.0,
      region: "SE",
      data: 3051
    },
    {
      lat: 12.25,
      lng: -68.75,
      region: "AN",
      data: 2000
    },
    {

      lat: -21.5,
      lng: 165.5,
      region: "NC",
      data: 880
    },
    {

      lat: -41,
      lng: 174,
      region: "NZ",
      data: 2160
    },
    {

      lat: 13,
      lng: -85,
      region: "NI",
      data: 800
    },
    {
      lat: 16,
      lng: 8,
      region: "NE",
      data: 1600
    },
    {
      lat: 10,
      lng: 8,
      region: "NG",
      data: 1200
    },
    {
      lat: 15.2,
      lng: 145.75,
      region: "MP",
      data: 1000
    },
    {
      lat: 62,
      lng: 10,
      region: "NO",
      data: 860
    },
    {
      lat: 21,
      lng: 57,
      region: "OM",
      data: 490
    },
    {
      lat: -22.906847,
      lng: -43.172897,
      region: "AT",
      data: 390
    },
    {
      lat: 52.370216,
      lng: 4.895168,
      region: "US",
      data: 490
    },
    {
      lat: 35.365989221172114,
      lng: 139.47640980149473,
      region: "AT",
      data: 290,
    },
    {
      lat: 20.365989221172114,
      lng: 69.47640980149473,
      region: "US",
      data: 290,
    },
  ];

  const getColorAndRadius = (data) => {
    if (data > 2000) return { color: "#044ab2e3", radius: 3.6 };
    else if (data > 1000) return { color: "#2C80FF", radius: 2.9 };
    else if (data > 500) return { color: "#72AAFF", radius: 2.6 };
    else return { color: "#C1D9FF", radius: 2 };
  };

  points.map(point => {
    const { color, radius } = getColorAndRadius(point.data);
    map.addPin({ ...point, svgOptions: { color, radius } });
  });

  const calculatePercentage = (points) => {
    const counts = [0, 0, 0, 0];

    points.forEach((point) => {
      const data = point.data;
      if (data > 2000) counts[0] += data;
      else if (data > 1000) counts[1] += data;
      else if (data > 500) counts[2] += data;
      else if (data > 200) counts[3] += data;
    });

    let total = 0;
    points.map((i) => total += i.data)
    console.log("sacstot", total);

    return counts.map(count => ((count / total) * 100).toFixed(1));
  };

  const percentages = calculatePercentage(points);
  console.log(percentages);

  const svgMap = map.getSVG({
    radius: 0.35,
    color: "#34343435",
    shape: "circle",
    backgroundColor: "#fff"
  });

  return (
    <div className='dotmapcontainer'>
      <div style={{ position: "relative" }}>
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          alt="dotted-img"
        />
      </div>
      <div className='bar'>
        <div className="progress rounded-0  ">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percentages[0]}%`, backgroundColor: "#0449B2" }}
            aria-valuenow={percentages[0]}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className='wrapper'>
              <div class="square "></div>
              <p> <span>&gt; $5k</span> {percentages[0]}%</p>
            </div>
          </div>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percentages[1]}%`, backgroundColor: "#2C80FF" }}
            aria-valuenow={percentages[1]}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className='wrapper'>
              <div class="square"></div>
              <p><span>$1-$5k</span>  {percentages[1]}%</p>
            </div>
          </div>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percentages[2]}%`, backgroundColor: "#72AAFF" }}
            aria-valuenow={percentages[2]}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className='wrapper'>
              <div class="square"></div>
              <p><span>$500-$1k  $600</span> {percentages[2]}%</p>
            </div>
          </div>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percentages[3]}%`, backgroundColor: "#C1D9FF" }}
            aria-valuenow={percentages[3]}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className='wrapper'>
              <div class="square"></div>
              <p> <span>&lt;$500  $600</span> {percentages[3]}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dotmapchart;
