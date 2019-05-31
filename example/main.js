import Vue from 'vuido'

import MainWindow from './MainWindow'
import vgBoxes from './vgBoxes'
import vgGrid from './vgGrid'
import vgListBox from './vgListBox'
import vgStack from './vgStack'
import vgHeaderBar from './vgHeaderBar'
import vgFlowBox from './vgFlowBox'

const window = new Vue({
  render(h) {
    return h(vgFlowBox)
  }
})

window.$start()
