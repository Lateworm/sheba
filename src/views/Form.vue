<template>
  <main>
    <section id='vue'>
      <!-- OUTPUT TABLE -->
      <h1>Sheba</h1>
      <table>
        <tr>
          <td class='table-header'>Latest total</td>
          <td class='align-right'><pre>{{ dollar(total(savings[0].assets)) }}</pre></td>
        </tr>
        <tr>
          <td class='table-header'>Total change</td>
          <td class='align-right'><pre>{{ dollar(deltaToDate) }}</pre></td>
        </tr>
        <tr>
          <td class='table-header'>Duration tracked</td>
          <td class='align-right'><pre>{{ savings.length-1 }} months</pre></td>
        </tr>
        <tr>
          <td class='table-header'>Average monthly change</td>
          <td class='align-right'><pre>{{ dollar(deltaMonthlyAverage) }}</pre></td>
        </tr>
        <tr>
          <td class='table-header'>One-year projected change</td>
          <td class='align-right'><pre>{{ dollar(deltaProjected1Year) }}</pre></td>
        </tr>
        <tr>
          <td class='table-header'>One-year projected total</td>
          <td class='align-right'><pre>{{ dollar(totalProjected1Year) }}</pre></td>
        </tr>
      </table>

      <p v-if='isNaN(deltaMonthlyAverage)'>
        '--' indicates that the necessary data for a calculation is not available.
        <span v-if='savings.length < 2'>Ensure that all fields are filled in for at least 2 months.</span>
        <span v-if='savings.length > 1'>Ensure that all fields are filled in.</span>
      </p>

      <br><hr><br>

      <!-- INPUT TABLE -->
      <table>
        <thead>
          <tr class='table-header'>
            <td>
              Month<br>
              (yyyy-mm)
            </td>
            <td v-for='(account, ai) in accounts' :key='ai'>
              <button class='pos' v-on:click='accountAdd();'>+</button>
              <button class='neg' v-on:click='accountDel();'>-</button><br>
              <input type='text' v-model='accounts[ai]' >
            </td>
            <td>
              Δ
            </td>
            <td>
              total
            </td>
            <td>
              <button v-on:click='save();' title='Save to Local Storage'>Save</button>
              <button v-on:click='load();' title='Load the last data you saved'>Load</button>
            </td>
          </tr>
        </thead>

        <tbody>
          <tr v-for='(entry, ei) in savings' :key='ei'>
            <!-- date input -->
            <td><input class='month' type='text' v-model='entry.date' maxlength="7"></td>

            <!-- a balance input for each account -->
            <td v-for='(account, ai) in accounts' :key='ai'>
              <span>$</span>
              <InputNumber v-model='entry.assets[ai]' @focus="$event.target.select()"/>
            </td>

            <!-- DASHBOARD -->
            <!-- totals display -->
            <td>{{ dollar(delta(ei, 1)) }}</td>
            <td>{{ dollar(total(savings[ei].assets)) }}</td>

            <!-- row operations buttons -->
            <td>
              <button class='neg' v-on:click='savingsDel(ei);' title='Remove this month'>-</button>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td>
              <input class='month' type='text' v-model='monthToAdd' maxlength="7" v-on:change="savingsAdd(monthToAdd); monthToAdd = '';">
            </td>
            <!-- Need validation on the month, button should only work when valid -->
            <td><button v-on:click="savingsAdd(monthToAdd); monthToAdd = '';">Add Month</button></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>    
    </section>
  </main>
</template>


<script>
  import { defineComponent } from 'vue';
  const numbro = require('numbro'); // Why can't I import { numbro } from 'numbro';
  import localStore from '@/scripts/local-store.ts'

  export default defineComponent({
    name: 'Form',

    data: function () {
      return {
        accounts: [ 'Sample Account', 'Sample Account 2' ],
        savings: [
          { date: this.getMonth(),   assets: [300, 600] },
          { date: this.getMonth(-1), assets: [200, 400] },
          { date: this.getMonth(-2), assets: [100, 200] },
        ],
        monthToAdd: '',
      }
    },

    created() {
      this.load(); // autoload
    },

    methods: {
      // BASIC DATA MANAGEMENT
      savingsAdd: function(month) {
        const entry = { date: month, assets: [] }
        this.accounts.forEach(account => { entry.assets.push(null) })

        this.savings.splice(this.savings.length, 0, entry,);
        this.savings.sort((a,b) => {
          if (a.date < b.date) { return 1; }
          if (a.date > b.date) { return -1; }

          // TODO: we should never have two identical months, so this return zero should never happen
          // TODO: extract sorting to it's own function, so we can sort on:change of any date input
          return 0
        })
      },
      savingsDel: function(index) {
        if (this.savings.length > 1) { this.savings.splice(index, 1) }
      },
      accountAdd: function() {
        this.accounts.push(`Account ${this.accounts.length + 1}`);
        this.savings.forEach(entry => { entry.assets.push(null) });
      },
      accountDel: function() {
        this.accounts.pop();
        this.savings.forEach(entry => { entry.assets.pop() });
      },

      // MONTH LOGIC
      getMonth: function(offset = 0) {
        const now = new Date;
        const round = offset > 0 ? Math.floor : Math.ceil;

        const month = (now.getMonth() + 1 + (offset % 12)).toString().padStart(2, '0');
        const year = now.getFullYear() + round(offset / 12);

        return year + '-' + month;
      },

      // IO
      save: function() {
        // TODO: add data structure version number

        localStore.upsert('accounts', this.accounts);
        localStore.upsert('savings', this.savings);

        // TODO: this can be dangerous, because if you didn't load old data but still save,
        //       you destroy your old data.
        //       There should be a safety mechanism on this button
        // TODO: provide some kind of confirmation
      },
      load: function() {
        const localAccounts = localStore.getKey('accounts');
        const localSavings = localStore.getKey('savings');

        if (localAccounts) { this.accounts = localAccounts }
        if (localSavings) { this.savings = localSavings }
        // TODO: display a message if no saved date is found
      },

      // ANALYTICS
      delta: function(index, retroDistance) {
        // index -> the index we're inspecting
        // retroDistance -> how far back in time we're looking

        if (index < this.savings.length -1) {
          return this.total( this.savings[index].assets) - this.total(this.savings[index+retroDistance].assets )
        } else {
          return 0
        }
      },
      total: function(assetsArray) {
        let sum = 0
        assetsArray.forEach(asset => {sum += parseInt(asset)})
        return sum
      },

      // VIEW CONCERNS
      dollar: function(amount) {
        if (!isNaN(amount)) {
          // return amount
          // DEBUG ME!!!!!
          return numbro(amount).formatCurrency({thousandSeparated: true})
          // maybe this is the real problem
        } else {
          return '--'
        }
      }
    },

    computed: {
      deltaToDate: function() {
        return this.delta(0, this.savings.length-1)
      },
      deltaMonthlyAverage: function() {
        return Math.round(this.deltaToDate / (this.savings.length - 1))
      },
      deltaProjected1Year: function() {
        return this.deltaMonthlyAverage * 12
      },
      totalProjected1Year: function() {
        // this seems to be subtracting?
        return this.total(this.savings[0].assets) + this.deltaProjected1Year
      },
    }
  });
</script>


<style scoped>
</style>
