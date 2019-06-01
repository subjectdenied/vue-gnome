<template>
  <Window
    ref="window"
    @close="exit"
    :title="windowTitle"
    borderWidth="3"
  >
    <VBox spacing="6">
      <ToggleButton
        :packStart="[true, true, 0]"
        :label="spinningStateText"
        @toggled="spinnerToggled"
      />
      <Spinner
        :packStart="[true, true, 0]"
        ref="spinner"
      />
    </VBox>
  </Window>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    windowTitle: 'Spinner Demo',
    spinningStateText: 'Start spinning'
  }),
  computed: {
  },
  methods: {
    exit () {
      this.$exit();
    },
    spinnerToggled (node) {
      if (node.widget.getActive()) {
        this.$refs.spinner.widget.start()
        this.spinningStateText = 'Stop spinning'
      } else {
        this.$refs.spinner.widget.stop()
        this.spinningStateText = 'Start spinning'
      }
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
