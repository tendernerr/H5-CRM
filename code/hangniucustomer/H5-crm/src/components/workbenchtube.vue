<template>
    <div>
        <van-nav-bar title="工作台" />
        <div style="background-color: #fff">
            <div class="uickfunctions">快捷功能</div>
            <div style="display: flex;flex-wrap: wrap;padding: 0px 11px 10px 15px;">
                <div class="uicks" @click="allocatedClick">
                    <div style="font-weight: bold;">{{ quickfunction.nodistributeCustomer }}</div>
                    <div style="font-size: 14px;">待分配客户</div>
                </div>
                <div class="uicks" @click="followupClick">
                    <div style="font-weight: bold;">{{ quickfunction.followCustomer }}</div>
                    <div style="font-size: 14px;">正在跟进</div>
                </div>
                <div class="uicks" @click="dealClick">
                    <div style="font-weight: bold;">{{ quickfunction.dealCustomer }}</div>
                    <div style="font-size: 14px;">成交客户</div>
                </div>
                <div class="uicks" @click="allschedulesClick">
                    <div style="font-weight: bold;">{{ quickfunction.allSchedule }}</div>
                    <div style="font-size: 14px;">全部日程</div>
                </div>
                <div class="uicks" @click="purchaseClick">
                    <div style="font-weight: bold;">{{ quickfunction.purchaseOpportunities }}</div>
                    <div style="font-size: 14px;">采购商机</div>
                </div>
                <div class="uicks" @click="resourcesClick">
                    <div style="font-weight: bold;">{{ quickfunction.customerSource }}</div>
                    <div style="font-size: 14px;">客户资源</div>
                </div>
                <div class="uicks" @click="ImportClick">
                    <div style="font-weight: bold;">1</div>
                    <div style="font-size: 14px;">导入客户</div>
                </div>
            </div>
        </div>
        <div style="background-color: #fff;margin-top: 8px;">
            <div class="uickfunctions">数据统计</div>
            <div style="display: flex;flex-wrap: wrap;padding: 0px 11px 10px 15px;">
                <div class="uicks" @click="todayFollowupClick">
                    <div style="font-weight: bold;">{{ dataStatistics.todayCustomer }}</div>
                    <div style="font-size: 14px;">今日跟进</div>
                </div>
                <div class="uicks" @click="thismonthClick">
                    <div style="font-weight: bold;">{{ dataStatistics.monthDealCustomer }}</div>
                    <div style="font-size: 14px;">本月成交</div>
                </div>
                <div class="uicks" @click="addCustomerClick">
                    <div style="font-weight: bold;">{{ dataStatistics.insertCustomer }}</div>
                    <div style="font-size: 14px;">新增客户</div>
                </div>
                <div class="uicks" @click="salestrendsClick">
                    <div style="font-weight: bold;">{{ dataStatistics.salesTrend }}</div>
                    <div style="font-size: 14px;">销售动态</div>
                </div>
            </div>
        </div>
        <div style="background-color: #fff;margin-top: 8px;">
            <div class="uickfunctions">售后跟进</div>
            <div style="display: flex;flex-wrap: wrap;padding: 0px 11px 10px 15px;">
                <div class="uicks" @click="aftersalesClick">
                    <div style="font-weight: bold;">{{ aftefollow.mySafeAfter }}</div>
                    <div style="font-size: 14px;">我的售后</div>
                </div>
            </div>
        </div>
        <van-overlay :show="show" @click="showSignClick" class="showOver">
            <div class="Signin">
                <div class="SigninTiltle">提示</div>
                <div class="Signins" @click="SigninsClick">
                    <img src="../assets/u35.png" width="35px" height="35px" />
                </div>
                <div class="noSignin">您尚未登录，登录后可使用完整功能</div>
                <div class="button">
                    <div class="buttonCancel" @click="cancelsClick">取消</div>
                    <div class="buttonSignin" @click="SigninClick">去登录</div>
                </div>
            </div>
        </van-overlay>
        <van-overlay :show="showImport" @click="showImportClick" class="showOvers">
            <div class="Signins">
                <div class="SigninTiltles">导入客户</div>
                <div class="input-container" style="display: flex;align-items: center;">
                    <span style="width: 20%;line-height: 30px;padding-left: 10px;font-size: 15px;">上传文件</span>
                    <input class="input-file" type="file" name="file" @change="onChange" multiple="multiple"
                        id="excel-file" />
                    <div style="color:#409EFF;font-size:13px" @click="downloadClick">[模板下载]</div>
                </div>
                <div class="buttons">
                    <div class="determine" @click="determineClick()">确定</div>
                    <div class="cancel" @click="cancelClick">取消</div>
                </div>
                <div class="inputnotes">注：文件只支持电脑端上传</div>
            </div>

        </van-overlay>

    </div>
