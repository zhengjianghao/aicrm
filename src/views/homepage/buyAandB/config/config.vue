<template>
  <div class="sub_main_content">
  <el-form :model="conf" :show-message="false" :rules="rules" ref="conf"   class="demo-ruleForm">
    <div class="subTitle">
      满减设置
    </div>
    <div class="form-control form_control" style="padding-bottom: 0px">
        <el-form-item>
          <el-row :gutter="20">
              <el-col :span="3"><p>活动备注：</p></el-col>
              <el-col :span="9"><el-input v-model="conf.active_message" style="width: 80%" placeholder="请输入备注内容，最多30字，用于标注活动目的"></el-input></el-col>
              <el-col :span="12"><img style="height: 150px" src="../../../../assets/images/u4088.png"/></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="20">
              <el-col :span="3"><p>活动显示标签：</p></el-col>
              <el-col :span="9"><el-input v-model="conf.active_title" placeholder="最多5个字，在商品详情页展示"></el-input></el-col>
              <el-col :span="12"></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="20">
              <el-col :span="3"><p>营销有效时间：</p></el-col>
              <el-col :span="9">
                <el-date-picker
                  v-model="conf.deadline[0]"
                  format="yyyy-MM-dd HH:mm"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围">
                </el-date-picker>
                至
                <el-date-picker
                  v-model="conf.deadline[1]"
                  format="yyyy-MM-dd HH:mm"
                  type="datetime"
                  :editable="false"
                  placeholder="无期限">
                </el-date-picker>
              </el-col>
              <el-col :span="12"><div class="title_show">{{conf.active_title}}</div></el-col>
          </el-row>
        </el-form-item>
        <div class="user_toolbox user_toolbox_position chooseGoods_table_title">
          <div class="pull-left maintenance_title">
            <el-checkbox v-model="conf.toYuan">自动四舍五入到元</el-checkbox>
            <el-checkbox v-model="conf.toJiao">自动四舍五入到角</el-checkbox>
          </div>
          <div class="pull-right">
            点击已选的宝贝可重新选择
            <el-button type="primary" @click="addDiscount">增加一组优惠</el-button>
          </div>
      </div>
      <div class="user_tablelist">
          <el-table
              :data="test.curPageData"
              max-height="775">
              <el-table-column
              min-width="30px">
                <template scope='scope'>
                  <div></div>
                </template>
              </el-table-column>
              <el-table-column
              min-width="150px"
              label="选择第一件宝贝">
                <template scope="scope">
                    <div class="goodsName_row" v-if="scope.row.sub_title_1 != ''">
                        <div class="pull-left pic">
                            <img :src="scope.row.pic_url_1"/>
                        </div>
                        <div class="pull-left introduce">
                            <p class="sub_title">{{scope.row.sub_title_1}}</p>
                            <p class="sub_price">价格<span class="des">￥{{scope.row.price_1}}</span></p>
                        </div>
                    </div>
                    <div class="goodsName_row_choose" v-else>
                        <div class="pull-left pic">
                            <i class="el-icon-plus"></i>
                        </div>
                        <div class="pull-left">
                            选择购买的宝贝
                        </div>
                    </div>
                </template>
              </el-table-column>
              <el-table-column
               min-width="10px">
                <template scope="scope">
                  <div>+</div>
                </template>
              </el-table-column>
              <el-table-column
              min-width="150px"
              label="选择第二件宝贝">
                <template scope="scope">
                    <div class="goodsName_row" v-if="scope.row.sub_title_2 != ''">
                        <div class="pull-left pic">
                            <img :src="scope.row.pic_url_2"/>
                        </div>
                        <div class="pull-left introduce">
                            <p class="sub_title">{{scope.row.sub_title_2}}</p>
                            <p class="sub_price">价格<span class="des">￥{{scope.row.price_2}}</span></p>
                        </div>
                    </div>
                    <div class="goodsName_row_choose" v-else>
                        <div class="pull-left pic">
                            <i class="el-icon-plus"></i>
                        </div>
                        <div class="pull-left">
                            选择购买的宝贝
                        </div>
                    </div>
                </template>
              </el-table-column>
              <el-table-column
              min-width="150px"
              label="优惠价格">
                <template scope="scope">
                  <div class="discount">
                    <el-radio v-model="scope.row.discount" label="">打
                        <el-input v-model="scope.row.discount_cut" style="width: 100px">
                          <template slot="append">折</template>
                        </el-input>
                    </el-radio>
                  </div>
                  <div class="discount">
                    <el-radio v-model="scope.row.discount" label="cut">减
                      <el-input v-model="scope.row.discount_money" style="width: 100px">
                          <template slot="append">元</template>
                        </el-input>
                    </el-radio>
                    <el-checkbox v-model="scope.row.isMultiplication">享受倍增</el-checkbox>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
              min-width="150px"
              label="合计价格">
                <template scope="scope">
                  总价<span class="des">￥{{scope.row.allPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
              min-width="90px"
              label="操作">
                  <template scope="scope">
                    <span class="link_underline"  @click="cancel(scope.$index)"><a class="Delet link">删除</a></span>
                  </template>
              </el-table-column>
          </el-table>
      </div>
        <el-form-item>
            <el-row :gutter="20">
              <el-col :span="3"><p>限购策略：</p></el-col>
              <el-col :span="6"><el-checkbox v-model="conf.limitBuy_every"  >每个宝贝限购</el-checkbox>
                <el-input v-model="conf.limitBuy_every_num" :disabled="!conf.limitBuy_every">
                  <template slot="append">个</template>
                </el-input>
              </el-col>
              <el-col :span="15"><el-checkbox v-model="conf.limitBuy_selected">选中宝贝整体限购</el-checkbox>
                <el-input v-model="conf.limitBuy_selected_num" :disabled="!conf.limitBuy_selected">
                  <template slot="append">个</template>
                </el-input>
              </el-col>
           </el-row>
        </el-form-item>
    </div>
    <div class="subTitle">
      人群配置
    </div>
    <div class="form-control more_condition">
      <el-form-item>
          <el-row :gutter="20">
            <el-col :span="3"><p>目标会员：</p></el-col>
            <el-col :span='21'><span>您已选{{conf.gradeNum}}个会员</span></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3"></el-col>
            <el-col :span="2"><el-radio v-model="conf.group_label" label="">全部会员</el-radio></el-col>
            <el-col :span="8"><el-radio v-model="conf.group_label" label="AI"><AI></AI>智慧分组</el-radio>
              <el-popover
                ref="AIGroup"
                placement="bottom"
                width="200"
                :disabled="conf.group_label !== 'AI'"
                trigger="click">
                <el-tree
                  :data="memberGroupTreeData['AI引擎流转分组']"
                  show-checkbox
                  node-key="id"
                  :default-checked-keys="conf.gourp_ai_id"
                  :accordion="true"
                  :props="defaultProps"
                  @check-change="AICheckGroupChange"
                  >
                </el-tree>
              </el-popover>
              <el-input
                placeholder="请选择分组"
                v-popover:AIGroup
                class="linkInput"
                readonly
                v-model="AISelGroup"
                :disabled="conf.group_label !== 'AI'"
                >
                <template slot="append"><span class="iconfont icon-treeMenu"></span></template>
              </el-input>
            </el-col>
            <el-col :span="11"><el-checkbox v-model="conf.isPart_goods">AI根据选定宝贝潜需智慧推荐</el-checkbox></el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:5px">
            <el-col :span="3"></el-col>
            <el-col :span="2"><el-radio v-model="conf.group_label" label="all">全网会员</el-radio></el-col>
            <el-col :span="6"><el-radio v-model="conf.group_label" label="grade">会员等级</el-radio>
                <el-popover
                ref="gradeGroup"
                placement="bottom"
                width="200"
                :disabled="conf.group_label !== 'grade'"
                trigger="click">
                <el-tree
                  :data="memberGroupTreeData['会员等级']"
                  show-checkbox
                  node-key="id"
                  :default-checked-keys="conf.gourp_grade_id"
                  :accordion="true"
                  :props="defaultProps"
                  @check-change="tagCheckGroupChange"
                  >
                </el-tree>
              </el-popover>
              <el-input
                placeholder="请选择分组"
                v-popover:gradeGroup
                class="linkInput"
                readonly
                v-model="gradeSelGroup"
                :disabled="conf.group_label !== 'grade'"
                >
                <template slot="append"><span class="iconfont icon-treeMenu"></span></template>
              </el-input>
              &nbsp;<a class="hide">新建</a>
            </el-col>
            <el-col :span="13"><el-radio v-model="conf.group_label" label="custom">自建营销分组</el-radio>
                <el-popover
                ref="customGroup"
                placement="bottom"
                width="200"
                :disabled="conf.group_label !== 'custom'"
                trigger="click">
                <el-tree
                  :data="memberGroupTreeData['自建营销分组']"
                  show-checkbox
                  node-key="id"
                  :default-checked-keys="conf.gourp_custom_id"
                  :accordion="true"
                  :props="defaultProps"
                  @check-change="VIPCheckGroupChange"
                  >
                </el-tree>
              </el-popover>
              <el-input
                placeholder="请选择分组"
                v-popover:customGroup
                class="linkInput"
                readonly
                v-model="customSelGroup"
                :disabled="conf.group_label !== 'custom'"
                >
                <template slot="append"><span class="iconfont icon-treeMenu"></span></template>
              </el-input>
          </el-col>
          </el-row>
        </el-form-item>
      <div class="subTitle title_align more" @click="showMoreBlock = !showMoreBlock">
        更多条件
        <span class="iconfont " :class="{'icon-shang': showMoreBlock, 'icon-xia': !showMoreBlock}"></span>
      </div>
      <div class="form-control form_control more-content" v-show="showMoreBlock">
          <el-form-item prop="created">
              <el-row :gutter="20">
                  <el-col :span="3"><p>下单时间：</p></el-col>
                  <el-col :span="21">
                      <el-date-picker
                      style="width: 190px;"
                      v-model="conf.created"
                      type="daterange"
                      :editable="false"
                      placeholder="选择时间范围">
                      </el-date-picker>
                      发送
                  </el-col>
              </el-row>
          </el-form-item>
          <el-form-item prop="trade_from">
              <el-row :gutter="20">
                  <el-col :span="3"><p>订单来源：</p></el-col>
                  <el-col :span="2"><el-radio v-model="conf.trade_from" label="">全部</el-radio></el-col>
                  <el-col :span="2"><el-radio v-model="conf.trade_from" label="PC">PC订单</el-radio></el-col>
                  <el-col :span="14"><el-radio v-model="conf.trade_from" label="phone">手机订单</el-radio></el-col>
              </el-row>
          </el-form-item>
          <el-form-item prop="activity_type">
              <order-types :checkedOrderType="conf.activity_type"></order-types>
          </el-form-item>
          <el-form-item>
              <el-row :gutter="20" class="validRow">
                  <el-col :span="3"><p>订单金额：</p></el-col>
                  <el-col :span="2"><el-radio label="" v-model="payment_label">不限制</el-radio></el-col>
                  <el-col :span="19">
                      <el-radio label="custom" v-model="payment_label">价格在</el-radio>
                      <el-form-item prop="payment_start">
                          <el-tooltip
                              class="item"
                              effect="dark"
                              :manual="true"
                              :disabled="payment_label == ''"
                              :value="conf.payment_start_invalid"
                              :content="conf.payment_start_invalid_msg"
                              placement="top"
                              >
                              <el-input
                              v-model="conf.payment_start"
                              style="width:100px"
                              :disabled="payment_label !== 'custom'"
                              >
                                <template slot="append">元</template>
                              </el-input>
                          </el-tooltip>
                          至
                          </el-form-item>
                          <el-form-item prop="payment_end">
                              <el-tooltip
                              class="item"
                              effect="dark"
                              :manual="true"
                              :disabled="payment_label == ''"
                              :value="conf.payment_end_invalid"
                              :content="conf.payment_end_invalid_msg"
                              placement="top"
                              >
                              <el-input
                              v-model="conf.payment_end"
                              style="width:100px"
                              :disabled="payment_label !== 'custom'">
                                <template slot="append">元</template>
                              </el-input>
                          </el-tooltip>
                      </el-form-item>
                  </el-col>
              </el-row>
          </el-form-item>
            <el-form-item prop="buys">
                <el-row :gutter="20" class="validRow">
                  <el-col :span="3"><p>商品件数：</p></el-col>
                  <el-col :span="21">
                      <el-form-item prop="buys_start">
                          <el-tooltip
                              class="item"
                              effect="dark"
                              :manual="true"
                              :value="conf.buys_start_invalid"
                              :content="conf.buys_start_invalid_msg"
                              placement="top"
                              >
                              <el-input v-model="conf.buys_start" placeholder="不限" style="width:100px"></el-input>
                          </el-tooltip> 至
                      </el-form-item>
                      <el-form-item prop="buys_end">
                              <el-tooltip
                                  class="item"
                                  effect="dark"
                                  :manual="true"
                                  :value="conf.buys_end_invalid"
                                  :content="conf.buys_end_invalid_msg"
                                  placement="top"
                                  >
                                  <el-input v-model="conf.buys_end" placeholder="不限" style="width:100px"></el-input>
                              </el-tooltip>
                      </el-form-item>
                  </el-col>
              </el-row>
            </el-form-item>
            <el-form-item props="items_range">
              <el-row :gutter="20">
                  <el-col :span="3"><p>购买宝贝范围：</p></el-col>
                  <el-col :span="2">
                      <el-radio label="" v-model="conf.items_range_label">全部宝贝</el-radio>
                  </el-col>
                  <el-col :span="5">
                      <span @click="openChoTemplate(gbConst.chooseGoods, 'inBuyGoods', conf.items_range.include)">
                          <el-radio v-model="conf.items_range_label" label="include">指定部分宝贝
                              <span class="info">(已选中{{conf.items_range.include.length}}个宝贝)</span>
                          </el-radio>
                      </span>
                  </el-col>
                  <el-col :span="14">
                      <span @click="openChoTemplate(gbConst.chooseGoods, 'outBuyGoods', conf.items_range.exclude)">
                          <el-radio v-model="conf.items_range_label" label="exclude">排除部分宝贝
                              <span class="info">(已选中{{conf.items_range.exclude.length}}个宝贝)</span>
                          </el-radio>
                      </span>
                  </el-col>
              </el-row>
            </el-form-item>
          <el-form-item prop="pay_time">
              <el-row :gutter="20">
                  <el-col :span="3"><p>付款时间：</p></el-col>
                  <el-col :span="21">
                      每天
                      <el-time-select v-model="conf.pay_time_start"
                      :editable="false"
                      placeholder="不限"
                      :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00'
                      }">
                      </el-time-select>
                      至
                      <el-time-select v-model="conf.pay_time_end"
                      :editable="false"
                      placeholder="不限"
                      :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00',
                      }">
                      </el-time-select>
                      发送
                  </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="consign_time">
              <el-row :gutter="20">
                  <el-col :span="3"><p>发货时间：</p></el-col>
                  <el-col :span="21">
                      每天
                      <el-time-select v-model="conf.consign_time_start"
                      :editable="false"
                      is-range
                      range-separator="至"
                      placeholder="不限"
                      :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00'
                      }">
                      </el-time-select>
                      至
                      <el-time-select v-model="conf.consign_time_end"
                      :editable="false"
                      is-range
                      range-separator="至"
                      placeholder="不限"
                      :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00',
                      }">
                      </el-time-select>
                      发送
                  </el-col>
              </el-row>
            </el-form-item>

            <el-form-item  prop="sign_time">
              <el-row :gutter="20">
                  <el-col :span="3"><p>签收时间：</p></el-col>
                  <el-col :span="21">
                      每天
                      <el-time-select v-model="conf.sign_time_start"
                      :editable="false"
                      is-range
                      range-separator="至"
                      placeholder="不限"
                      :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00'
                      }">
                      </el-time-select>
                      至
                      <el-time-select v-model="conf.sign_time_end"
                      :editable="false"
                      is-range
                      range-separator="至"
                      placeholder="不限"
                      :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00',
                      }">
                      </el-time-select>
                      发送
                  </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="end_time">
              <el-row :gutter="20">
                  <el-col :span="3"><p>确认时间：</p></el-col>
                  <el-col :span="21">
                      每天
                      <el-time-select v-model="conf.end_time_start"
                      :editable="false"
                      is-range
                      range-separator="至"
                      placeholder="不限"
                      :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00'
                      }">
                      </el-time-select>
                      至
                      <el-time-select v-model="conf.end_time_end"
                      :editable="false"
                      is-range
                      range-separator="至"
                      placeholder="不限"
                      :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00',
                      }">
                      </el-time-select>
                      发送
                  </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="20">
                    <el-col :span="3"><p>买家留言：</p></el-col>
                    <el-col :span="2"><el-radio v-model="conf.buyer_message" label="">不限制</el-radio></el-col>
                    <el-col :span="3"><el-radio v-model="conf.buyer_message" label="messaged">有留言发送</el-radio></el-col>
                    <el-col :span="16"><el-radio v-model="conf.buyer_message" label="nomessaged">无留言发送</el-radio></el-col>
                </el-row>
          </el-form-item>
          <flags :checkedFlags="conf.seller_flag"></flags>
      </div>
    </div>
    <div class="subTitle">
      结束提醒
    </div>
    <div class="form-control">
      <el-form-item style="padding-top:20px">
        <el-row :gutter="20">
          <el-col :span="3"><p>结束提醒时间：</p></el-col>
          <el-col :span="21"><el-checkbox v-model="conf.reminder_label" label="">活动结束前</el-checkbox>
            <el-select v-model="conf.reminder.time" :disabled="!conf.reminder_label">
              <el-option
                v-for="item in g_const.marketingInterval"
                :label="item.name"
                :value="item.value"
                :key="item.value"
                >
              </el-option>
            </el-select>
            提醒
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="3"><p>提醒手机号：</p></el-col>
          <el-col :span="21">
              <el-input style="width: 100px" v-model="conf.reminder.mobile" readonly></el-input>
              <a @click="goSettingCenter()" class="link">修改</a>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="3"><p>千牛：</p></el-col>
          <el-col :span="21">
                <el-select v-model="conf.reminder.qianniu">
                <el-option v-for="item in value1"
                :label="item.name"
                :value="item.value"
                :key="item.value"
                >
                </el-option>
                </el-select>
          </el-col>
        </el-row>
      </el-form-item>
    </div>
    <div class="subTitle">
      推送配置
      <el-switch
        v-model="push_switch"
        on-text="关"
        off-text="开">
      </el-switch>
    </div>
    <div class="form-control form_control">
        <el-form-item prop="send_time">
            <el-row :gutter="20">
                  <el-col :span="3"><p>发送时间：</p></el-col>
                  <el-col :span="5"><el-radio v-model="conf.send_time_label" label=""><AI></AI>智慧逐个推算</el-radio></el-col>
                  <el-col :span="16"><el-radio v-model="conf.send_time_label" label="custom">定时发送</el-radio>
                    <el-date-picker
                      :disabled="conf.send_time_label === ''"
                      v-model="conf.send_time"
                      :editable="false"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="3"></el-col>
                  <el-col :span="8">
                      <el-checkbox v-model="conf.exclude_time_label" :disabled="conf.send_time_label === 'custom'">信息不推送时间段 每日</el-checkbox>
                      <el-time-select
                        :disabled="!conf.exclude_time_label"
                        v-model="conf.exclued_time_start"
                        :editable="false"
                        placeholder="不限"
                        :picker-options="{
                        start: '00:00',
                        step: '00:15',
                        end: '24:00'
                        }">
                    </el-time-select>
                    至
                    <el-time-select
                        :disabled="!conf.exclude_time_label"
                        v-model="conf.exclued_time_end"
                        :editable="false"
                        placeholder="不限"
                        :picker-options="{
                        start: '00:00',
                        step: '00:15',
                        end: '24:00',
                        }">
                    </el-time-select>
                </el-col>
                <el-col :span="13"><el-checkbox v-model="conf.ahead_time_label" :disabled="conf.send_time_label === 'custom'">在不发送时间内的信息自动提前发送</el-checkbox></el-col>
              </el-row>
        </el-form-item>
        <el-form-item>
            <el-row :gutter="20">
                <el-col :span='3'><p>推送逻辑：</p></el-col>
                <el-col :span="2"><el-radio v-model="conf.send_type" label="sms">仅短信</el-radio></el-col>
                <el-col :span="2"><el-radio v-model="conf.send_type" label="千牛">仅千牛</el-radio></el-col>
                <el-col :span="2"><el-radio v-model="conf.send_type" label="all">短信+千牛同时</el-radio></el-col>
                <el-col :span="15"><el-radio v-model="conf.send_type" label="AI"><AI></AI>智慧管理</el-radio></el-col>
                  <!--<el-col :span="19"><el-radio v-model="conf.send_type" label="AI"><AI></AI>智慧管理</el-radio></el-col>-->
              </el-row>
        </el-form-item>
    </div>
    <div class="subTitle">
      买家营销
    </div>
    <msg-edit-temp msgType='messageTemplate'  :msgContent="conf.message" :type="'PAYED'"></msg-edit-temp>
    <div class="form-bottom">
      <el-button type="primary" class="btn-save" @click="submitForm('conf')">
        <span class="iconfont icon-save" ></span>保存并自动开启
      </el-button>
      <el-button type="primary" class="btn-saveAs" @click="saveAs('conf')">另存为自定义营销
      </el-button>
      <el-button type="primary" class="btn-del" @click="del()">
        删除该条营销
      </el-button>
    </div>
  </el-form>

  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../../../misc/global.constant'
  import flags from '../../../../components/flagCheckboxsGroup/flagCheckboxsGroup'
  import orderTypes from '../../../../components/oderTypeCheckboxsGroup/oderTypeCheckboxsGroup'
  import msgEditTemp from '../../../../components/messageEditTemplate/messageEditTemplate'
  import chooseGoods from '../../../../components/chooseGoods/chooseGoods'
  import selectTreeGroup from '../../../../components/selectGroup/selectTreeGroup'
  import utils from '../../../../misc/utils'
  import moment from 'moment'
  export default {
    data() {
      var that = this
      // 发送频率校验
      var checkSendTimes = function (rule,value,callback) {
          var reg =  /^\+?[1-9]\d*$/g;
          if(!value) {
            that.conf.interval_invalid = true
            return callback(new Error(''));
          }else if(!reg.test(value)) {
            that.conf.interval_invalid = true
            return callback(new Error(''));
          }else {
            that.conf.interval_invalid = false
            callback()
          }
      };
      // 校验订单金额
      // 起始金额
      var checkMoneyStart = function(rule,value,callback) {
          var reg = /^[0-9]+(.[0-9]{1,2})?$/g;
          if(that.payment_label.length === 0) {
              that.conf.payment_end_invalid = false
              that.conf.payment_start_invalid = false
              callback();
              return
          }
          if(!value || parseFloat(value) === 0) {
            that.conf.payment_start_invalid_msg = '请输入大于0的数字'
            that.conf.payment_start_invalid = true
            return callback(new Error(''));
          } else if (!reg.test(value)) {
            that.conf.payment_start_invalid = true
            that.conf.payment_start_invalid_msg = '请输入一个数字(小数点后最多有二位)'
            return callback(new Error(''));
          // } else if (parseFloat(value) >= that.conf.payment_end) {
          //   that.conf.payment_start_invalid = true
          //   that.conf.payment_start_invalid_msg = '要小于结尾订单金额'
          //   return callback(new Error(''));
          } else {
            that.conf.payment_start_invalid = false
            callback();
          }
      }
      // 结束金额
      var checkMoneyEnd = (rule,value,callback) => {
          var reg = /^[0-9]+(.[0-9]{1,2})?$/g;
          if(that.payment_label.length === 0) {
              that.conf.payment_end_invalid = false
              that.conf.payment_start_invalid = false
              callback();
              return
          }
          if(!value || parseFloat(value) === 0) {
            that.conf.payment_end_invalid = true
            that.conf.payment_end_invalid_msg = '请输入大于0的数字'
            return callback(new Error(''));
          } else if (!reg.test(value)){
            that.conf.payment_end_invalid = true
            that.conf.payment_end_invalid_msg = '请输入一个数字(小数点后最多有二位)'
            return callback(new Error(''));
          } else if (parseFloat(value) <= that.conf.payment_start) {
            that.conf.payment_end_invalid = true
            that.conf.payment_end_invalid_msg = '要大于起始订单金额'
            return callback(new Error(''));
          } else {
            that.conf.payment_end_invalid = false
            callback();
          }
      }
      // 商品件数校验
      // 起始件数
      var checkBuysStart = function(rule,value,callback) {
          var reg = /^[0-9]+$/g;
          //   可以为空
          if(value.length === 0) {
              that.conf.buys_start_invalid = false
                callback()
                return
          }
          if(parseFloat(value) === 0 || !reg.test(value)) {
            that.conf.buys_start_invalid_msg = '请输入大于0的整数'
            that.conf.buys_start_invalid = true
            return callback(new Error(''));
        //   } else if (parseFloat(value) >= that.conf.buys_end) {
        //     that.conf.buys_start_invalid = true
        //     that.conf.buys_start_invalid_msg = '要小于结尾商品件数'
        //     return callback(new Error(''));
          } else {
            that.conf.buys_start_invalid = false
            callback();
          }
      }
      // 结束件数
      var checkBuysEnd = (rule,value,callback) => {
          var reg = /^[0-9]+$/g;
          //   可以为空
          if(value.length === 0) {
              that.conf.buys_end_invalid = false
                callback()
                return
          }
          if(parseFloat(value) === 0 || !reg.test(value)) {
            that.conf.buys_end_invalid_msg = '请输入大于0的整数'
            that.conf.buys_end_invalid = true
            return callback(new Error(''));
          }
          else if (parseFloat(value) <= that.conf.buys_start) {
            that.conf.buys_end_invalid = true
            that.conf.buys_end_invalid_msg = '要大于起始商品件数'
            return callback(new Error(''));
          }
           else {
            that.conf.buys_end_invalid = false
            callback();
          }
      }
      // 校验结束提醒手机号
      var checkPhone =function(rule,value,callback) {
          if(!value.mobile){
            that.conf.reminder.remind_phone_invalid = true
            that.conf.reminder.remind_phone_invalid_msg = '该字段不能为空'
            return callback(new Error(''));
          } else if(!that.g_utils.phoneRex.test(value.mobile)) {
            that.conf.reminder.remind_phone_invalid = true
            that.conf.reminder.remind_phone_invalid_msg = '手机号格式不正确'
            return callback(new Error(''));
          } else {
            that.conf.reminder.remind_phone_invalid = false
            callback();
          }
      }
      return {
        showMoreBlock: false,
        g_const: globalConstant,
        g_utils: utils,
        payment_label: '',
        value1: '',
        push_switch: true,
        test: {
            curPageData: [{
                discount: '',
                pic_url_1: '',
                sub_title_1: 'sdfs',
                price_1: '1235',
                sub_title_2: 'sdfasdg',
                pic_url_2: '',
                price_2: '23121',
                discount_cut: '',
                discount_money: '',
                isMultiplication: true,
                allPrice: '',
              }],
            totalNum: '1'
          },
        conf: {
          items:[],
          items_range_label: '',
          items_range: {include:[],exclude:[]},
          reminder: {
            time: ''
          },
          activity_type: [],
          seller_flag: [],
          pay_time_start: '',
          pay_time_end: '',
          consign_time_start: '',
          consign_time_end: '',
          sign_time_start: '',
          sign_time_end: '',
          end_time_start: '',
          end_time_end: '',
          deadline: ['',''],
          trade_from: '',
          created: '',
          group_label: '',
          buyer_message: '',
          send_type: '',
          reminder_label: '',
          gradeNum: '0',
          limitBuy_selected: '',
          limitBuy_every: '',
          isPart_goods: '',
          send_time_label: '',
          send_time: new Date(),
          exclude_time_label: '',
          activety_goods: '',
          active_title: '',
          active_message: '',
          payment_end_invalid: false,
          payment_end_invalid_msg: '',
          payment_start_invalid_msg: '',
          payment_start_invalid: false,
          interval_invalid: false,
          remind_phone_invalid: false,
          remind_phone_invalid_msg: '',
          buys_start_invalid: false,
          buys_start_invalid_msg: '',
          buys_end_invalid_msg: '',
          buys_start_invalid: false,
          exclued_time_start: '',
          exclued_time_end: ''
        },
        rules: {
          interval: [{
            validator: checkSendTimes, trigger: 'blur'
          }],
          payment_start: [{
            validator: checkMoneyStart, trigger: 'blur'
          }],
          payment_end: [{
            validator: checkMoneyEnd, trigger: 'blur'
          }],
          reminder: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          buys_start: [{
              validator: checkBuysStart, trigger: 'blur'
          }],
          buys_end: [{
              validator: checkBuysEnd, trigger: 'blur'
          }],
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        AISelGroup:'',
        gradeSelGroup: '',
        customSelGroup: ''
      }
    },
    computed: {
      ...mapGetters([
        'subState',
        'flagState',
        'oderTypeState',
        'getSubCode',
        'selectGoodsData',
        'memberGroupData',
        'msgState',
        'immConfigData',
        'saveAsData',
        'renameData',
        'settingContact',
        'isSysMarketingjob',
        'memberGroupTreeData'
        ]),
      gbConst() {
        return globalConstant.openModalCodes
      }
    },
    mounted() {

    },
    watch: {
      selectGoodsData() {
        var selGoodsData = this.selectGoodsData
        if(selGoodsData.eleName === 'pushGoods') {
            this.conf.items = selGoodsData.selectGoods
        } else if(selGoodsData.eleName === 'inBuyGoods') {
            this.conf.items_range.include = selGoodsData.selectGoods
        } else if(selGoodsData.eleName === 'outBuyGoods') {
            this.conf.items_range.exclude = selGoodsData.selectGoods
        }
      },
    },
    methods: {
      ...mapActions([
        'updateOpenModal',
        'updateSelectGoods',
        'getMemberGroup',
        'getImmConfigData',
        'updateImmConfigData',
        'saveAsImmConfigData',
        'renameImmMarketTask',
        'getImmSidebar',
        'refresh',
        'getMarketingJob',
        'deleteImmConfig'
      ]),
      commonCheckGroup(groupIds, data, isChecked) {
        var temp = groupIds
        if(isChecked) {
          var len = temp.length
          var same = false
          for(var i = 0; i < len; i++) {
            if(data.id === temp[i]) {
              same = true
              break
            }
          }
          if(!same) {
            temp.push(data.id)
          }
        } else {
          temp = temp.filter(o => {
            return data.id !== o
          })
        }
        return temp
      },
      AICheckGroupChange(data, isChecked) {
        if(!data.id) return
        var groupIds = this.conf.gourp_ai_id
        this.conf.gourp_ai_id = this.commonCheckGroup(groupIds, data, isChecked)
        this.updatAISelGroupText()
      },
      updatAISelGroupText() {
        this.AISelGroup = '已选择' + this.conf.gourp_ai_id.length + '个分组'
      },
      tagCheckGroupChange(data, isChecked) {
        if(!data.id) return
        var groupIds = this.conf.gourp_grade_id
        this.conf.gourp_grade_id = this.commonCheckGroup(groupIds, data, isChecked)
        this.updateTagSelGroupText()
      },
      updateTagSelGroupText() {
        this.gradeSelGroup = '已选择' + this.conf.gourp_grade_id.length + '个分组'
      },
      VIPCheckGroupChange(data, isChecked) {
        if(!data.id) return
        var groupIds = this.conf.gourp_custom_id
        this.conf.gourp_custom_id = this.commonCheckGroup(groupIds, data, isChecked)
        this.updateVIPSelGroupText()
      },
      updateVIPSelGroupText() {
        this.customSelGroup = '已选择' + this.conf.gourp_custom_id.length + '个分组'
      },
      goSettingCenter() {
          this.updateOpenModal({
              name: this.g_const.openModalCodes.settingsCenter,
              param: {
                  state:'close'
              }
          })
      },

      openChoTemplate(code, eleName, selGoods) {
        this.updateOpenModal({
          name: code,
          isOpen: true
        })
        this.updateSelectGoods({
          selectGoods: selGoods,
          eleName: eleName
        })
      },
      saveAs(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateOpenModal({
              name: globalConstant.openModalCodes.marketSaveAs,
              param: {
                taskName: '拍下即时营销' + moment().format('YYYY-MM-DD HH:mm'),
                from: 'imm'
              }
            })
          } else {
            return false;
          }
        })
      },
      del() {
        this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var id = this.immConfigData.id
          this.deleteImmConfig(id).then(o => {
            this.getMarketingJob()
            this.$router.push({
              path: this.g_const.activeMenuCodes.imm
            })
            utils.showSuccessMsg(this, '删除成功')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            customClass: 'message_position',
            message: '已取消删除'
          });
        })
      },
      submitForm(formName) {
        this.conf.message = this.msgState
        this.conf.seller_flag = this.flagState
        this.conf.activity_type = this.oderTypeState
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.conf.payment_label = this.payment_label
            this.updateImmConfigData([this.immConfigData.id, {
              title: this.immConfigData.title,
              start_time: this.immConfigData.start_time,
              end_time: this.immConfigData.end_time,
              filter_option: this.conf
            }]).then(o => {
              this.init()
              utils.showSuccessMsg(this, '保存成功')
            })
          } else {
            return false;
          }
        })
      },
       checkMoneyEnd(rule,value,callback) {
          var reg = /^[0-9]+(.[0-9]{1,3})?$/g;
          if(!value) {
            return callback(new Error('不能为空'));
          }else if(!reg.test(value)){
            callback(new Error('请输入一个数字(小数点后最多有三位)'));
          }else if(parseFloat(value) < parseFloat(this.conf.moneyStart)) {
            return callback(new Error('要大于或等于前面的数字'));
          }else {
            callback();
          }
      },
      addDiscount() {

      }
    },
    components: {
      flags,
      orderTypes,
      msgEditTemp,
      chooseGoods,
      selectTreeGroup
    }
}
</script>
<style lang="scss" scoped>
   @import '../../../../style/variable.scss';
   $commonColor: #365964;
   $commonColor_low: #AAAAAA;
  .sub_main_content .title_align {
    padding-left: 58px;
  }
  .el-form-item {
    font-size: 12px;
  }
  .el-col {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    p {
      display: block;
      text-align: right;
      color: #5D6D7D;
    }
    span {
      font-size: 12px;
    }
  }
  .form_control {
    padding-top: 24px;
  }
  .el-form-item {
    margin-bottom: 16px;
  }
  .el-checkbox__input {
      .el-checkbox__inner {
      display: inline-block;
      width: 16px;
      height: 16px;
    }
  }

