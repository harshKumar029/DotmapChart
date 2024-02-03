import DotMapchart from './DotMapchart';

const YourComponent = () => {
  const yourMapData = [
    {
      "id": 1,
      "region": "US",
      "data": 290
    },
    {
      "id": 2,
      "region": "US",
      "data": 490
    },
    // Add the rest of your map data here
  ];

  return <DotMapchart mapData={yourMapData} />;
};

export default YourComponent;
