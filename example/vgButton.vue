<template>
  <Window
    @close="exit"
    :title="windowTitle"
  >
    <HBox spacing="6">
      <Button
        :packStart="[true, true, 0]"
        label="Click me"
        @click="clickMeClicked"
      />
      <Button
        :packStart="[true, true, 0]"
        label="Open"
        @click="openClicked"
      />
      <Button
        :packStart="[true, true, 0]"
        label="Close"
        @click="closeClicked"
      />
    </HBox>
  </Window>
</template>

<script>
/*
  TODO
    - implement mnemonics
*/

export default {
  components: {
  },
  data: () => ({
    windowTitle: 'Button Demo',
  }),
  computed: {
  },
  methods: {
    exit () {
      this.$exit();
    },
    clickMeClicked () {
      console.log('"Click me" button was clicked')
    },
    openClicked () {
      console.log('"Open" button was clicked')
    },
    closeClicked () {
      console.log('Closing application')
      this.exit()
    }
  },
  watch: {
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  },
  beforeUpdate () {
  },
  updated () {
  }
}
</script>
