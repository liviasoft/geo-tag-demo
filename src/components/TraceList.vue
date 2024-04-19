<template>
  <div>
    <v-card elevation="0" class="pa-4 pb-1">
    <v-alert dense v-if="!loading && error" outlined class="text-left" type="error"><strong>Error:</strong> Error fetching Measurements</v-alert>
    <v-alert dense v-else-if="!loading && !traces.length" text class="text-left" type="info"><strong>Info:</strong> No Measurements found</v-alert>
    <v-alert dense v-else-if="loading && !traces.length" text class="text-left" type="info"><strong>Info:</strong> Loading Measurements</v-alert>
    <TraceItem v-for="trace in traces" :trace="trace" :key="trace.id" @traceSelected="traceSelected" />
    <v-overlay :value="loading" :opacity='0.2' absolute>
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
  </div>
</template>
<script>
import API from '@/api';
import TraceItem from './TraceItem';
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  components: {
    TraceItem,
  },
  watch: {
    async open(value){
      if(value){
        await this.getTraces()
      }
    }
  },
  data: () => ({
    loading: false,
    traces: [],
    page: 1,
    limit: 5,
    error: null,
  }),
  methods: {
    async getTraces(){
      if(this.loading){
        return;
      }
      this.loading = true;
      try {
        const {data} = await API.Trace.getTraces(this.page, this.limit)
        this.traces = data;
      } catch (error) {
        console.log({error})
      } finally {
        this.loading = false
      }
    },
    traceSelected(e){
      this.$emit('traceSelected', e)
    }
  },
}

</script>