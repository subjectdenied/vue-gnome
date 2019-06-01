<template>
  <Window
    @close="exit"
    :title="windowTitle"
  >
    <HBox spacing="6">
      <Switch
        :packStart="[true, true, 0]"
        :active="false"
        @activate="activated('s1', ...arguments)"
      />
      <Switch
        :packStart="[true, true, 0]"
        :active="true"
        @activate="activated('s2', ...arguments)"
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
    windowTitle: 'Switch Demo',
  }),
  computed: {
  },
  methods: {
    exit () {
      this.$exit();
    },
    activated (name, node) {
      const state = node.widget.getActive()
      console.log(name, 'changed to', state)
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
