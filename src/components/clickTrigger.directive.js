/*
 * @Author: xiamu
 * @Date: 2017-11-16 17:30:44
 * @Last Modified by: xiamu
 * @Last Modified time: 2017-11-23 17:00:11
 */

//////////////////////////////////////// pageClick部分 ////////////////////////////////////////
/**
 * 是否加载数据
 * @param {Element} el 分页节点
 * @returns {Boolean}
 */
function isLoad(el) {
  let isLoad
  // 获取页码li
  let lis = el.getElementsByClassName('el-pager')[0].getElementsByTagName('li')
  if (lis[0]) {
    isLoad = true
  } else {
    isLoad = false
  }
  return isLoad
}
/**
 * 给按钮取消绑定
 * @param {Element} el 分页节点
 */
function unbind(el) {
  // 获取左右按钮
  let leftBtn = el.getElementsByClassName('btn-prev')[0]
  let rightBtn = el.getElementsByClassName('btn-next')[0]
  leftBtn.onclick = null
  rightBtn.onclick = null
  // 获取输入框
  let input = el.getElementsByClassName('el-pagination__jump')[0].getElementsByTagName('input')[0]
  input.onkeydown = null
  // 获取下拉框input
  let menuInput = el.getElementsByClassName('el-pagination__sizes')[0].getElementsByClassName('el-select')
  menuInput[0].onclick = null
}
/**
 * 给下拉框绑定onclick
 * @param {Element} el 分页节点
 * @param {Function} doFn 组件传递的方法
 */
function bindInputClick(el, doFn) {
  // 获取下拉框input
  let menuInput = el.getElementsByClassName('el-pagination__sizes')[0].getElementsByClassName('el-select')
  menuInput[0].onclick = function () {
    // 获取下拉框菜单
    let dropdownList = document.getElementsByClassName('el-select-dropdown')
    let menuList = dropdownList[dropdownList.length - 1].getElementsByTagName('ul')
    // 获取选择页码
    let lis = menuList[0].getElementsByTagName('li')
    for (let i = 0; i < lis.length; i++) {
      if (lis[i]) {
        lis[i].onclick = function () {
          // 获取激活的页码
          let activeLi = el.getElementsByClassName('el-pager')[0].getElementsByClassName('active')
          if (activeLi[0]) {
            // 获取激活的页码
            let pageNum = parseInt(activeLi[0].innerText)
            let menuSelect = lis[i].innerText
            menuSelect = parseInt(menuSelect.replace('条/页', ''))
            doFn(pageNum, menuSelect)
          }
        }
      }
    }
  }
}
/**
 * 给页码绑定onclick
 * @param {Element} el 分页节点
 * @param {Function} doFn 组件传递的方法
 */
function bindLiClick(el, doFn) {
  // 获取页码li
  let lis = el.getElementsByClassName('el-pager')[0].childNodes
  // 获取激活的页码
  let activeLi = el.getElementsByClassName('el-pager')[0].getElementsByClassName('active')
  let activePageNum = parseInt(activeLi[0].innerText)
  // 获取输入框
  let input = el.getElementsByClassName('el-pagination__jump')[0].getElementsByTagName('input')[0]
  for (let i = 0; i < lis.length; i++) {
    if (lis[i]) {
      // 点击去重
      if (parseInt(lis[i].innerText) !== activePageNum) {
        lis[i].onclick = function (e) {
          // 传回页码
          if (!isNaN(parseInt(lis[i].innerText))) {
            let pageNum = parseInt(lis[i].innerText)
            // 按钮不是省略号
            doFn(pageNum)
            window.event ? window.event.cancelBubble = true : e.stopPropagation()
          } else if (isNaN(parseInt(lis[i].innerText))) {
            // 按钮是省略号
            setTimeout(function () {
              // 没有setTimeout会获取上一个页码
              let pageNum_input = parseInt(input.value)
              doFn(pageNum_input)
            }, 100)
          }
        }
      } else {
        lis[i].onclick = null
      }
    }
  }
}

