<template>
  <Window
    @close="exit"
    :title="windowTitle"
    :borderWidth="10"
    :width="width"
    :height="height"
  >
    <ScrolledWindow>
      <FlowBox
        :valign="$gtk.Align.START"
        :maxChildrenPerLine="30"
        :selectionMode="$gtk.SelectionMode.NONE"
      >
        <Button v-for="(color, index) in colors"
          :key="index"
          :label="color"
        >
        <!--
          <DrawingArea
            :width="24"
            :height="24"
            @draw="draw(color, ...arguments)"
          />
        -->
        </Button>
      </FlowBox>
    </ScrolledWindow>
  </Window>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    windowTitle: 'HeaderBar Demo',
    width: 400,
    height: 200,
    colors: [
      'AliceBlue',
      'AntiqueWhite',
      'AntiqueWhite1',
      'AntiqueWhite2',
      'AntiqueWhite3',
      'AntiqueWhite4',
      'aqua',
      'aquamarine',
      'aquamarine1',
      'aquamarine2',
      'aquamarine3',
      'aquamarine4',
      'azure',
      'azure1',
      'azure2',
      'azure3',
      'azure4',
      'beige',
      'bisque',
      'bisque1',
      'bisque2',
      'bisque3',
      'bisque4',
      'black',
      'BlanchedAlmond',
      'blue',
      'blue1',
      'blue2',
      'blue3',
      'blue4',
      'BlueViolet',
      'brown',
      'brown1',
      'brown2',
      'brown3',
      'brown4',
      'burlywood',
      'burlywood1',
      'burlywood2',
      'burlywood3',
      'burlywood4',
      'CadetBlue',
      'CadetBlue1',
      'CadetBlue2',
      'CadetBlue3',
      'CadetBlue4',
      'chartreuse',
      'chartreuse1',
      'chartreuse2',
      'chartreuse3',
      'chartreuse4',
      'chocolate',
      'chocolate1',
      'chocolate2',
      'chocolate3',
      'chocolate4',
      'coral',
      'coral1',
      'coral2',
      'coral3',
      'coral4'
    ]
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
    },
    /*
    draw (color, component, cr) {
      console.log(color, component.widget, cr)
      const width = component.widget.getAllocatedWidth()
      const height = component.widget.getAllocatedHeight()
      console.log({ width, height })

      // Cairo in GJS uses camelCase function names
      cr.setSourceRGB(1.0, 0.0, 0.0);
      cr.setOperator($cairo.Operator.DEST_OVER);
      cr.arc(16, 16, 16, 0, 2*Math.PI);
      cr.fill();

      return true
    }
    */
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
