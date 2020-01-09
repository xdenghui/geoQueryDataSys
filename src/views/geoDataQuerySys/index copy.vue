<template>
	<div class="sys_index">
		<el-card shadow="hover" class="content_show">
      <h2>滑坡及地质数据采集系统</h2>
			<p class="content">基于数据的地质灾害监测预警平台，是在将各种专业地质灾害监测设备与物联网和通信技术的集成的基础上，构建地质灾害监测、分析、预报、预警和应急服务于一体的信息化、智能化和可视化服务平台，实现灾前、灾中、灾后全生命周期动态管理，全面提升相关单位对突发性地质灾害的分析、预警、处置和服务的能力，为政府相关部门进行地质环境与地质灾害决策管理和社会服务提供技术保障.</p>
			<el-alert
				:title="`当前滑坡概率 ${percentage}%`"
				type="error"
				:closable="false"
				class="alert_box"
				>
			</el-alert>
			<el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" :color="customColorMethod"></el-progress>
    </el-card>
		<el-row class="cards_box" :gutter="12">
			<el-col :span="6" v-for="(item, index) in cards" :key="index">
				<card-item :dataObj="item" />
			</el-col>
		</el-row>
	</div>
</template>

<script>
import CardItem from './components/CardItem'
export default {
	components: {CardItem},
	data() {
		return {
			percentage: 18,
			cards: [
				{title: '温度数据监测', nowReq: 'get_T1', description: '采用VI子程序技术作为温度值的输入，设置了温度值的输出模式（摄氏或华氏），输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '湿度数据监测', nowReq: 'get_Humidity1_mean', description: '采用VI子程序技术作为湿度值的输入，设置了湿度的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '孔隙压数据监测', nowReq: 'get_Pressure1_mean', description: '采用VI子程序技术作为孔隙压的输入，设置了空隙压的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '加速度数据监测', nowReq: 'get_A1_variance', description: '采用VI子程序技术作为加速度的输入，设置了空隙压的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '降雨量数据监测', nowReq: 'get_rainfall_mean', description: '采用VI子程序技术作为降雨量的输入，设置了温度值的输出模式（摄氏或华氏），输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '光照度数据监测', nowReq: 'get_illuminance_mean', description: '采用VI子程序技术作为光照度的输入，设置了湿度的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '电极电势数据监测', nowReq: 'get_V1_mean', description: '采用VI子程序技术作为电极电势的输入，设置了空隙压的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '地表位移数据监测', nowReq: 'get_displacement1_mean', description: '采用VI子程序技术作为地表位移的输入，设置了空隙压的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
			]
		}
	},
	computed: {
		customColorMethod(){
			if (this.percentage < 20) {
				return '#f56c6c';
			} else if (this.percentage < 40) {
				return '#e6a23c';
			} else if(this.percentage < 70) {
				return '#5cb87a';
			} else {
				return '#67c23a';
			}
		}
	},
	methods: {
	},
};
</script>

<style lang="scss" scoped>
.sys_index{
	padding: 10px 16px;
	background: #fafafa;
	.content_show{
		margin-bottom: 16px;
		.alert_box{
			height: 40px;
			line-height: 40px;
			margin-bottom: 16px;
		}
	}
}
</style>
