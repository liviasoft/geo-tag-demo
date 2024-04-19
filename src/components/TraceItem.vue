<template>
  <div>
    <v-alert style="cursor: pointer" v-ripple class="text-left" dense :color="getColor(trace.totalExpRatio)" border="left" elevation="2" colored-border icon="mdi-chart-bell-curve-cumulative">
      <v-row align="center">
        <v-col @click="traceClicked" class="grow py-0">{{trace.name}}: Lat - <strong>{{trace.GPS.lat | toFixedDecimals(2)}}</strong>, Lng - <strong>{{trace.GPS.lng | toFixedDecimals(2)}}</strong></v-col>
        <v-col class="shrink py-0 d-flex">
          <DataTableDialog :traceId="trace.id" :traceName="trace.name" />
          <v-checkbox v-model="selected" @change="traceSelected" loading hide-details class="mt-0"></v-checkbox>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>
<script>
  import DataTableDialog from './DataTableDialog.vue'
  import helpers from '@/utils/helpers'
  export default {
    props: {
      trace: {
        required: true,
        default: () => ({
          name: "Trace name",
          GPS: {
            lat: 0,
            lng: 0
          },
          id: Math.random()
        })
      }
    },
    components: {
      DataTableDialog
    },
    data: () => {
      return {
        selected: false,
      }
    },

    methods: {
      traceSelected(e){
        this.$emit('traceSelected', {
          value: e,
          data: this.trace
        })
      },
      getColor(value){
        const res = helpers.getSignalEMFColor(value)
        return res.color
      },
      traceClicked(){
        if(!this.selected) {
          this.selected = true
        }
        this.traceSelected(this.selected)
      }
    }
  }
</script>