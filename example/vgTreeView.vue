<template>
  <Window ref="window"
    :title="windowTitle"
    @close="exit"
  >
    <HeaderBar
      title="HeaderBar example"
      :showTitleButtons="true"
      :showCloseButton="true"
    >
      <HBox
        :packStart="[true, true, 0]"
      >
        <Button
          @click="addAnotherRow"
        >
          <ImageFromStock
            :iconName="$gtk.STOCK_ADD"
            :iconSize="$gtk.IconSize.BUTTON"
          />
        </Button>
        <Button
          @click="removeRow"
        >
          <ImageFromStock
            :iconName="$gtk.STOCK_REMOVE"
            :iconSize="$gtk.IconSize.BUTTON"
          />
        </Button>
      </HBox>
    </HeaderBar>
    <TreeView
      ref="treeview"
      :data="data"
      :columns="columns"
      :activateOnSingleClick="true"
      @cellActivated="cellActivated"
    >
      <TreeViewColumn
        v-for="(column, colIndex) in columns"
        :key="colIndex"
        :title="column.label"
        :pos="colIndex"
      >
        <CellRendererText v-if="column.field === 'index'"
          :packStart="true"
          :pos="colIndex"
        />
        <CellRendererText v-if="column.field === 'title'"
          :packStart="true"
          :pos="colIndex"
        />
        <CellRendererText v-else-if="column.field === 'author'"
          :packStart="true"
          :pos="colIndex"
          foreground="white"
          :foregroundSet="true"
          background="blue"
          :backgroundSet="true"
        />
        <CellRendererText v-else-if="column.field === 'price'"
          :packStart="true"
          :pos="colIndex"
        />
        <CellRendererToggle v-else-if="column.field === 'active'"
          :packStart="true"
          :pos="colIndex"
        />
        <CellRendererPixbuf v-else-if="column.field === 'icon'"
          :packStart="true"
          :pos="colIndex"
        />
      </TreeViewColumn>
    </TreeView>
  </Window>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    windowTitle: 'TreeViewExample',
    columns: [
      {
        type: 'number',
        label: 'index',
        field: 'index',
      },
      {
        type: 'string',
        label: 'Title & Author',
        field: 'title',
        sortable: true
      },
      {
        type: 'string',
        label: '',
        field: 'author'
      },
      {
        type: 'float',
        label: 'Price',
        field: 'price',
        sortable: true
      },
      {
        type: 'number',
        label: 'Active',
        field: 'active',
        sortable: false
      },
      {
        type: 'string',
        label: 'Icon',
        field: 'icon',
      }
    ],
    data: []
  }),
  computed: {
  },
  methods: {
    exit () {
      this.$exit();
    },
    cellActivated (node, storeData, cellData) {
      console.log('cell', storeData, cellData)
    },
    setInitialData () {
      let data = []
      for (let i=0; i < 10; i++) {
        const row = this.addRow(i)
        data.push(row)
      }
      this.data = data
    },
    addRow (i = false) {
      i = i || (this.data.length - 1 >= 0 ? this.data.length : 0)
      const row = {
        index: i,
        title: 'item ' + i,
        author: 'author ' + i,
        price: parseFloat(i + 1),
        active: parseInt(Math.round(Math.random())),
        icon: 'edit-cut'
      }
      return row
    },
    addAnotherRow () {
      const row = this.addRow()
      this.$set(this.data, this.data.length, row)
    },
    removeRow () {
      if (!this.data.length) return
      this.$delete(this.data, 0)
    }
  },
  watch: {
    data (v) {
      this.$refs.treeview.update()
    }
  },
  created () {
    this.setInitialData()
  },
  mounted () {
  },
  beforeUpdate () {
  },
  updated () {
  }
}
</script>