</template>    
<style>
body {
    height: 100%;
    background-color: #EFEFF4;
}
</style>
<script>
import { customerimport } from '@/api/user'
import * as xlsx from 'xlsx/xlsx.mjs'
export default {
    props: {
        getData: {
            type: Object,
            default: () => {
                data_statistics: { }
            }
        }
    },
    data() {
        return {
            list: {},
            quickfunction: [],
            dataStatistics: [],
            aftefollow: [],
            isLogin: false,
            show: false,
            showImport: false,
            url: 'https://www.hangyedaniu.com/v1_0/crm/customer/import',
            result: [],
            file: '',
           
        }
    },
    mounted() {
        this.list = this.getData;  //赋值
        this.quickfunction = this.getData.quick_functions
        this.dataStatistics = this.getData.data_statistics
        this.aftefollow = this.getData.sales_follow
        this.isLogin = this.getData.isLogin

    },
    created() {
    },
    methods: {
        uploadFile(file, url) {
            // 处理文件转换成formData格式
            const formdata = new FormData();
            // 这里只是基本设置，对应接口需求设置响应的类型属性值
            formdata.set('file', file);
            formdata.set('Status', 0);
            const token = localStorage.getItem("token");
            // 接口调用
            let xml = new XMLHttpRequest();
            xml.open('POST', url, true) // 第三个值指定接口是否异步
            // 设置请求头信息
            xml.setRequestHeader('token', token);
            // 监控上传进度 
            xml.upload.onprogress = this.onprogressEvent
            // 接口调用成功回调
            xml.onload = this.onloadEvent
            // 接口调用失败处理
            xml.onerror = this.onerrorEvent
        },
        onprogressEvent(e) {
            if (e.lengthComputable) {
                // 可以获取到实时的接口进度
                this.realTimePercent = +parseInt((e.loaded / e.total) * 100);
            }
        },
        onloadEvent(e) {
            // 获取到接口调用成功后的返回数据
            const res = JSON.parse(e.currentTarget.response);
        },
        onerrorEvent(e) {
            // 接口调用失败后的处理
        },
        // 文件上传
        getHeader(sheet) {
            const headers = [];
            const range = xlsx.utils.decode_range(sheet["!ref"]); // worksheet['!ref'] 是工作表的有效范围
            let C;
            /* 获取单元格值 start in the first row */
            const R = range.s.r; // 行 // C 列
            let i = 0;
            for (C = range.s.c; C <= range.e.c; ++C) {
                var cell =
                    sheet[
                    xlsx.utils.encode_cell({ c: C, r: R })
                    ]; /* 根据地址得到单元格的值find the cell in the first row */
                var hdr = "UNKNOWN" + C; // 如果有空表头，会替换为您想要的默认值replace with your desired default
                // XLSX.utils.format_cell 生成单元格文本值
                if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
                if (hdr.indexOf('UNKNOWN') > -1) {
                    if (!i) {
                        hdr = '__EMPTY';
                    } else {
                        hdr = '__EMPTY_' + i;
                    }
                    i++;
                }
                headers.push(hdr);
            }
            return headers;
        },
        onChange(e) {

            const files = e.target.files;
            console.log(files);
            if (!files.length) {
                return;
            } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
                return alert("上传格式不正确，请上传xls或者xlsx格式");
            }
            const fileReader = new FileReader();
            fileReader.onload = ev => {
                try {
                    const data = ev.target.result;
                    const workbook = xlsx.read(data, {
                        type: "binary"
                    });
                    const wsname = workbook.SheetNames[0]; //取第一张表，wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    const ws = xlsx.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容，wb.Sheets[Sheet名]获取第一个Sheet的数据
                    const excellist = []; //清空接收数据
                    const a = workbook.Sheets[workbook.SheetNames[0]];
                    const headers = this.getHeader(a);
                    // console.log(headers,"d");
                    //编辑数据
                    for (var i = 0; i < ws.length; i++) {
                        var json = ws[i];
                        excellist.push(json);
                    }
                    console.log("读取结果", excellist); // 此时得到的是一个内容是对象的数组需要处理
                    this.result = excellist;
                } catch (e) {
                    return alert("读取失败!");;
                }
            };
            fileReader.readAsBinaryString(files[0]);
        },

        // // 模板下载
        downloadClick() {
            window.open('https://hangyedaniu.com/manageSystem/导入客户模板.xls', '_self');
        },
        determineClick() {
            this.showImport = false;
            const resll =  this.result;
            customerimport({ result: resll }).then(res => {
                console.log(res);
            })
        },
        cancelClick() {
            this.showImport = false
        },
        showImportClick() {

        },
        // 待分配客户
        allocatedClick() {
            this.$router.push('../workbench/Tobeallocated')
        },
        // 正在跟进
        followupClick(data) {
            this.$router.push({ path: "/workbench/followup", query: { id: data.id } })
        },
        // 成交客户
        dealClick() {
            this.$router.push('../workbench/deal')
        },
        // 全部日程
        allschedulesClick() {
            this.$router.push('../workbench/allschedules')
        },
        // 采购商机
        purchaseClick() {
            if (!this.isLogin) {
                this.show = true

            }
        },
        aftersalesClick() {
            if (!this.isLogin) {
                this.show = true

            }
        },
        // 导入客户
        ImportClick() {
            this.showImport = true
        },
        // 客户资源
        resourcesClick() {
            this.$router.push('../workbench/customerSource')
        },
        // 今日跟进
        todayFollowupClick() {
            this.$router.push('../workbench/todayFollowup')
        },
        // 本月成交
        thismonthClick() {
            this.$router.push('../workbench/thismonth')
        },
        // 新增客户
        addCustomerClick() {
            this.$router.push('../workbench/addCustomer')
        },
        // 销售动态
        salestrendsClick() {
            this.$router.push('../workbench/salestrends')
        },
        // 弹窗false
        showSignClick() {
            this.show = false
        },
        // 关闭按钮
        SigninsClick() {
            this.show = false
        },
        // 取消按钮
        cancelsClick() {
            this.show = false
        },
        // 去登录按钮
        SigninClick() {
            this.$router.push('/login/account')
        },
    }
}
</script>

