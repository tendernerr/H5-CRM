<template>
  <div id="app">
    <Head>修改案例</Head>
    <JobForm ref="child" type="edit" @submit="submit"></JobForm>
  </div>
</template>

<script>
import JobForm from '@/components/JobForm'
import http from '@/utils/http'
import api from '@/api'
export default {
  name: 'EditJob',
  components: {
    JobForm
  },
  data () {
    return {}
  },
  created () {
    this.fetchData(this.$route.params.id)
  },
  methods: {
    fetchData (id) {
      http
        .get(api.company_jobedit_pre, { id })
        .then(res => {
          this.$refs.child.basic = res.data.basic
          this.$refs.child.contact = res.data.contact
          this.$refs.child.field_rule = res.data.field_rule
          this.$refs.child.restoreCondition({
            basic: res.data.basic,
            contact: res.data.contact,
            field_rule: res.data.field_rule
          })
          this.$refs.child.imgList = [res.data.basic.logo_]
          this.$refs.child.imgList1 = res.data.basic.square_logo_
        })
        .catch(() => {})
    },
    submit (values) {
      http
        .post(api.company_jobedit_save, values)
        .then(res => {
          this.$notify({ type: 'success', message: res.message })
          this.$router.push('/member/company/joblist')
        })
        .catch(() => {})
    }
  }
}
</script>
