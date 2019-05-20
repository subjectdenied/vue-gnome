<template>
  <Window ref="window" :width="width" :height="height" @close="exit" :title="windowTitle">
    <Box>
      <Button
        ref="b1"
        label="+"
        @click="click('plus')"
      />
      <Button
        ref="b2"
        label="-"
        @click="click('minus')"
      />
      <Label>{{ counter }}</Label>
    </Box>
  </Window>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      width: 1000,
      height: 480,
      windowTitle: 'Vue Gnome',
      counter: 0
    }
  },
  computed: {
  },
  methods: {
    show () {
	    console.log('show')
    },
    exit () {
      this.$exit();
    },
    click (op) {
      console.log('before setting')

      switch (op) {
        case 'plus':
          this.counter++
          break
        case 'minus':
          this.counter--
          break
      }

      console.log('after setting')
    }
  },
  watch: {
    windowTitle (v) {
      console.log('title changed')
    }
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  },
  beforeUpdate () {
    console.log('before update')
  },
  updated () {
    console.log('mainWindow was updated')
  }
}
</script>
