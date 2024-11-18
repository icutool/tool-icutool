<template>
    <div class="ip-query">
        <!-- 搜索框 -->
        <el-input v-model="ipAddress" placeholder="请输入IP地址" clearable class="search-box" @clear="handleClear">
            <template #append>
                <el-button type="success" @click="search">查询</el-button>
            </template>
        </el-input>

        <!-- 查询结果 -->
        <el-card v-if="result" class="result-card">
            <div class="result-row">
                <span class="result-label">国家/地区</span>
                <span class="result-value">{{ result.country }}</span>
            </div>
            <div class="result-divider"></div> <!-- 虚线 -->
            <div class="result-row">
                <span class="result-label">region</span>
                <span class="result-value">{{ result.region }}</span>
            </div>
            <div class="result-divider"></div> <!-- 虚线 -->
            <div class="result-row">
                <span class="result-label">省份</span>
                <span class="result-value">{{ result.province }}</span>
            </div>
            <div class="result-divider"></div> <!-- 虚线 -->
            <div class="result-row">
                <span class="result-label">城市</span>
                <span class="result-value">{{ result.city }}</span>
            </div>
            <div class="result-divider"></div> <!-- 虚线 -->
            <div class="result-row">
                <span class="result-label">isp</span>
                <span class="result-value">{{ result.isp }}</span>
            </div>
        </el-card>
    </div>
</template>
<script>
import { getIpInfo } from "@/api/request";
export default {
    data() {
        return {
            ipAddress: "", // 用户输入的IP地址
            result: {
                country: "",
                region: "",
                province: "",
                city: "",
                isp: "",
            },
        };
    },
    methods: {
        handleClear() {
            this.result = {
                country: "",
                region: "",
                province: "",
                city: "",
                isp: "",
            };
        },
        search() {
            if (!this.ipAddress) {
                this.$message.error("请输入IP地址！");
                return;
            }
            const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (!ipPattern.test(this.ipAddress)) {
                this.$message.error("请输入有效的IP地址！");
                return;
            }
            getIpInfo(this.ipAddress).then(res => {
                console.log(res);
                if (res.data.code == 200) {
                    this.result = {
                        country: res.data.data.country || "未知",
                        region: res.data.data.region || "未知",
                        province: res.data.data.province || "未知",
                        city: res.data.data.city || "未知",
                        isp: res.data.data.isp || "未知",
                    };
                } else {
                    console.log(res.msg);
                    this.$message.error(res.data.message || "查询失败！");
                }
            }).catch(error => {
                console.log(error.msg || error.message);
                this.$message.error("网络异常，请稍后再试！");
            });
        },
    },
};
</script>
<style scoped>
.ip-query {
    max-width: 600px;
    margin: 50px auto;
}

.search-box {
    margin-bottom: 20px;
}

.result-card {
    border: 1px solid #ebeef5;
    padding: 20px;
}

.result-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
}

.result-label {
    font-weight: bold;
    color: #606266;
}

.result-value {
    color: #333;
}

/* 虚线分隔样式 */
.result-divider {
    border-bottom: 1px dashed #dcdcdc;
    margin: 0;
}

.el-button {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
}
</style>
