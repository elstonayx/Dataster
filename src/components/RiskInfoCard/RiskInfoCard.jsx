import React from "react";
import { Card } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

export const RiskInfoCard = ({ data }) => {
  return (
    <Card>
      <div style={{ width: "300px", textAlign: "center" }}>
        <h3>Population Data</h3>
        <Pie
          data={{
            labels: data.label,
            datasets: [
              {
                data: data.values,
                backgroundColor: [
                  "#F7464A",
                  "#46BFBD",
                  "#FDB45C",
                  "#949FB1",
                  "#4D5360",
                  "#AC64AD"
                ],
                hoverBackgroundColor: [
                  "#FF5A5E",
                  "#5AD3D1",
                  "#FFC870",
                  "#A8B3C5",
                  "#616774",
                  "#DA92DB"
                ]
              }
            ]
          }}
        />
      </div>
    </Card>
  );
};

RiskInfoCard.defaultProps = {
  data: {
    label: ["Example 1", "Example 2"],
    values: [100, 100]
  }
};