/**
 * 给左右按钮绑定onclick
 * @param {Element} el 分页节点
 * @param {Function} doFn 组件传递的方法
 */
function LRBtn(el, doFn) {
  // 获取激活的页码
  let activeLi = el.getElementsByClassName('el-pager')[0].getElementsByClassName('active')
  // 获取左右按钮
  let leftBtn = el.getElementsByClassName('btn-prev')[0]
  let rightBtn = el.getElementsByClassName('btn-next')[0]
  if (activeLi[0]) {
    // 左按钮事件
    if (!leftBtn.classList.contains('disabled')) {
      leftBtn.onclick = function () {
        let pageNum = parseInt(activeLi[0].innerText)
        // 传回页码
        doFn(pageNum)
      }
    } else if (leftBtn.classList.contains('disabled')) {
      leftBtn.onclick = null
    }
    // 右按钮事件
    if (!rightBtn.classList.contains('disabled')) {
      rightBtn.onclick = function () {
        // 传回页码
        let pageNum = parseInt(activeLi[0].innerText)
        doFn(pageNum)
      }
    } else if (rightBtn.classList.contains('disabled')) {
      rightBtn.onclick = null
    }
  }
}

/**
 * 给输入框绑定onkeydown
 * @param {Element} el 分页节点
 * @param {Function} doFn 组件传递的方法
 */
function bindInputEnter(el, doFn, oldInputValue) {
  // 获取输入框
  let input = el.getElementsByClassName('el-pagination__jump')[0].getElementsByTagName('input')[0]
  // 获取页码li
  let lis = el.getElementsByClassName('el-pager')[0].childNodes
  let firstLi = lis[0]
  let lastLi = lis[lis.length - 1]
  if (input) {
    // 获取input值
    oldInputValue = parseInt(input.value)
    input.onkeydown = function (e) {
      // 输入框的页码
      let pageNum = parseInt(input.value)
      // 最小的页码
      let smallPageNum = parseInt(firstLi.innerText)
      // 最大的页码
      let largePageNum = parseInt(lastLi.innerText)
      if (e.keyCode == 13) {
        // 当输入的值与原值不同时执行
        if (oldInputValue !== pageNum) {
          // 传回页码
          if (pageNum >= smallPageNum && pageNum <= largePageNum) {
            doFn(pageNum)
            oldInputValue = pageNum
          } else if (pageNum < smallPageNum || isNaN(pageNum)) {
            doFn(smallPageNum)
            input.value = smallPageNum
            oldInputValue = smallPageNum
          } else if (pageNum > largePageNum) {
            doFn(largePageNum)
            oldInputValue = largePageNum
          }
        }
      }
    }
  }
}

export default {
  install(Vue, option) {
    Vue.directive('clickTrigger', {
      inserted: function (el, binding) {
        // 发送时间click
        if (binding.arg == 'radioClick') {
          // 组件传递的方法
          let doFn = binding.value
          let child = el.getElementsByTagName('input')
          // 绑定click事件 阻止input冒泡
          if (child[0]) {
            child[0].onclick = function (e) {
              doFn(e.value)
              window.event ? window.event.cancelBubble = true : e.stopPropagation()
            }
          }
        }
      },
      componentUpdated: function (el, binding) {
        // 分页click
        if (binding.arg == 'pageClick') {
          // 组件传递的方法
          let doFn = binding.value
          // 输出框输入值
          let oldInputValue
          setTimeout(function () {
            // 是否加载数据
            let _isLoad = isLoad(el)
            if (_isLoad) {
              // 给页码绑定onclick
              bindLiClick(el, doFn)
              // 给左右按钮绑定onclick
              LRBtn(el, doFn)
              // 给输入框绑定onkeydown
              bindInputEnter(el, doFn, oldInputValue)
              // 给下拉框绑定onclick
              bindInputClick(el, doFn)
            } else {
              // 给按钮取消绑定
              unbind(el)
            }
          }, 100)
        }
      }
    })
  }
}
