import Vue from 'vuido'

import MainWindow from './MainWindow'
import vgBoxes from './vgBoxes'
import vgGrid from './vgGrid'
import vgListBox from './vgListBox'
import vgStack from './vgStack'
import vgHeaderBar from './vgHeaderBar'
import vgFlowBox from './vgFlowBox'
import vgLabel from './vgLabel'
import vgEntry from './vgEntry'
import vgButton from './vgButton'
import vgToggleButton from './vgToggleButton'
import vgRadioButton from './vgRadioButton'
import vgLinkButton from './vgLinkButton'
import vgSpinButton from './vgSpinButton'
import vgSwitch from './vgSwitch'
import vgProgressBar from './vgProgressBar'
import vgSpinner from './vgSpinner'
import vgSpinnerExtended from './vgSpinnerExtended'

const example = vgProgressBar

const window = new Vue({
  render(h) {
    return h(example)
  }
})

window.$start()
