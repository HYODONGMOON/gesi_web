import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StackedBarChartProps {
  title?: string;
  labels?: string[];
  simulation?: object;
  labelMap?: { [name: string]: string };
}

const backgroundColor: string[] = [
  '#ED6E85',
  '#F1A354',
  '#F7CE6B',
  '#6CBDBF',
  '#4598F8',
  '#7845F6',
  '#C9CBCF',
]

export const StackedBarChart: React.FC<StackedBarChartProps> = ({ 
  title, 
  labels,
  simulation,
  labelMap,
}) => {
  const [data, setData] = useState<ChartData<"bar", number[], unknown>>({
    labels: [''],
    datasets: [
      // {
      //   label: 'Dataset 1',
      //   data: [5],
      //   backgroundColor: '#ED6E85',
      //   barThickness: 50,
      // },
      // {
      //   label: 'Dataset 2',
      //   data: [3],
      //   backgroundColor: '#F1A354',
      //   barThickness: 50,
      // },
      // {
      //   label: 'Dataset 3',
      //   data: [10],
      //   backgroundColor: '#F7CE6B',
      //   barThickness: 50,
      // },
      // {
      //   label: 'Dataset 3',
      //   data: [10],
      //   backgroundColor: '#4598F8',
      //   barThickness: 50,
      // },
      // {
      //   label: 'Dataset 3',
      //   data: [10],
      //   backgroundColor: '#7845F6',
      //   barThickness: 50,
      // },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
          lineHeight: 2.0,
        }
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  if (simulation) {
    let newData: ChartData<"bar", number[], unknown> = JSON.parse(JSON.stringify(data));
    newData.datasets.length = 0;

    if (labels) {
      for (const [idx, label] of labels.entries()) {
        if (simulation.hasOwnProperty(label)) {
          type _keyType = keyof typeof simulation;
          const _key = label as _keyType;

          let newLabel = label;

          if (labelMap)
            newLabel = labelMap[label as string];

          newData.datasets.push({
            label: newLabel,
            data: [simulation[_key]],
            barThickness: 50,
            backgroundColor: backgroundColor[idx]
          });
        }
      }
    }

    if (JSON.stringify(newData.datasets) !== JSON.stringify(data.datasets)) {
      setData(newData);
    }
  }
  

  return (
    <div className="w-full">
      <Bar data={data} options={options} />
    </div>
  );
};
