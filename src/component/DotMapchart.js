import React from 'react';
import DottedMap from "dotted-map";
import './d.css'

const Dotmapchart = () => {
  const map = new DottedMap({ height: 120, grid: "vertical" });

  const points = [
    {
      lat: 43.0,
      lng: -75.0,
      data: 590
    },
    {
      lat: -22.906847,
      lng: -43.172897,
      data: 790
    },
    {
      lat: 52.370216,
      lng: 4.895168,
      data: 490
    },
    {
      lat: 35.365989221172114,
      lng: 139.47640980149473,
      data: 290,
    },
    {
      lat: 20.365989221172114,
      lng: 69.47640980149473,
      data: 290,
    },
    {
      lat: 30.365989221172114,
      lng: 159.47640980149473,
      data: 390,
    }
  ];

  const getColorAndRadius = (data) => {
    if (data > 600) return { color: "#0449B2", radius: 3.6 };
    else if (data > 400) return { color: "#2C80FF", radius: 2.9 };
    else if (data > 300) return { color: "#72AAFF", radius: 2.6 };
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
      if (data > 600) counts[0] += data;
      else if (data > 400) counts[1] += data;
      else if (data > 300) counts[2] += data;
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
              <p> &gt; $5k {percentages[0]}%</p>
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
              <p>$1-$5k  {percentages[1]}%</p>
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
              <p>$500-$1k  $600 {percentages[2]}%</p>
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
              <p> &lt;$500  $600 {percentages[3]}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dotmapchart;
