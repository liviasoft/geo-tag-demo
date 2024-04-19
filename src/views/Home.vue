<template>
  <div class="home">
    <!-- @click="moveMarker" -->
    <div class="map" style="height: calc(100vh - 0px); position: relative">   
        <v-card
          class="pa-0"
          :width="$vuetify.breakpoint.mdAndUp ? '500px' : '90vw'"
          style="z-index: 4; position: absolute; top: 20px; right: 20px"
          floating
        >
        <v-card-title class="py-2 primary white--text">
          <div class="d-flex align-center" style="width: 100%">
            <p class="mb-0">EMF Measurements</p>
            <v-spacer></v-spacer>
            <v-btn dark @click="viewMeasurements = !viewMeasurements" icon><v-icon>mdi-chevron-double-{{viewMeasurements ? 'down':'up'}}</v-icon></v-btn>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-expand-transition>
          <div v-show="viewMeasurements">
        <v-card-text class="pa-0">
          <TraceList :open="viewMeasurements" @traceSelected="traceSelected" />
        </v-card-text>
        <v-card-actions>
          <UploadModal />
        </v-card-actions>
      </div>
        </v-expand-transition>
      </v-card>
      <l-map
          :zoom="zoom"
          :zoomAnimation="true"
          :markerZoomAnimation="true"
          @click="mapClick"
          style="z-index: 1"
          :center="[latitude, longitude]"
        >
        <l-tile-layer
            :url="
              !$vuetify.theme.dark
                ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            "
          ></l-tile-layer>
          <!-- :opacity="0.5" -->
          <!-- <l-marker v-for="i of 10" :icon="dynamicIcon(i)" @click="mapClick" :lat-lng="[latitude + (i/ 5000), longitude - (i/ 8000)]" :key="i">
            <l-tooltip :options="{offset: [-13,-25], direction: 'left'}">{{i}}</l-tooltip>
          </l-marker> -->
          <!-- <l-marker v-for="{GPS, name, id, totalExpRatio} of traces" :key="id" :lat-lng="[GPS.lat, GPS.lng]">
            <l-tooltip>{{name}} : {{totalExpRatio}}</l-tooltip>
          </l-marker> -->
          <ChartDialog v-for="{GPS, name, id, totalExpRatio} of traces" :key="id" :lat="GPS.lat" :lng="GPS.lng" :traceName="name" :totalExpRatio="totalExpRatio" :id="id"/>
          <!-- <l-marker draggable :icon="icon" @click="mapClick" :lat-lng="[latitude, longitude]">
            <l-tooltip @click="mapClick">My City is here!</l-tooltip>
          </l-marker>
          <l-marker draggable  @click="mapClick" :lat-lng="[latitude, longitude]">
            <l-icon :icon-size="dynamicSize"
            :icon-anchor="dynamicIconAnchor"
            :shadowAnchor="dynamicShadowAnchor"
            :shadow-url="require('leaflet/dist/images/marker-shadow.png')"
            icon-url="/assets/images/9.png"></l-icon>
            <l-tooltip @click="mapClick">My City is here!</l-tooltip>
          </l-marker>
          <l-marker  @click="mapClick" :lat-lng="[latitude - 1, longitude - 1]">
            <l-tooltip @click="mapClick">My City is here!</l-tooltip>
          </l-marker>
          <l-marker  @click="mapClick" :lat-lng="[latitude + 1, longitude + 1]"></l-marker> -->
      </l-map>
   
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import L from 'leaflet';
// import HelloWorld from '@/components/HelloWorld.vue'
import ChartDialog from '@/components/ChartDialog.vue'
import TraceList from '@/components/TraceList.vue'
import UploadModal from '@/components/UploadModal.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
    ChartDialog,
    TraceList,
    UploadModal
  },
  data(){
    return {
      latitude: 9.058363115554894,
      longitude: 7.49069416257465,
      zoom: 14,
      defaults: {
        lat: 9.058363115554894,
        lng: 7.49069416257465,
        zoom: 14
      },
      traces: [],
      viewMeasurements: false,
      icon: L.icon({
        iconUrl: '/assets/images/10.png',
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        // iconSize: [32, 37],
        iconSize: [32, 32],
        iconAnchor: [16, 37],
        // iconAnchor: [0, 0],
        shadowAnchor: [13, 46]
        // bgPos: [30, 30]
      }),
      iconSize: 64
    }
  },
  computed: {
    dynamicSize () {
      return [this.iconSize * 0.5, this.iconSize * 0.5];
    },
    dynamicIconAnchor () {
      // return [this.iconSize / 2, this.iconSize * 1.15];
      return [16, 37];
    },
    dynamicShadowAnchor(){
      return [13, 46]
    },
    
  },
  methods: {
    mapClick(e){
      console.log({e})
    },
    setCoords({lat, lng, zoom}) {
      console.log({lat,lng})
      this.latitude = lat;
      this.longitude = lng;
      setTimeout(() => {
        if(this.traces.length) this.zoom = zoom
      }, 200);
      // this.setLatLong({ lat, long });
    },
    dynamicIcon(i){
      return L.icon({
        iconUrl: `/assets/images/${i}.png`,
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [32, 32],
        iconAnchor: [16, 37],
        shadowAnchor: [13, 46]
      })
    },
    traceSelected(e){
      console.log({e})
      if(e.value === true) {
        if(!this.traces.some((x => x.id === e.data.id))) {
          this.traces.push(e.data)
        }
        this.setCoords({...e.data.GPS, zoom: 20})
      } else {
        this.traces = this.traces.filter(x => x.id !== e.data.id)
        if(!this.traces.length){
          this.zoom = 15
        }
      }
    }
  }
}
</script>
