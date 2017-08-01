<template>
    <div class="banner-box" v-if="bannerState">
        <a>
            <img :src="url" alt="">
        </a>
        <i class="ico ico-del" v-if="hasClose" @click="hideBanner"></i>
    </div>
</template>
<script>
    export default {
        name: 'm-banner',
        // url:父组件传递的banner图片路径，hasClose:是否有关闭按钮
        props:{
            url:String,
            hasClose:Number
        },
        data() {
            return {
                bannerState:1
            }
        },
        beforeCreate: function () {
        
        },
        mouted: function () {
            
        },
        methods: {
            hideBanner(){
                this.bannerState=0;
            }
        }
    }
</script>
