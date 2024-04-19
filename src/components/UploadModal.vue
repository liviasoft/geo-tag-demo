<template>
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark color="primary" v-bind="attrs" v-on="on" class="mx-1"><v-icon>mdi-upload</v-icon> Upload</v-btn>
      </template>
      <v-card class="rounded-xl">
        <v-card-title class="primary white--text py-2">
          <div class="d-flex align-center" style="width: 100%">
            <p class="mb-0"><strong>New</strong> - Upload new EMF Measurements</p>
            <v-spacer></v-spacer>
            <v-btn dark icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
          </div>
        </v-card-title>
        <v-card-text class="pt-4">
          <v-file-input
            v-model="files"
            placeholder="Upload your documents"
            label="Add EMF Measurement File(s)"
            multiple
            show-size
            counter
            hint="Accepts csv, xlsx, or fmpsa formats"
            prepend-icon="mdi-paperclip"
          >
          <template v-slot:selection="{ text }">
            <v-chip small label color="primary">
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
        <div>
          <v-btn :disabled="!files.length || loading" :loading="loading" class="primary lighten-1 mt-2" @click="saveFiles" block><v-icon left>mdi-upload</v-icon>Upload</v-btn>
        </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="() => dialog = false"><v-icon left>mdi-close</v-icon>Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    data:() => ({
      dialog: false,
      loading: false,
      files: []
    }),
    methods: {
      ...mapActions({
        showToast: 'ui/showToast'
      }),
      saveFiles(){
        this.loading = true;
        setTimeout(() => {
          this.files = []
          this.showToast({show: true, message: "Measurements Uploaded", timeout: 3000, sclass: 'success'})
          this.loading = false
          this.dialog = false
        }, 1500);
      }
    }
  }
</script>