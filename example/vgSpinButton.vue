<template>
  <Window
    :width="500"
    :height="450"
    @close="exit"
    :title="windowTitle"
  >
    <Box
      spacing="6"
    >
      <SpinButton
        :packStart="[false, false, 0]"
        :adjustment="[0, 0, 100, 1, 10, 0]"
        :climbRate="0"
        :digits="0"
      />
      <CheckButton
        :packStart="[false, false, 0]"
        label="Numeric"
      />
      <CheckButton
        :packStart="[false, false, 0]"
        label="If Valid"
      />
    </Box>
  </Window>
</template>

<script>
/*
  TODO:
  - spinbutton is crashing, bug in node-gtk?
    => g_registered_type_info_get_g_type: assertion 'info != NULL' failed
*/

export default {
  components: {
  },
  data: () => ({
    windowTitle: 'Entry Demo'
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
  mounted () {
    console.log('mounted')
  },
  beforeUpdate () {
  },
  updated () {
  }
}
</script>
