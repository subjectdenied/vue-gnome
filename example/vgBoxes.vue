<template>
  <Window
    @close="exit"
    :title="windowTitle"
  >
    <Box spacing="6">
      <Button
        :packStart="[true, true, 0]"
        label="Hello"
        @click="button1Clicked"
      />
      <Button
        :packStart="[true, true, 0]"
        label="Goodbye"
        @click="button2Clicked"
      />
    </Box>
  </Window>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    windowTitle: 'Hello World',
  }),
  computed: {
  },
  methods: {
    exit () {
      this.$exit();
    },
    button1Clicked () {
      console.log('Hello')
    },
    button2Clicked () {
      console.log('Goodbye')
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
