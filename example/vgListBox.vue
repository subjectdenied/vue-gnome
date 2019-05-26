<template>
  <Window ref="window"
    @close="exit"
  >
    <VBox spacing="6">
      <ListBox
        :packStart="[true, true, 0]"
      >
        <ListBoxRow>
          <HBox spacing="50">
            <VBox
              :packStart="[true, true, 0]"
            >
              <Label
                :packStart="[true, true, 0]"
                xalign="0"
              >Automatic Date &amp; Time</Label>
              <Label
                :packStart="[true, true, 0]"
                xalign="0"
              >Requires internet access</Label>
            </VBox>
            <Switch
              :packStart="[false, true, 0]"
              :valign="$gtk.Align.CENTER"
              @change="switched"
            />
          </HBox>
        </ListBoxRow>
        <ListBoxRow>
          <HBox spacing="50">
            <Label :packStart="[true, true, 0]">Enable Automatic Update</Label>
            <CheckButton
              :packStart="[false, true, 0]"
              @change="switched"
            />
          </HBox>
        </ListBoxRow>
        <ListBoxRow>
          <HBox spacing="50">
            <Label :packStart="[true, true, 0]">Date Format</Label>
            <ComboBoxText
              ref="combo"
              :packStart="[false, true, 0]"
            />
          </HBox>
        </ListBoxRow>
      </ListBox>
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
    },
    switched () {
      console.log('switch was changed')
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
    console.log('mounted')
    this.$nextTick(() => {
      console.log('combo nexttick')
      this.$refs.combo.widget.appendText('24-hours')
      this.$refs.combo.widget.appendText('AM/PM')
    })
  },
  beforeUpdate () {
  },
  updated () {
  }
}
</script>
