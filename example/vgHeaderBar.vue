<template>
  <Window
    @close="exit"
    :title="windowTitle"
    :borderWidth="10"
    :width="width"
    :height="height"
  >
    <HeaderBar
      title="HeaderBar example"
      :showTitleButtons="true"
      :showCloseButton="true"
    >
      <Button
        :packEnd="[true, true, 0]"
      >
        <ImageFromStock
          :iconName="$gtk.STOCK_REFRESH"
          :iconSize="$gtk.IconSize.BUTTON"
        />
        <!--
        <ImageFromGIcon
          :iconSize="$gtk.IconSize.BUTTON"
        >
          <ThemedIcon
            name="mail-send-receive-symbolic"
          />
        </ImageFromGIcon>
        -->
      </Button>
      <HBox
        :packStart="[true, true, 0]"
      >
        <Button>
          <ImageFromStock
            :iconName="$gtk.STOCK_GO_BACK"
            :iconSize="$gtk.IconSize.BUTTON"
          />
        </Button>
        <Button>
          <ImageFromStock
            :iconName="$gtk.STOCK_GO_FORWARD"
            :iconSize="$gtk.IconSize.BUTTON"
          />
        </Button>
      </HBox>
    </HeaderBar>
    <TextView />
  </Window>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    windowTitle: 'HeaderBar Demo',
    width: 400,
    height: 200
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
