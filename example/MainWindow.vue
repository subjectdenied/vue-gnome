<template>
  <Window ref="window"
    :width="width"
    :height="height"
    @close="exit"
  >
    <HeaderBar
      title="headerbar test title"
      :showTitleButtons="true"
      :showCloseButton="true"
    >
      <HBox>
        <Button
          label="<"
          @click="click('minus')"
        />
        <Button
          label=">"
          @click="click('plus')"
        />
      </HBox>
    </HeaderBar>
    <Notebook>
      <VBox>
        <Label>First Page</Label>
      </VBox>
      <ScrolledWindow
        :hscrollbarPolicy="$gtk.PolicyType.NEVER"
        :vscrollbarPolicy="$gtk.PolicyType.AUTOMATIC"
      >
        <FlowBox
          :maxChildrenPerLine="5"
          :minChildrenPerLine="5"
          :selectionMode="$gtk.SelectionMode.NONE"
        >
          <VBox>
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
            <Label>{{ currentCount }}</Label>
            <Button
              v-for="(label, index) in buttons"
              :key="index"
              :label="index"
            />
          </VBox>
        </FlowBox>
      </ScrolledWindow>
    </Notebook>
  </Window>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    width: 1000,
    height: 480,
    windowTitle: 'Vue Gnome',
    buttons: []
  }),
  computed: {
    currentCount () {
      const c = this.buttons.length
      console.log('new count', c)
      return c
    }
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
          this.buttons.push(this.currentCount + 1)
          break
        case 'minus':
          if (this.currentCount > 0) {
            this.$delete(this.buttons, this.currentCount - 1)
          }
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
    for (let i=0; i<30; i++) {
      this.buttons.push(i)
    }
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
