<template>
  <div class="filter_dis_wrapper for_filter_pop">
    <div class="filter_item" ref="filterTopPop">
      <div :class="item.select ? 'item select' : 'item'" v-for="(item, index) in provinceList" :key="index" @click="makeCityElement(item)">
        {{ item.text }}
        <div class="arrow" v-if="item.children.length"></div>
      </div>
    </div>
    <van-overlay :show="showCityPop" @click="handleCityOverlay" :class-name="city_pop_lay"/>
    <van-popup v-model="showCityPop" position="right" :style="{ width: '75%', top: `${offTop}px` }" :overlay="false" ref="filterCityPop">
      <div :style="`height:${layHeight}px`" class="second_wrapper">
        <div class="filter_item" v-if="cityList.length">
          <div :class="item.select ? 'item select' : 'item'" v-for="(item, index) in cityList" :key="index" @click="makeCountyElement(item)">
            {{ item.text }}
            <div class="arrow" v-if="item.children.length"></div>
		  </div>
        </div>
      </div>
    </van-popup>
    <van-overlay :show="showCountyPop" @click="showCountyPop = false" :class-name="count_pop_lay" :style="{'zIndex': zIndex}" />
    <van-popup v-model="showCountyPop" position="right" :style="{ width: '50%', top: `${offTop}px` }" :overlay="false">
      <div :style="`height:${layHeight}px`" class="second_wrapper">
        <div class="filter_item" v-if="countyList.length">
          <div :class="item.select ? 'item select' : 'item'" v-for="(item, index) in countyList" :key="index" @click="handleSearch(item)">
            {{ item.text }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { Overlay } from 'vant'
Vue.use(Overlay)
export default {
  name: 'DistrictFilter',
  props: ['districts', 'type', 'all'],
  data () {
    return {
      citySource: [],
      provinceList: [],
      cityList: [],
      countyList: [],
      district1: '',
      district2: '',
      district3: '',
      districtName: '',
      showCityPop: false,
      showCountyPop: false,
      layHeight: 0,
      offTop: 0,
      city_pop_lay: 'city_pop_lay',
      count_pop_lay: 'count_pop_lay',
      zIndex: 1,
      showAll: true,
      level: 1
    }
  },
  created () {
    console.log(this.districts,'??????')
  },
  mounted () {
    if (this.type) {
      this.initSubstation()
    }
    this.$store.dispatch('getClassify', 'citycategory').then(() => {
      // ??????????????????
      this.citySource = this.$store.state.classifyCityOriginal
      let storeDistrict = (JSON.parse(JSON.stringify(this.citySource)))
      if (this.type) {
        storeDistrict.unshift({ value: '', label: '??????', children: [] })
      }
      this.citySource = storeDistrict.map(function (item) {
        return { id: item.value, text: item.label, children: item.children }
      })
      if (this.type) {
        if (this.level === 0) {
          this.provinceList = this.citySource.map(function (item) {
            return {
              id: item.id,
              text: item.text,
              children: item.children ? item.children : [],
              select: false
            }
          })
        } else if (this.level === 1) {
          let disList = this.citySource.filter(item => parseInt(item.id) === parseInt(this.district1))
          let currentDis = disList[0].children
          currentDis.unshift({ value: '', label: '??????', children: [] })
          currentDis = currentDis.map(function (item) {
            return { id: item.value, text: item.label, children: item.children }
          })
          this.provinceList = currentDis.map(function (item) {
            return {
              id: item.id,
              text: item.text,
              children: item.children ? item.children : [],
              select: false
            }
          })
        } else if (this.level === 2) {
          let disList = this.citySource.filter(item => parseInt(item.id) === parseInt(this.district1))
          let currentDis = disList[0].children
          let disListT = currentDis.filter(item => parseInt(item.value) === parseInt(this.district2))
          let currentDisT = disListT[0].children
          currentDisT.unshift({ value: '', label: '??????', children: [] })
          currentDisT = currentDisT.map(function (item) {
            return { id: item.value, text: item.label, children: item.children }
          })
          this.provinceList = currentDisT.map(function (item) {
            return {
              id: item.id,
              text: item.text,
              children: item.children ? item.children : [],
              select: false
            }
          })
        } else {
          let currentDis = []
          currentDis.unshift({ value: '', label: '??????', children: [] })
          currentDis = currentDis.map(function (item) {
            return { id: item.value, text: item.label, children: item.children }
          })
          this.provinceList = currentDis.map(function (item) {
            return {
              id: item.id,
              text: item.text,
              children: item.children ? item.children : [],
              select: false
            }
          })
        }
      }
      this.initData()
    })
  },
  methods: {
    initSubstation () {
      this.level = this.$store.state.config.subsite_info.district_level === undefined ? 0 : this.$store.state.config.subsite_info.district_level
      this.district1 = this.$store.state.config.subsite_info.district1 === undefined ? 0 : this.$store.state.config.subsite_info.district1
      this.district2 = this.$store.state.config.subsite_info.district2 === undefined ? 0 : this.$store.state.config.subsite_info.district2
      this.district3 = this.$store.state.config.subsite_info.district3 === undefined ? 0 : this.$store.state.config.subsite_info.district3
    },
    // ???????????????
    initData () {
      if (this.all === false) {
        this.showAll = false
      }
      if (this.type) {
        // ????????????
        if (this.level === 0) {
          this.funForInitData()
        } else if (this.level === 1) {
          if (this.districts[1]) {
            // ??????????????????
            this.district2 = this.districts[1]
            this.district3 = this.districts[2]

            let disList = this.citySource.filter(item => parseInt(item.id) === parseInt(this.district1))
            let currentDis = disList[0].children
            currentDis = currentDis.map(function (item) {
              return { id: item.value, text: item.label, children: item.children }
            })
            if (parseInt(this.district3) !== 0) {
              this.makeElement(this.district2, currentDis, 2)
              if (this.cityList.length) {
                this.showCityPop = true
              }
            }
          }
          this.syncSelect()
        } else if (this.level === 2) {
          if (this.districts[2]) {
            this.district3 = this.districts[2]
          }
          this.syncSelect()
        } else {
          this.syncSelect()
        }
      } else {
        this.funForInitData()
      }
    },
    funForInitData () {  
      if (this.districts[0]) {
        // ??????????????????
        this.district1 = this.districts[0]
        this.district2 = this.districts[1]
        this.district3 = this.districts[2]
        this.makeElement(this.district1, this.citySource, 2)
        if (this.cityList.length) {
          this.showCityPop = true
        }
        if (parseInt(this.district2) !== 0) {
          this.makeElement(this.district2, this.cityList, 3)
          if (this.countyList.length) {
            let _this = this
            setTimeout(function () {
              let elIndex = _this.$refs.filterCityPop.$el.style.zIndex
              _this.zIndex = parseInt(elIndex)
            }, 100)
            this.showCountyPop = true
          }
        }
      }
      if (!this.type) {
        this.provinceList = this.citySource.map(function (item) {
          return {
            id: item.id,
            text: item.text,
            children: item.children ? item.children : [],
            select: false
          }
        })
      }
      this.syncSelect()
    },
    // ???????????????
    handleCityOverlay () {
      this.showCountyPop = false
      this.showCityPop = false
    },
    // ??????????????????
    syncSelect () {
      let _this = this
      if (_this.type) {
        if (_this.level === 0) {
          _this.funForSyncSelect()
        } else if (_this.level === 1) {
          this.provinceList = this.provinceList.map(function (item) {
            return {
              id: item.id,
              text: item.text,
              children: item.children,
              select: parseInt(item.id) === parseInt(_this.district2)
            }
          })
          this.cityList = this.cityList.map(function (item) {
            return {
              id: item.id,
              text: item.text,
              children: item.children ? item.children : [],
              select: parseInt(item.id) === parseInt(_this.district3)
            }
          })
        } else if (_this.level === 2) {
          this.provinceList = this.provinceList.map(function (item) {
            return {
              id: item.id,
              text: item.text,
              children: item.children,
              select: parseInt(item.id) === parseInt(_this.district3)
            }
          })
        }
      } else {
        _this.funForSyncSelect()
      }
    },
    funForSyncSelect () {
      let _this = this
      this.provinceList = this.provinceList.map(function (item) {
        return {
          id: item.id,
          text: item.text,
          children: item.children,
          select: parseInt(item.id) === parseInt(_this.district1)
        }
      })
      this.cityList = this.cityList.map(function (item) {
        return {
          id: item.id,
          text: item.text,
          children: item.children,
          select: parseInt(item.id) === parseInt(_this.district2)
        }
      })
      this.countyList = this.countyList.map(function (item) {
        return {
          id: item.id,
          text: item.text,
          select: parseInt(item.id) === parseInt(_this.district3)
        }
      })
    },
    /**
       * ??????????????????
       * @param id ??????id
       * @param data ??????
       * @param level ??????
       */
    makeElement (id, data, level) {
      let disList = data.filter(item => parseInt(item.id) === parseInt(id))
      let currentDis = disList[0].children
      if (currentDis.length) {
        if (parseInt(level) === 2) {
          // ????????????
          this.cityList = currentDis.map(function (item) {
            return {
              id: item.value,
              text: item.label,
              children: item.children,
              select: false
            }
          })
          if (this.showAll) {
            this.cityList.unshift(
              {
                id: 0,
                text: `???${disList[0].text}`,
                children: [],
                select: false
              }
            )
          }
          }
        // } else {
        //   // ????????????
        //   this.countyList = currentDis.map(function (item) {
        //     return {
        //       id: item.value,
        //       text: item.label,
        //       select: false
        //     }
        //   })
        //   if (this.showAll) {
        //     this.countyList.unshift(
        //       {id: 0,
        //         text: `???${disList[0].text}`,
        //         select: false
        //       }
        //     )
        //   }
        // }
      }
    },
    /**
       * ??????????????????
       * @param item ?????????
       */
    makeCityElement (item) {
      if (this.type) {
        // ????????????
        if (this.level === 0) {
          this.funForMakeCity(item)
        } else if (this.level === 1) {
          let id = item.id
          if (id) {
            this.district2 = id
            this.cityList = []
            this.countyList = []
            let disList = this.citySource.filter(item => parseInt(item.id) === parseInt(this.district1))
            let currentDis = disList[0].children
            currentDis = currentDis.map(function (item) {
              return { id: item.value, text: item.label, children: item.children }
            })
            this.makeElement(id, currentDis, 2)
            if (!this.cityList.length) {
              // ?????????????????????
              this.district3 = 0
              this.districtName = item.text
              this.toSearch()
            } else {
              this.showCityPop = !this.showCityPop
            }
          } else {
            // ??????
            this.district2 = ''
            this.district3 = ''
            this.districtName = '??????'
            this.toSearch()
          }
          this.syncSelect()
        } else if (this.level === 2) {
          let id = item.id
          if (id) {
            this.district3 = id
            this.districtName = item.text
            this.toSearch()
          } else {
            // ??????
            this.district3 = ''
            this.districtName = '??????'
            this.toSearch()
          }
          this.syncSelect()
        } else {
          this.districtName = '??????'
          this.toSearch()
        }
      } else {
        this.funForMakeCity(item)
      }
    },
    funForMakeCity (item) {
      let id = item.id
      if (id) {
        this.district1 = id
        if (!this.district2) { this.district2 = 0 }
        if (!this.district3) { this.district3 = '' }
        this.cityList = []
        this.countyList = []
        this.makeElement(id, this.citySource, 2)
        if (!this.cityList.length) {
          // ?????????????????????
          this.district2 = 0
          this.district3 = 0
          this.districtName = item.text
          this.toSearch()
        } else {
          this.showCityPop = !this.showCityPop
        }
      } else {
        // ??????
        this.district1 = ''
        this.district2 = ''
        this.district3 = ''
        this.districtName = '??????'
        this.toSearch()
      }
      this.syncSelect()
    },
    /**
       * ??????????????????
       * @param item ?????????
       */
    makeCountyElement (item) {
      if (this.type) {
        // ????????????
        if (this.level === 0) {
          this.funForMakeCounty(item)
        } else if (this.level === 1) {
          let id = item.id
          this.district3 = id
          this.districtName = item.text
          this.toSearch()
          this.syncSelect()
        }
      } else {
        this.funForMakeCounty(item)
      }
    },
    funForMakeCounty (item) {
      let id = item.id
      this.district2 = id
      this.countyList = []
      if (parseInt(id) === 0) {
        // ????????????
        this.district3 = 0
        this.districtName = item.text
        this.toSearch()
      } else {
        this.makeElement(id, this.cityList, 3)
        if (!this.countyList.length) {
          this.district3 = 0
          this.districtName = item.text
          this.toSearch()
        } else {
          let elIndex = this.$refs.filterCityPop.$el.style.zIndex
          this.zIndex = parseInt(elIndex) + 1
          this.showCountyPop = !this.showCountyPop
        }
      }
      this.syncSelect()
    },
    /**
       * ??????????????????
       * @param item ?????????
       */
    handleSearch (item) {
      if (this.type) {
        // ????????????
        if (this.level === 0) {
          this.funForHandleSearch(item)
        }
      } else {
        this.funForHandleSearch(item)
      }
    },
    funForHandleSearch (item) {
      this.district3 = item.id
      this.districtName = item.text
      this.toSearch()
      this.syncSelect()
    },
    toSearch () {
      this.handleCityOverlay()
      if (this.type) {
        // ??????
        this.$emit('doSearch', {
          district1: this.district1,
          district2: this.district2,
          district3: this.district3,
          districtName: this.districtName
        })
      } else {
        // ??????
        this.$emit('doSelect', [
          this.district1,
          this.district2,
          this.district3,
          this.districtName
        ])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .city_pop_lay {
    background-color: rgba(0,0,0,.4); position: absolute;
  }
  .count_pop_lay {
    background-color: rgba(0,0,0,.2); position: absolute; left: 25%;
    z-index: 6;
  }
  .filter_dis_wrapper {
    display: flex; position: relative; 
    .second_wrapper {
      .item {}
      max-height: 100%;  background-color: #ffffff;
      display: flex;
    }
    .filter_item {
      flex: 1; display: block; height: 100%; 
      
      .item {
        .arrow {
          position: absolute; right: 15px; top: 21px; width: 7px;
          height: 7px; border-top: 1px solid #999999;
          border-right: 1px solid #999999; transform: rotate(45deg);
        }
        &::before {
          position: absolute; box-sizing: border-box; content: ' ';
          pointer-events: none; right: 0; bottom: 0; left: 20px;
          border-bottom: 0.026667rem solid #ebedf0;
          -webkit-transform: scaleY(.5); transform: scaleY(.5);
        }
        position: relative; padding: 0 30px; height: 50px;line-height: 50px;
        font-size: 14px; color: #323233;
        &.select { color: #1a8afa }
      }
    }
    span {
      &.select { color: #1a8afa }
      margin: 5px;
    }
    font-size: 16px;
  }
</style>
