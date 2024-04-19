<script>
import { Line, mixins } from "vue-chartjs";

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Function,
    },
    height: {
      type: [String, Number],
    },
    aspectRatio: {
      type: Number,
      default: 2.2,
    },
  },
  data() {
    return {
      gradient: null,
      gradient2: null,
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
    const generatedChartData = this.chartData(
      this.gradient,
      this.gradient2,
      this.aspectRatio
    );
    console.log({ chartData: this.chartData });
    console.log({ generatedChartData });
    this.renderChart(
      generatedChartData.chartData,
      generatedChartData.chartOptions
    );
    // this.height ? (this.$refs.canvas.height = this.height) : "";
    // this.renderChart(
    //   {
    //     labels: [
    //       "January",
    //       "February",
    //       "March",
    //       "April",
    //       "May",
    //       "June",
    //       "July",
    //     ],
    //     datasets: [
    //       {
    //         label: "Data One",
    //         borderColor: "#FC2525",
    //         pointBackgroundColor: "white",
    //         borderWidth: 1,
    //         pointBorderColor: "white",
    //         backgroundColor: this.gradient,
    //         data: [40, 39, 10, 40, 39, 60, 40],
    //       },
    //       {
    //         label: "Data Two",
    //         borderColor: "#05CBE1",
    //         pointBackgroundColor: "white",
    //         pointBorderColor: "white",
    //         borderWidth: 1,
    //         backgroundColor: this.gradient2,
    //         data: [50, 55, 32, 10, 2, 12, 53],
    //       },
    //     ],
    //   },
    //   {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     // apsectRatio: this.aspectRatio,
    //     aspectRatio: 2,
    //   }
    // );

    console.log(this.$refs.canvas);
  },
};
</script>
