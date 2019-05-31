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
            <Button
              :packStart="[true, true, 0]"
              label="add entry"
              @click="addEntry"
            />
            <Button
              :packStart="[false, true, 0]"
              label="remove entry"
              @click="removeEntry"
            />
          </HBox>
        </ListBoxRow>
        <ListBoxRow>
          <HBox spacing="50">
            <Label :packStart="[true, true, 0]">Date Format</Label>
            <ComboBoxText
              :packStart="[false, true, 0]"
              @change="comboBoxTextChanged"
            >
              <ComboBoxTextItem v-for="item in comboxTextItems"
                :key="item.value"
                :id="item.value"
              >{{ item.label }}</ComboBoxTextItem>
            </ComboBoxText>
          </HBox>
        </ListBoxRow>
      </ListBox>
      <ListBox
        :packStart="[true, true, 0]"
        @rowActivated="rowActivated"
      >
        <ListBoxRow v-for="item in items"
          :key="item"
        >
          <Label>{{ item }}</Label>
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
    windowTitle: 'Box',
    itemsString: 'This is a sorted ListBox Fail',
    comboxTextItems: [
      { label: '24 hours', value: '24hours' },
      { label: 'AM/PM', value: 'am_pm' }
    ]
  }),
  computed: {
    items () {
      return this.itemsString.split(' ')
    }
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
    },
    comboBoxTextChanged (value) {
      console.log(value)
    },
    rowActivated (index) {
      console.log('row activated', index)
      console.log(this.items[index])
    },
    addEntry () {
      this.comboxTextItems.push({
        label: 'another one',
        value: 'some'
      })
    },
    removeEntry () {
      this.$delete(this.comboxTextItems, this.comboxTextItems.length - 1)
    }
  },
  watch: {
  },
  created () {
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
