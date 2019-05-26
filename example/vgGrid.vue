<template>
  <Window ref="window"
    :title="windowTitle"
    @close="exit"
  >
    <Grid
      ref="grid"
    >
      <Button
        label="Button 1"
        ref="b1"
      />
      <Button
        label="Button 2"
        ref="b2"
        :attach="[1, 0, 2, 1]"
      />
      <Button
        label="Button 3"
        ref="b3"
        :attachNextTo="[
          0,
          $gtk.PositionType.BOTTOM,
          1,
          2
        ]"
      />
      <Button
        label="Button 4"
        ref="b4"
        :attachNextTo="[
          2,
          $gtk.PositionType.RIGHT,
          2,
          1
        ]"
      />
      <Button
        label="Button 5"
        ref="b5"
        :attach="[1, 2, 1, 1]"
      />
      <Button
        label="Button 6"
        ref="b6"
        :attachNextTo="[
          4,
          $gtk.PositionType.RIGHT,
          1,
          1
        ]"
      />
    </Grid>
  </Window>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    windowTitle: 'Grid'
  }),
  computed: {
  },
  methods: {
    exit () {
      this.$exit();
    },
    click (label) {
      console.log(label)
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  beforeUpdate () {
  },
  updated () {
  }
}
</script>
