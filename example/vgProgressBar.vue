<template>
  <Window
    ref="window"
    @close="exit"
    :title="windowTitle"
    borderWidth="10"
  >
    <VBox spacing="6">
      <ProgressBar
        ref="progressBar"
        :packStart="[true, true, 0]"
        :text="progressBarText"
        :showText="progressBarShowText"
        :activityMode="activityMode"
      />
      <CheckButton
        :packStart="[true, true, 0]"
        label="Show text"
        @toggled="textToggled"
      />
      <CheckButton
        :packStart="[true, true, 0]"
        label="Activity mode"
        @toggled="activityModeToggled"
      />
      <CheckButton
        :packStart="[true, true, 0]"
        label="Right to left"
        @toggled="rightToLeftToggled"
      />
    </VBox>
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
    windowTitle: 'ProgressBar Demo',
    progressBarText: null,
    progressBarShowText: false,
    activityMode: false,
    interval: null
  }),
  computed: {
  },
  methods: {
    exit () {
      clearInterVal(this.interval)
      this.$exit();
    },
    textToggled (node) {
      let text = null
      const showText = node.widget.getActive()
      if (showText) {
        text = 'some text'
      }
      this.progressBarText = text
      this.progressBarShowText = showText
    },
    activityModeToggled (node) {
      this.activityMode = node.widget.getActive()
      if (this.activityMode) {
        this.$refs.progressBar.widget.pulse()
      } else {
        this.$refs.progressBar.widget.setFraction(0.0)
      }
    },
    rightToLeftToggled (node) {

    },
    onTimeout () {
      console.log('timeout called')
      try {
        if (this.activityMode) {
          this.$refs.progressBar.widget.pulse()
        } else {
          const value = this.$refs.progressBar.widget.getFraction() + 0.1
          if (value > 1.0) value = 0.0
          this.$refs.progressBar.widget.setFraction(value)
        }
      } catch (e) {
        console.log('ERROR in interval function')
        this.$refs.progressBar.widget.setFraction(0)
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
    this.interval = setInterval(this.onTimeout, 250)
  },
  beforeUpdate () {
  },
  updated () {
  }
}
</script>
