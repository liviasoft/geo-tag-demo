<template>
  <div>
    <l-marker @click="dialog = !dialog" :lat-lng="[lat, lng]" :icon="dynamicIcon()" :opacity="totalExpRatio ? 1 : 0.5">
      <l-tooltip :options="{offset: [-13,-25], direction: 'left'}">{{traceName}} : {{totalExpRatio || 'No EMF Values'}}</l-tooltip>
    </l-marker>
  
    <v-dialog v-model="dialog" width="1300" style="overflow-x: hidden;">
      <v-card class="rounded-lg elevation-0">
        <v-card-title class="primary white--text pa-2">
          <div class="d-flex align-center" style="width: 100%">
            <p class="mb-0"><strong>{{traceName}}</strong> data</p>
            <v-spacer></v-spacer>
            <v-btn dark @click="() => dialog = false" icon><v-icon>mdi-close</v-icon></v-btn>
          </div>
        </v-card-title>
        <v-card-text class="pa-0 d-flex justify-center">
          <v-card class="elevation-0" width="1200">
            <v-container fluid class="pa-0">
    <div style="min-height: 400px" class="d-flex justify-center">

      <!-- <AreaChart :chartData="chartData" :aspectRatio="1" /> -->
      <AreaChart v-if="!loading" :chartData="{labels, datasets}" :chart-options="chartOptions" :aspectRatio="1 / 2"/>
    </div>
    <div>
      <v-row>
        <v-col cols="4">
          Id: <kbd>{{id}}</kbd>
          &nbsp; Name: <kbd>{{traceName}}</kbd>
          &nbsp; Data Points: <kbd>{{dataPoints}}</kbd>
        </v-col>
        <v-col cols="2">
          Lat: <kbd>{{lat}}</kbd>
        </v-col>
        <v-col cols="2">
          Lng: <kbd>{{lng}}</kbd>
        </v-col>
        <v-col cols="3">
          Total Exposure Ratio: <kbd>{{totalExpRatio}}</kbd>
        </v-col>
      </v-row>
    </div>
  </v-container>
            <v-overlay :value="loading" absolute :opacity='0.2'>
              <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            </v-overlay>
          </v-card>
        </v-card-text>
        <v-divider class="mt-2"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="() => dialog = false"><v-icon left>mdi-close</v-icon>Close</v-btn>
        </v-card-actions>
  
</v-card>
</v-dialog>
</div>
</template>
<script>
import API from '@/api'
import helpers from '@/utils/helpers'
import AreaChart from './LineChart.vue'
import L from 'leaflet';
export default {
  props: {
    lat: {
      type: Number,
      required: true,
      default: 9.065165061184406
    },
    lng: {
      type: Number,
      required: true,
      default: 7.49294400225149
    },
    totalExpRatio: {
      required: true,
      default: 0
    },
    id: {
      required: true,
      default: Math.random()
    },
    traceName: {
      type: String,
      required: true,
      default: 'Trace 2'
    }
  },
  components: {
    AreaChart
  },
  data: () => ({
    dialog: false,
    loading: false,
    dataPoints: 0,
    datasets: [],
    labels: [],
    chartOptions: {
      responsive: false,
      maintainAspectRatio: true
    }
  }),
  watch: {
    async dialog(value){
      if(value){
        await this.getTracePoints(this.id)
      } else {
        console.log('destroy chart');
        this.datasets= []
        this.labels= []
        this.chartOptions= {
          responsive: false,
          maintainAspectRatio: true
        }
      }
    }
  },
  methods: {
    // itemValue(e){
    //   console.log({e})
    //   return e.value
    // },
    async getTracePoints(){
      if(this.loading) return;
      this.loading = true;
      this.labels = []
      this.datasets = []

      try {
        const {data} = await API.Point.getAllPointsByTraceId(this.id)
        console.log({data: data.length, sample: data[0]});
        this.dataPoints = data.length
        const expRatioData = []
        const traceVMData = []
        const freqData = []
        const refLimitData = []
        data.forEach(p => {
          expRatioData.push({x: p.frequencyMHz, y: p.expRatio})
          traceVMData.push({x: p.frequencyMHz, y: p.traceVM})
          freqData.push(p.frequencyMHz)
          refLimitData.push({x: p.frequencyMHz, y: p.referenceLimit})
        });
        this.datasets.push({
          label: 'Exposure Ratio',
          backgroundColor: '#f87979',
          data: expRatioData,
          pointRadius: 1
        })
        this.datasets.push({
          label: 'Trace (V/M)',
          backgroundColor: '#007BFF',
          data: traceVMData,
          pointRadius: 1
        })
        this.datasets.push({
          label: 'Reference EMF Limit',
          backgroundColor: '#32cd32',
          data: refLimitData,
          pointRadius: 1
        })
        // for (let i = 700; i < 3001; i+=100) {
        //   this.labels.push(i)     
        // }
        this.chartOptions = {
          responsive: false,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                    // label: function(context) {
                    //     let label = context.dataset.label || '';

                    //     if (label) {
                    //         label += ': ';
                    //     }
                    //     if (context.parsed.y !== null) {
                    //         // label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                    //         label += " MHz";
                    //     }
                    //     return label;
                    // }
                    title: function(context){
                      let value = context[0].label
                      // console.log({context});
                      // let label = context.dataset.label || '';
                      // if(context.parsed.y !== null){
                      //   label += `${context.parsed.y} MHz`;
                      // }
                      return `${value} MHz`
                    }
                }
            },
            title: {
              display: true,
              text: `${this.traceName} Data - Logarithmic`
            }
          },
          scales: {
            x: {
              display: true,
              // type: 'time',
              title: {
                text: 'Frequency (in MHz)',
                display: true
              },
              suggestedMin: 700,
                suggestedMax: 3000,
              // min: 600,
              // max: 3000,
              ticks: {
                // forces step size to be 50 units
                stepSize: 50
              }
            },
            y: {
              display: true,
              type: 'logarithmic',
            }
          }
        }
      } catch (error) {
        console.log({error});
      } finally {
        this.loading = false;
      }
    },
    dynamicIcon(){
      let iconFile;
      let totalExpRatio = this.totalExpRatio
      const res = helpers.getSignalEMFColor(totalExpRatio)
      iconFile = res.iconFile;
      return L.icon({
        iconUrl: `/assets/images/${iconFile}.png`,
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [32, 32],
        iconAnchor: [16, 37],
        shadowAnchor: [13, 46]
      })
    }
  },
};
</script>
