<template>
  <Window
    :width="500"
    :height="450"
    @close="exit"
    :title="windowTitle"
  >
    <VBox
      spacing="6"
      >
      <Entry
        ref="entry"
        :packStart="[true, true, 0]"
        :text="entryText"
        :visibility="visible"
        :editable="editable"
      />
      <HBox
        :packStart="[true, true, 0]"
        spacing="6"
      >
        <CheckButton
          :packStart="[true, true, 0]"
          label="Editable"
          :active="true"
          @toggled="editableToggled"
        />
        <CheckButton
          :packStart="[true, true, 0]"
          label="Visible"
          :active="true"
          @toggled="visibleToggled"
        />
        <CheckButton
          :packStart="[true, true, 0]"
          label="Pulse"
          :active="false"
          @toggled="pulseToggled"
        />
        <CheckButton
          :packStart="[true, true, 0]"
          label="Icon"
          :active="false"
          @toggled="iconToggled"
        />
      </HBox>
    </VBox>
  </Window>
</template>

<script>
/*
  TODO:
  - implement pulse-toggled
*/

export default {
  components: {
  },
  data: () => ({
    windowTitle: 'Entry Demo',
    entryText: 'Hello World',
    editable: true,
    visible: true,
  }),
  computed: {
  },
  methods: {
    exit () {
      this.$exit();
    },
    editableToggled () {
      this.editable = !this.editable
    },
    visibleToggled () {
      this.visible = !this.visible
    },
    pulseToggled () {},
    iconToggled (node) {
      let iconName = null
      if (node.widget.getActive()) {
        iconName = 'system-search-symbolic'
      }

      this.$refs.entry.widget.setIconFromIconName(this.$gtk.EntryIconPosition.PRIMARY, iconName)
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
