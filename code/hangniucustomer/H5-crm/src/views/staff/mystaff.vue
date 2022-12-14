<template>
    <div>
        <van-nav-bar title="我的" />
        <div class="my_imgs">
            <div class="my_names">
                <img src="../../assets/u7.svg" />
                <div class="my_company">小何</div>
            </div>

        </div>
        <div class="job">
            <div class="jobNo">
                <div>工号：</div>
                <div>0356</div>
            </div>
            <div class="jobNo">
                <div>岗位：</div>
                <div>销售</div>
            </div>
            <div class="jobNo">
                <div>手机号：</div>
                <div>18500006666</div>
            </div>
        </div>
        <div class="superior">
            <div class="superiors">
                <div>我的上级：</div>
                <div>孙杰</div>
            </div>
            <div><img src='../../assets/u17.svg' /></div>
        </div>
    </div>
</template>
<style>
body {
    height: 100%;
    background-color: #EFEFF4;
}
</style>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        telephoneClick() {

        }
    }
}
</script>

<style lang="scss" scoped>
.superiors {
    display: flex;
    align-items: center;
}

.superior {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
    background: #FFFF;
    line-height: 50px;
    padding: 0px 20px 0px 20px;
}

.jobNo {
    display: flex;
    align-items: center;
    font-size: 12px;
    letter-spacing: 1px;
    color: #333333;
    line-height: 25px;

}

.job {
    padding: 0px 0px 0px 20px;
    background-color: #FFF;
}

.my_names {
    display: flex;
    align-items: center;

    .my_company {
        padding-left: 12px;
        font-size: 16px;
    }
}

.my_imgs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 20px 15px;
    background-color: #FFF;
}
</style>