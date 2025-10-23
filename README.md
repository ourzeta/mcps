# 优惠券领取指南及API说明

## API 文档

MCP 服务端提供以下核心API接口：

### **获取公开优惠活动列表**

此接口用于获取所有公开的、可参与的优惠活动列表，并为每个活动动态生成最新的优惠链接。

- **HTTP 方法**: `GET`
- **接口地址**: `/api/mcp/jutuike/public_promo_list`
- **完整请求地址示例**: `https://<你的后端服务域名>/api/mcp/jutuike/public_promo_list`

---

### **返回数据格式**

接口的返回遵循统一的数据结构，包含 `code` 和 `data` 两个顶级字段。

#### 1. 顶级结构

```json
{
  "code": 200,
  "data": [ ... ]
}


code: (Number) HTTP 状态码, 200 表示请求成功。
data: (Array) 包含了所有活动对象的数组。
data 数组中的每一个对象都代表一个独立的优惠活动，其具体字段如下：

字段名	类型	说明
activityType	String	活动的唯一类型标识符。
activityName	String	活动的名称，用于展示。
actId	String	活动ID。
category	String	活动所属的分类。
desc	String	对活动的简短描述。
link	String	动态生成的 H5 优惠链接。如果获取失败，该字段可能为空字符串。
miniAppLink	Object	动态生成的小程序优惠信息。如果不支持或获取失败，该字段为空对象。
miniAppLink 对象包含了跳转到优惠小程序所需的信息。

字段名	类型	说明
app_id	String	微信小程序的 AppID。
page_path	String	小程序的目标页面路径，已包含优惠参数。
miniCode	String	指向该小程序优惠页面的二维码图片 URL（可能为空）。
这是一个标准的API返回JSON示例，展示了包含两个活动的数据结构。

{
  "code": 200,
  "data": [
    {
      "activityType": "meituan_air_train_school",
      "activityName": "美团机票火车票开学季福利卷",
      "actId": "48",
      "category": "热门优惠（机票/火车票）",
      "desc": "美团官方机票火车票优惠，含开学季专属福利",
      "link": "https://kurl07.cn/7bWZrT",
      "miniAppLink": {}
    },
    {
      "activityType": "online_car_new_old",
      "activityName": "网约车顺风车不限新老有折扣",
      "actId": "42",
      "category": "出行类活动（网约车/顺风车）",
      "desc": "出行必领",
      "link": "https://kurl08.cn/7bUhFx",
      "miniAppLink": {
        "app_id": "wxaf35009675aa0b2a",
        "page_path": "/webx/entry/block-prevention?scene=Q00mnGo&source_id=234413jutuikedefault&ref_from=dunion",
        "miniCode": "https://ut-static.udache.com/t-painter/tpainter/qrcode/qrcodeda050aa7-9c2b-58eb-a88d-86d1067059730001.jpg"
      }
    }
  ]
}


