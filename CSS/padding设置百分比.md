# padding



padding 的值为百分比时, 是以**父元素的 width** 为参照物

因为如果根据 height 计算, 则父元素的高度会改变以容纳子元素, 然后父元素的高度改变又会导致子元素 margin 改变, 进而无限循环

margin / padding 取值为 百分比时都是以 **父元素的 width ** 为参照物