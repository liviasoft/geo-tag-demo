<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    />
    <!-- :plugins="plugins" -->
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  // LinearScale,
  CategoryScale,
  PointElement,
  LogarithmicScale,
  // TimeScale,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  // LinearScale,
  LogarithmicScale,
  CategoryScale,
  PointElement,
  // TimeScale
)

export default {
  name: 'LineChart',
  components: {
    LineChartGenerator
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 1150
    },
    height: {
      type: Number,
      default: 500
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    chartData: {
        type: Object,
        required: false,
        default: () => ({
          labels: [],
          datasets: []
        })
      },
    chartOptions: {
      type: Object,
      default: () => {
        return {
          responsive: false,
          maintainAspectRatio: true
        }
      }
    }
    // plugins: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data() {
    return {
      // chartData: {
      //   labels: [
      //     'January',
      //     'February',
      //     'March',
      //     'April',
      //     'May',
      //     'June',
      //     'July'
      //   ],
      //   datasets: [
      //     {
      //       label: 'Data One',
      //       backgroundColor: '#f87979',
      //       data: [40, 39, 10, 40, 39, 80, 40]
      //     },
      //     {
      //       label: 'Data Two',
      //       backgroundColor: '#007BFF',
      //       data: [50, 30, 20, 90, 16, 10, 70]
      //     }
      //   ]
      // },
      // chartOptions: {
      //   responsive: true,
      //   maintainAspectRatio: false,

      // }
    }
  }
}
</script>
