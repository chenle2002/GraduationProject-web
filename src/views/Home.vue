<template>
    <div className="mod-home" style="text-align: left;margin-left: 4%;margin-top: 2%">
        <h3>项目介绍</h3>
        <ul style="list-style-type: none">
            <li>商家(Business)可以创建门店（Shop）</li>
            <li>商家可以在门店上架商品（Item），也可以新建商品(ShopItem)，新建的商品默认不上架。</li>
            <li>商家可以创建多个门店，门店可以上架多个商品。</li>
            <li>顾客（Customer）可以浏览商家的店铺并挑选商品（LineItem），形成订单（Order），状态为“未支付”。</li>
            <li>顾客可以支付订单，订单状态变为“已支付”。</li>
            <li>商家可以查看自己门店的订单。</li>
            <li>顾客可以取消（逻辑删除）未支付的订单。</li>
            <li>商家可以确认已支付的订单，订单状态变为“已确认”。</li>
            <li>商家可以取消已支付的订单，订单状态变为“已退款”。</li>
        </ul>
        <h3>获取帮助</h3>
        <ul style="list-style-type: none">
            <li>暂无帮助</li>
        </ul>
        <h3>QQ</h3>
        <ul style="list-style-type: none">
            <li>480797934</li>
        </ul>
        <h3>邮箱</h3>
        <ul style="list-style-type: none">
            <li>chenle2020@mail.ynu.edu.cn</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'home',
}
</script>

<style>
.mod-home {
    line-height: 1.5;
}
</style>
