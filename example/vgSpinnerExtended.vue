<template>
  <Window
    ref="window"
    @close="exit"
    :title="windowTitle"
    borderWidth="10"
  >
    <VBox spacing="6">
      <Spinner
        :packStart="[true, true, 0]"
        ref="spinner"
      />
      <Label
        :packStart="[true, true, 0]"
        :label="textRemaining"
      />
      <Entry
        :packStart="[true, true, 0]"
        :text="textInterval"
        @input="textChanged"
      />
      <Button
        ref="buttonStart"
        :packStart="[true, true, 0]"
        label="Start timer"
        @click="startClicked"
        :sensitive="buttonStartSensitive"
      />
      <Button
        ref="buttonStop"
        :packStart="[true, true, 0]"
        label="Stop timer"
        @click="stopClicked"
        :sensitive="buttonStopSensitive"
      />
    </VBox>
  </Window>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    windowTitle: 'Extended Spinner Demo',
    textRemaining: '',
    textInterval: 10,
    counter: 0,
    interval: null,
    buttonStartSensitive: true,
    buttonStopSensitive: false
  }),
  computed: {
  },
  methods: {
    exit () {
      clearInterval(this.interval)
      this.$exit();
    },
    startClicked () {
      this.startTimer()
    },
    stopClicked () {
      this.stopTimer()
    },
    startTimer () {
      this.buttonStartSensitive = false
      this.buttonStopSensitive = true
      this.counter = 4 * parseInt(this.textInterval)
      this.textRemaining = `Remaining: ${parseInt(this.counter / 4)}`
      this.$refs.spinner.widget.start()
      this.interval = setInterval(() => {
        this.onTimeout()
      }, 250);
    },
    stopTimer (text = '') {
        clearInterval(this.interval)
        this.$refs.spinner.widget.stop()
        this.buttonStartSensitive = true
        this.buttonStopSensitive = false
        this.textRemaining = text
    },
    onTimeout () {
      this.counter -= 1
      if (this.counter <= 0) {
        this.stopTimer('Reached time out')
        clearInterval(this.interval)
      }
      this.textRemaining = `Remaining: ${parseInt(this.counter / 4)}`
    },
    textChanged (node) {
      this.textInterval = node.widget.text
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
