<template>
<div>
  <YShelf title="收货地址">
    <span slot="right"><el-button style="margin: 0" @click="update()">添加收货地址</el-button></span>
    <div slot="content" class="content">

      <el-table :data="addressList" v-if="addressList.length" style="width: 100%" ref="multipleTable"
      :header-cell-style="{background:'#F3F4F7',color:'#555'}">
        <el-table-column prop="Realname" label="姓名" width="120" align="center">
        </el-table-column>
        <el-table-column prop="Phone" label="电话" width="120" align="center">
        </el-table-column>
        <el-table-column prop="AddressForLoc" label="地址" width="200" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" >
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="small"  circle @click="update(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" circle @click="del(scope.row.addressId)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-else>
        <div style="padding: 80px 0;text-align: center">
          <div style="font-size: 20px">你还未添加收货地址</div>
          <div style="margin: 20px ">
            <el-button @click="dialogVisible = true">添加地址</el-button>
          </div>
        </div>
      </div>

    </div>
  </YShelf>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" center @close="closeDilog('msg')">
      <!-- <div slot="content" class="md" :data-id="msg.addressId"> -->
        <el-form :model="msg" ref="msg" :rules="rules" :data-id="msg.addressId">
            <el-form-item prop="Realname">
              <el-input placeholder="收货人姓名" v-model="msg.Realname"></el-input>
            </el-form-item>
            <el-form-item prop="Phone">
              <el-input placeholder="手机号码" v-model="msg.Phone"></el-input>
            </el-form-item>
            <el-form-item prop="AddressForLoc">
              <el-input placeholder="收货地址" v-model="msg.AddressForLoc"></el-input>
            </el-form-item>
        </el-form>
        <el-button 
        :disabled=trueORfalse
        @click="save()">
        保存</el-button>

      <!-- </div> -->
      <!-- <span>这是一段信息</span> -->
    </el-dialog>
</div>
</template>

<script>
import { addressList, addressUpdate, addressAdd, addressDel } from '@/api/index'
import { getStore,setStore } from '@/utils/storage'
import YShelf from '@/components/shelf';
export default {
  name: 'MyAddress',
  components:{
    YShelf
  },
  data () {
    return {
      addressList:[],
      dialogTitle:"修改收货地址",
      dialogVisible:false,
      msg: {
        addressId: '',
        Realname: '',
        AddressForLoc: '',
        Phone: '',
      },
      userId: '',
      rules: {
        Realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        AddressForLoc: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        Phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    trueORfalse () {
      let msg = this.msg
      return !Boolean(msg.Realname && msg.Phone && msg.AddressForLoc)
    }
  },
  methods: {
    closeDilog:function(form){
        this.dialogFormVisible = false;
        this.$refs[form].resetFields();//将form表单重置
    },
    message (m) {
      this.$message.error({
        message: m
      })
    },
    //获取地址列表
    _addressList () {
      console.log(this.addressList)
      addressList({userId: this.userId}).then(res => {
        let data = res.data.data
        if (data.length) {
          this.addressList = data
          // console.log(this.addressList)
          // this.addressId = res.result[0].addressId || '1'
        } else {
          this.addressList = []
        }
      })
    },
    _addressUpdate (params) {
      addressUpdate(params).then(res => {  //修改收货地址
        this._addressList() //修改完成后重新获取地址列表
      })
    },
    //添加地址
    _addressAdd (params) {
      addressAdd(params).then(res => {
        if (res.data.code == 1) {
          this._addressList() //修改完成后重新获取地址列表
        } else {
          this.message(res.data.msg)
        }
      })
    },
    // 保存
    save () {
      this.dialogVisible = false
      let obj = {
        userId:this.userId,
        addressId:this.msg.addressId,
        Realname:this.msg.Realname,
        Phone:this.msg.Phone,
        AddressForLoc:this.msg.AddressForLoc
      }
      
      if (obj.addressId) {
        this._addressUpdate(obj)
      } else {
        delete obj.addressId //删除地址id
        this._addressAdd(obj)
      }
    },
    // 删除
    del (addressId,i) {
      addressDel({userId: this.userId,addressId: addressId}).then(res => {
        if (res.data.code == 1) {
          this.addressList.forEach((item,i) => {
            if(item.addressId == addressId){
              this.addressList.splice(i, 1)
            }
          });
        } else {
          this.message('删除失败')
        }
      })
    },
    // 修改
    update(item){
      // console.log(item)
      this.dialogVisible=true;
      if(item){
        this.dialogTitle = '修改收货地址'
        this.msg.Realname = item.Realname
        this.msg.Phone = item.Phone
        this.msg.AddressForLoc = item.AddressForLoc
        this.msg.addressId = item.addressId
      }else {
        this.dialogTitle = '新增收货地址'
        this.msg.Realname = ''
        this.msg.Phone = ''
        this.msg.AddressForLoc = ''
        this.msg.addressId = ''
      }
    }
  },
  created () {
    this.userId = getStore('userId')
    this._addressList()
    
  },
};
</script>

<style scoped>
</style>