<template>
  <Window ref="window"
    @close="exit"
  >
    <Box spacing="6">
      <Button
        :packStart="[ true, true, 0]"
        label="Hello"
        @click="click('Hello')"
      />
      <Button
        :packStart="[ true, true, 0]"
        label="Goodbye"
        @click="click('Goodbye')"
      />
    </Box>
  </Window>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    width: 1000,
    height: 480,
    windowTitle: 'Box'
  }),
  computed: {
  },
  methods: {
    exit () {
      this.$exit();
    },
    click (label) {
      console.log(label)
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  beforeUpdate () {
  },
  updated () {
  }
}
</script>
