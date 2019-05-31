<template>
  <Window
    @close="exit"
    :borderWidth="10"
    :title="windowTitle"
  >
    <VBox spacing="6">
      <StackSwitcher
        :packStart="[true, true, 0]"
        :stack="stack"
      />
      <Stack
        ref="stack"
        :packStart="[true, true, 0]"
        :transitionType="$gtk.StackTransitionType.SLIDE_LEFT_RIGHT"
        :transitionDuration="1000"
      >
        <CheckButton
          :forStack="['check', 'Check Button']"
          label="Click me"
        />
        <Label
          :forStack="['label', 'A Label']"
          markup="<big>A Fancy Label</big>"
        />
      </Stack>
    </VBox>
  </Window>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    width: 1000,
    height: 480,
    windowTitle: 'Stack & StackSwitcher',
    stack: null
  }),
  computed: {
  },
  methods: {
    exit () {
      this.$exit();
    }
  },
  watch: {
  },
  created () {
    console.log('created')
  },
  async mounted () {
    console.log('mounted')
    this.$nextTick(() => {
      this.stack = this.$refs.stack
    })
  },
  beforeUpdate () {
  },
  updated () {
  }
}
</script>
