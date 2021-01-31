<template>
  <main>
    <section id='vue'>
      <h1>Settings</h1>

      <table>
        <tr>
          <td><button v-on:click="clear(); message = 'Data, mind; both are blank';">Clear</button></td>
          <td><p>{{ message }}</p></td>
        </tr>
      </table>
    </section>
  </main>
</template>

<script>
  import { defineComponent } from 'vue';
  import localStore from '@/scripts/local-store.ts'

  export default defineComponent({
    name: 'Settings',

    data: function () {
      return {
        message: "Clear all data you've ever entered here. Experience the gift of freshness. No thing is so great as nothing.",
      };
    },

    methods: {
      clear: function() {
        localStore.removeAll();
        // TODO: do this 'properly'; set the default data back
      },
    }
    
  })
</script>