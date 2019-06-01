<template>
  <Window
    @close="exit"
    :title="windowTitle"
  >
    <HBox spacing="6">
      <LinkButton
        :packStart="[true, true, 0]"
        uri="http://www.orf.at"
        @activateLink="linkActivated"
      >Open Link in Browser</LinkButton>
    </HBox>
  </Window>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    windowTitle: 'Button Demo',
  }),
  computed: {
  },
  methods: {
    exit () {
      this.$exit();
    },
    linkActivated () {
      console.log('Link was clicked')
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
