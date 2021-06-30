import {
  ElAside, ElAvatar,
  ElButton,
  ElCalendar,
  ElCard, ElCheckbox, ElCol, ElCollapse, ElCollapseItem,
  ElContainer, ElDatePicker, ElDialog, ElDivider,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElMain, ElOption, ElPagination, ElRate, ElRow, ElScrollbar, ElSelect, ElSpace, ElSwitch, ElTable, ElTableColumn, ElTag
} from 'element-plus'

export default (app) => {
  app.use(ElContainer)
  app.use(ElMain)
  app.use(ElRow)
  app.use(ElCol)
  app.use(ElCard)
  app.use(ElDialog)
  app.use(ElForm)
  app.use(ElFormItem)
  app.use(ElInput)
  app.use(ElCheckbox)
  app.use(ElButton)
  app.use(ElCalendar)
  app.use(ElTable)
  app.use(ElTableColumn)
  app.use(ElPagination)
  app.use(ElCollapse)
  app.use(ElCollapseItem)
  app.use(ElTag)
  app.use(ElRate)
  app.use(ElDatePicker)
  app.use(ElSelect)
  app.use(ElOption)
  app.use(ElHeader)
  app.use(ElAside)
  app.use(ElDivider)
  app.use(ElFooter)
  app.use(ElSpace)
  app.use(ElScrollbar)
  app.use(ElAvatar)
  app.use(ElSwitch)
}
