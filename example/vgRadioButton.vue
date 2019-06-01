<template>
  <Window
    @close="exit"
    :title="windowTitle"
  >
    <HBox spacing="6">
      <RadioButton
        ref="rb1"
        :packStart="[true, true, 0]"
        group="radioButtonGroup"
        label="Button 1"
        :active="true"
        @toggled="toggled('Button 1', ...arguments)"
      />
      <RadioButton
        ref="rb2"
        :packStart="[true, true, 0]"
        group="radioButtonGroup"
        label="Button 2"
        :active="false"
        @toggled="toggled('Button 2', ...arguments)"
      />
      <RadioButton
        ref="rb3"
        :packStart="[true, true, 0]"
        group="radioButtonGroup"
        label="Button 3"
        :active="false"
        @toggled="toggled('Button 3', ...arguments)"
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
      if (node.widget.getActive()) {
        console.log(name, node.widget)
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
