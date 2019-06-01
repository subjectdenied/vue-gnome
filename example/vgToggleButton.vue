<template>
  <Window
    @close="exit"
    :title="windowTitle"
  >
    <HBox spacing="6">
      <ToggleButton
        :packStart="[true, true, 0]"
        label="Button 1"
        @toggled="toggled('Button 1', ...arguments)"
      />
      <ToggleButton
        :packStart="[true, true, 0]"
        label="Button 2"
        :active="true"
        @toggled="toggled('Button 2', ...arguments)"
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
    windowTitle: 'ToggleButton Demo'
  }),
  computed: {
  },
  methods: {
    exit () {
      this.$exit();
    },
    toggled (name, node) {
      const state = node.widget.getActive()
      console.log(`Button ${name} was turned ${state ? 'on' : 'off'}`)
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
