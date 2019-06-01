<template>
  <Window
    :width="500"
    :height="450"
    @close="exit"
    :title="windowTitle"
  >
    <HBox
      spacing="10"
      :homogeneous="false"
      >
      <VBox
        :packStart="[true, true, 0]"
        spacing="10"
        :homogeneous="false"
      >
        <Label
          :packStart="[true, true, 0]"
          label="This is a normal label."
        />
        <Label
          :packStart="[true, true, 0]"
          label="This is a left-justified label.\nWith multiple lines."
          :justify="$gtk.Justification.LEFT"
        />
        <Label
          :packStart="[true, true, 0]"
          label="This is a right-justified label.\nWith multiple lines."
          :justify="$gtk.Justification.RIGHT"
        />
        <!--
        <Label
          :packStart="[true, true, 0]"
          text="Text can be <small>small</small>, <big>big</big>, <b>bold</b>, <i>italic</i> and even point to somewhere in the <a href=\"http://www.gtk.org\" title=\"Click to find out more\">internets</a>."
          :lineWrap="true"
        />
        -->
        <Label
          :packStart="[true, true, 0]"
          label="_Press Alt + P to select button to the right"
          :selectable="true"
        />
      </VBox>
      <VBox
        :packStart="[true, true, 0]"
        spacing="10"
        :homogeneous="false"
      >
        <Label
          :packStart="[true, true, 0]"
          label="This is an example of a line-wrapped label.  It should not be taking up the entire width allocated to it, but automatically wraps the words to fit.\n.     It supports multiple paragraphs correctly, and  correctly   adds many          extra  spaces. "
          :wrap="true"
        />
        <Label
          :packStart="[true, true, 0]"
          label="This is an example of a line-wrapped, filled label. It should be taking up the entire              width allocated to it.  Here is a sentence to prove my point.  Here is another sentence. Here comes the sun, do de do de do.\n    This is a new paragraph.\n    This is another newer, longer, better paragraph.  It is coming to an end, unfortunately."
          :wrap="true"
          :justify="$gtk.Justification.FILL"
        />
        <Button
          :packStart="[true, true, 0]"
          label="Click at your own risk"
        />
      </VBox>
    </HBox>
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
