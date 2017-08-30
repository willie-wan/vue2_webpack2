<template>
    <ul class="bank-card-list select-lhb-pro-list" id="bank_card_list">
        <li v-for="item in listData" :key="item.fundCode" @click="getSelectLhbPro(item)">
            <div class="cont">
                <p><span class="name" v-text="item.productAbbreviation"></span></p>
                <p><span class="c-f4c" v-text="item.yearlyRose || '--'"></span> 七日年化( <span v-text="item.yearlyRoseDate"></span>)</p>
            </div>
        </li>
    </ul>
</template>
<script>
import Bus from '@/store/bus'
export default {
    name: 'm-list',
    props:{
        listData:Array,
        default:[]
    },
    data() {
        return {
            
        }
    },
    methods: {
        getSelectLhbPro(item){
            this.$emit('hideModal')
            Bus.$emit('changeSelectPro',item)
        }
    }
}
</script>