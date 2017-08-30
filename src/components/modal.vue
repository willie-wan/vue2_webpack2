<template>
    <div class="ld-modal-wrap" id="lhbPro_list_modal-wrap" v-show="state">
        <div class="ld-modal bottom sel-hbProList-modal">
            <div class="tit"><span class="l-btn" @click="hide">取消</span>{{titText}}</div>
            <div class="con">
                <m-list :list-data="listData" @hideModal="hide"></m-list>
                <p class="tip" v-text="tipText" v-if="tipText"></p>
            </div>
        </div>
    </div>
</template>
<script>
    import MList from '@/components/list'
    export default {
        components: {
            MList
        },
        name: 'm-modal',
        props:{
            titText:String,
            tipText:String,
            listData:Array
        },
        data() {
            return {
                state:0
            }
        },
        beforeCreate() {
        
        },
        created(){
            
        },
        mouted() {
            
        },
        methods: {
            hide(){
                this.state=0;
            },
            show(){
                this.state=1;
            }
        }
    }
</script>       