<style lang="scss" scoped>
.input-file {
    font-size: 13px;
    width: 58%;
}

.determine {
    width: 20%;
    display: flex;
    justify-content: center;
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 30px;
    height: 30px;
    background: #409EFF;
    color: #FFF;
    border-radius: 5px;
}

.cancel {
    width: 20%;
    display: flex;
    justify-content: center;
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 30px;
    height: 30px;
    background: #F0F0F0;
    border-radius: 5px;
    margin-left: 10px;
}

.buttons {
    display: flex;
    margin: 15px 10px 10px 65px;
}

.inputnotes {
    padding: 10px 10px 10px 15px;
}

.noSignins {
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 50px;
    display: flex;
    justify-content: center;
    width: 100%;
}

.SigninTiltles {
    padding: 10px 10px 10px 10px;
}



.Signins {
    background: #FFF;
    width: 350px;
}

.showOvers {
    display: flex;
    justify-content: center;
    align-items: center;
}

.button {
    display: flex;
    align-items: center;
    margin-top: 20px;

    .buttonCancel {
        width: 50%;
        display: flex;
        justify-content: center;
        font-size: 14px;
        letter-spacing: 2px;
        line-height: 35px;
        background: #F0F0F0;
        color: #FFF;
    }

    .buttonSignin {
        width: 50%;
        display: flex;
        justify-content: center;
        font-size: 14px;
        letter-spacing: 2px;
        line-height: 35px;
        background: #409EFF;
        color: #FFF;
    }
}

.noSignin {
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 50px;
    display: flex;
    justify-content: center;
    width: 100%;
}

.SigninTiltle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.Signins {
    float: right;
    margin-top: -30px;
}

.Signin {
    background: #FFF;
    width: 275px;
}

.showOver {
    display: flex;
    justify-content: center;
    align-items: center;
}

.uicks {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    margin-top: 10px;
}

.uickfunctions {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    letter-spacing: 2px;
    padding: 10px;
    color: #333333;
}
</style>