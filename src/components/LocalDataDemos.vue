<template>
  <div class='hello'>
    <h1>{{ msg }}</h1>

    <h3>Test Data</h3>
    <p>The following test data is hardcoded in the Vue file, but we'll use it exactly the same way we'd use some v-model data.</p>
    <pre>{{ testData }}</pre>
    <p>We'll test using the data at index:</p>
    <InputNumber v-model='testIndex' showButtons buttonLayout="horizontal"/>

    <h3>Local Storage</h3>
    <Button label='Upsert' @click="localStoreUpsert(testData[testIndex].date, testData[testIndex].balance)" />
    <Button label='Get Key' @click="localStoreGetKey(testData[testIndex].date)" />
    <Button label='Get All' @click="localStoreGetAll()" />
    <Button label='Remove All' @click="localStoreRemoveAll()" />
    <pre>{{ localStoreTest }}</pre>

    <h3>IndexedDB</h3>
    <Button label="Upsert" @click="localDBUpsert([testData[testIndex]])" />
    <Button label="Get Key" @click="localDBGetKey(testData[testIndex].date)" />
    <Button label="Get All" @click="localDBGetAll()" />
    <Button label='Delete Key' @click='deleteKey(testData[testIndex].date)' />

    <pre>{{ localDBTest }}</pre>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import localStore from '@/scripts/local-store.ts'
import localDB from '@/scripts/local-db.ts'

export default defineComponent({
  name: 'LocalDataDemos',

  props: {
    msg: String,
  },

  data() {
    return {
      // a bit of mack data, much like we'd get off of a field model
      testData: [
        { date: '2020-01-01', account: 'a', balance: 1000 },
        { date: '2020-02-01', account: 'b', balance: 2000 },
      ],
      testIndex: 0,

      // some values to use for testing retrieval from storage
      // we'll define these empty, and fill them from the storage solutions on button click
      localStoreTest: 'Data fetched from localStorage will be written here',
      localDBTest: 'Data fetched from indexedDB will be written here',
    }
  },

  methods: {
    localStoreUpsert: function(key: string, payload: any) { localStore.upsert(key, payload) },
    localStoreGetKey: function(key: string) { this.localStoreTest = localStore.getKey(key) },
    localStoreGetAll: function() { this.localStoreTest = localStore.getAll() },
    localStoreRemoveAll: function() { localStore.removeAll(); this.localStoreTest = {} },

    localDBUpsert: function(payload: any) { localDB.upsert(JSON.parse(JSON.stringify(payload))) },
    localDBGetKey: function(key:string) { localDB.getKey(key).then((r) => this.localDBTest = r ) },
    localDBGetAll: function() { localDB.getAll().then((r) => this.localDBTest = r ) },
    deleteKey: function(key: string) { localDB.deleteKey(key)},
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button { margin-right: 0.5rem; }
</style>
