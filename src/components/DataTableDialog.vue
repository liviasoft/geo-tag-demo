<template>
  <div>
    <v-dialog scrollable v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on" class="mx-1" icon><v-icon>mdi-information-outline</v-icon></v-btn>
      </template>
      <v-card rounded-xl>
        <v-card-title class="primary white--text py-2">
          <div class="d-flex align-center" style="width: 100%">
            <p class="mb-0"><strong>{{traceName}}</strong> - Trace Data</p>
            <v-spacer></v-spacer>
            <v-btn dark icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
          </div>
        </v-card-title>

        <v-card-text class="pa-2 pb-0">
          <v-data-table
          :page.sync="page"
          :items="data"
          :options.sync="options"
          multi-sort
          :server-items-length="total"
            :headers="headers"
            item-key="name"
            class="elevation-0"
            :loading="loading"
            loading-text="Loading... Please wait"
          ></v-data-table>
        </v-card-text>

        <v-divider></v-divider>

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
  export default {
    props: {
      traceId: {
        required: true,
        default: 2
      },
      traceName: {
        required: true,
        default: 'Trace 2'
      }
    },
    data() {
      return {
        dialog: false,
        data: [],
        total: 0,
        options: {},
        loading: false,
        page: 1,
        limit: 10,
        prev: null,
        next: null,
        headers: [
          {
            text: "Frequency (in MHz)",
            align: "start",
            sortable: true,
            value: "frequencyMHz"
          },
          {
            text: "Index",
            value: "id"
          },
          {
            text: "Trace(V/M)",
            value: "traceVM"
          },
          {
            text: "Reference EMF Limits",
            value: "referenceLimit"
          },
          {
            text: "Exposure Ratio",
            value: "expRatio"
          },
          {
            text: "Trace ID",
            value: "traceId"
          }
        ]
      };
    },
    watch: {
    options: {
      async handler() {
        await this.getPoints()
      },
      deep: true
    },
    async dialog(value){
      if(value){
        await this.getPoints()
      }
    }
  },
    methods: {
      async getPoints(){
        if(this.loading) return;
        this.loading = true;
        try {
          const { sortBy, sortDesc, page, itemsPerPage } = this.options;
          let sorting = ''
          if(sortBy.length){
            sortBy.forEach((el, i) => {
              sorting += `${sortDesc[i]? '-':''}${el}${i > 0 && i < sortBy.length ? ',':''}`
            });
          }
          // console.log({sortBy, sortDesc, page, itemsPerPage, sorting})
          const {data, headers} = await API.Point.getPointsByTraceId(this.traceId, page, itemsPerPage, sorting ? {_sort: sorting} : {})
          // console.log({data, total: headers["x-total-count"]})
          this.data = data;
          this.total = Number(headers["x-total-count"])
        } catch (error) {
          console.log({error})
        } finally {
          this.loading = false;
        }
      }
    },
    // async mounted(){
    //   await this.getPoints()
    // }
  }
</script>