<template>
  <div id='nav'>
    <router-link to='/form'>Sheba</router-link> |
    <router-link to='/settings'>Settings</router-link> |
    <router-link to='/'>WIP</router-link>
  </div>
  <router-view/>
</template>

<style>
  @import '../node_modules/primevue/resources/primevue.min.css';           
  @import '../node_modules/primeicons/primeicons.css';

  @media (prefers-color-scheme: light) {
    :root {
      --border-radius: 3px;

      --color-bg-pri: hsl(227, 10%, 88%);
      --color-bg-sec: hsl(279, 10%, 96%);

      --color-bg-pos: hsl(181, 50%, 97%);
      --color-bg-neg: hsl(321, 50%, 97%);

      --color-fg-pri: hsl(0, 100%, 2%);
      --color-fg-sec: hsl(241, 45%, 40%);
      --color-fg-pos: hsl(181, 50%, 36%);
      --color-fg-neg: hsl(342, 91%, 57%);
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --border-radius: 3px;

      --color-bg-pri: hsl(15, 6%, 18%);
      --color-bg-sec: hsl(351, 78%, 2%);
      --color-bg-pos: hsl(186, 60%, 22%);
      --color-bg-neg: hsl(275, 59%, 25%);

      --color-fg-pri: hsl(284, 31%, 93%);
      --color-fg-sec: hsl(221, 96%, 65%);
      --color-fg-pos: hsl(184, 39%, 53%);
      --color-fg-neg: hsl(342, 93%, 57%);
    }
  }

  /* STYLES FOR PRIMEVUE COMPONENTS */
  .p-inputnumber-input { width: 6rem; }
  .p-datepicker-monthpicker { background-color: var(--color-bg-sec); }
  .p-datepicker-year { background-color: var(--color-bg-pri); color: var(--color-fg-pri); }



  /* STYLES FOR STANDARD HTML */
  body {
    margin: 0;
    padding: 1rem;
    background-color: var(--color-bg-pri);
    color: var(--color-fg-pri);
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #nav { padding: 30px; }
  #nav a { color: var(--color-fg-sec); }
  #nav a.router-link-exact-active { color: var(--color-fg-pri); }

  main {
    display: flex;
    justify-content: center;
  }

  hr {
    border-top: 1px solid var(--color-fg-sec);
    border-bottom: none;
  }

  pre {
    font-size: 1.25rem;
    margin: 0;
  }

  input {
    color: var(--color-fg-pri);
    background-color: var(--color-bg-sec);
    font-size: 1rem;
    border: 0px;
    border-radius: var(--border-radius);
    padding-left: 4px;
  }
  input.month { width: 4rem }

  .table-header input {
    width: 6rem;
  }

  /* BUTTONS, GNERAL */
  button {
    border: 1px solid var(--color-fg-sec);
    border-radius: var(--border-radius);
    background-color: var(--color-bg-sec);
    color: var(--color-fg-sec);
  }

  /* BUTTONS, ITERATIVE */
  button.neg, button.pos { padding: 0; width: 1rem; border: none; }
  button.pos {
    color: var(--color-fg-pos);
    background-color: var(--color-bg-pos);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  button.neg {
    color: var(--color-fg-neg);
    background-color: var(--color-bg-neg);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }


  table { margin-bottom: 1.5rem }
  td { padding-right: .5rem }
  .table-header { color: var(--color-fg-sec) }

  /* COMPOSABLE CLASSES */
  .align-right { text-align: right }
</style>