.el-radio {
  float: left;
  margin-right: 5px;
}
.el-checkbox {
  float: left;
  margin-right: 5px;
}
.validRow {
  .el-form-item {
    display: inline-block;
  }
}
.title_show {
  position: relative;
  font-size: 14px;
  background: pink;
  text-align: center;

  z-index: 500;
  width: 60px;
  height: 30px;
  left: 230px;
  top: -18px;

}
.user_tablelist {
  margin-top: 0px;
}
.chooseGoods_table_title {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #ccc;
  .span {
    margin-left: 10px;
    margin-top: 5px;
  }
  .pull-right {
      span {
        font-size: 14px;
        color: $primary;
      }
  }
  .el-button {
    padding: 4px 8px;
    margin: 0px 10px 0px 5px;
  }
}
.el-table {
    border-left: hidden;
    border-right: hidden;
    margin-bottom: 30px;
    .cell > .discount {
        height: 35px;
        line-height: 35px;
        margin: 2px 0px;
    }
    .cell > .goodsName_row_choose {
        height: 56px;
        line-height: 56px;
        margin-top: 10px;
    }
}
.el-table::after {
      width: 0px;
}
.introduce {
    position: relative;
    height: 56px;
    .sub_title {
        font-size: $titleFontSize;
        color: $commonColor;
        text-decoration: underline;
    }
    .sub_price {
      width: 100px;
      position: absolute;
      bottom: 0px;
    }
}
.des {
    font-size: 16px;
    color: orangered;
}
.pic {
    margin-right: 10px;
    width: 52px;
    height: 52px;
    border: solid 1px #ccc;
    text-align: center;
    line-height: 52px;
    i {
      margin-top: 10px;
      font-size: 30px;
      font-weight: bolder;
    }
}
</style>
