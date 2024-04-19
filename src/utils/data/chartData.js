

const chartData = (gradient, gradient2, aspectRatio = 2.2) => ({
  chartData: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ],
    datasets: [
      {
        label: "Data One",
        borderColor: "#FC2525",
        pointBackgroundColor: "white",
        borderWidth: 1,
        pointBorderColor: "white",
        backgroundColor: gradient,
        data: [40, 39, 10, 40, 39, 60, 40],
      },
      {
        label: "Data Two",
        borderColor: "#05CBE1",
        pointBackgroundColor: "white",
        pointBorderColor: "white",
        borderWidth: 1,
        backgroundColor: gradient2,
        data: [50, 55, 32, 10, 2, 12, 53],
      },
    ],
  },
  chartOptions: {
    responsive: true,
    maintainAspectRatio: false,
    // apsectRatio: this.aspectRatio,
    aspectRatio: aspectRatio,
  },
})

export default chartData