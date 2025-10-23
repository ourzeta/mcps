const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// Hardcoded configuration
const config = {
  jwtSecret: 'mcp_js_secret_2024',
  apiKey: 'mcp_public_key_2024', // Simple API key for basic access control
  jutuike: {
    apiUrl: 'http://api.jutuike.com/union/act',
    apiKey: 'Juybu1VagFj7RvAv0WYyWknJG7X8oiwu', // 固定apikey
    allActivities: [
      // 热门优惠（机票/火车票）
      {
        activityType: 'meituan_air_train_school',
        activityName: '美团机票火车票开学季福利卷',
        actId: '48',
        category: '热门优惠（机票/火车票）',
        desc: '美团官方机票火车票优惠，含开学季专属福利'
      },
      {
        activityType: 'meituan_train_cpa',
        activityName: '美团火车票订票活动',
        actId: '135',
        category: '热门优惠（机票/火车票）',
        desc: '新用户购票有优惠'
      },
      // 出行类活动
      {
        activityType: 'online_car_new_old',
        activityName: '网约车顺风车不限新老有折扣',
        actId: '42',
        category: '出行类活动（网约车/顺风车）',
        desc: '出行必领'
      },
      {
        activityType: 'huaxiaozhu_cpa',
        activityName: '花小猪特价打车',
        actId: '44',
        category: '出行类活动（网约车/顺风车）',
        desc: '特价拼车'
      },
      {
        activityType: 'online_car_daijia',
        activityName: '网约车&代驾服务活动',
        actId: '61',
        category: '出行类活动（网约车/代驾）',
        desc: '包含网约车和代驾'
      },
      {
        activityType: 'tongcheng_taxi',
        activityName: '同程打车/顺风车',
        actId: '87',
        category: '出行类活动（网约车/顺风车）',
        desc: '同程打车旅游出行打车首选'
      },
      // 酒店类活动
      {
        activityType: 'meituan_hotel',
        activityName: '美团酒店',
        actId: '10',
        category: '酒店类活动',
        desc: '根据用户位置推荐美团酒店优惠'
      },
      {
        activityType: 'tongcheng_hotel_cps',
        activityName: '同程酒店',
        actId: '94',
        category: '酒店类活动',
        desc: '同程酒店超低价预订'
      },
      {
        activityType: 'feizhu_hotel_daily',
        activityName: '飞猪酒店天天特惠活动',
        actId: '146',
        category: '酒店类活动',
        desc: '飞猪每日酒店特惠'
      },
      {
        activityType: 'feizhu_hotel_redpack',
        activityName: '飞猪酒店',
        actId: '29',
        category: '酒店类活动',
        desc: '飞猪酒店专属红包'
      },
      // 机票&门票类活动
      {
        activityType: 'feizhu_hotel_air_ticket',
        activityName: '飞猪酒店机票火车票门票多合一会场',
        actId: '120',
        category: '机票&门票类活动',
        desc: '飞猪多品类优惠一条龙'
      },
      {
        activityType: 'feizhu_ticket_cheap',
        activityName: '飞猪特价门票',
        actId: '148',
        category: '机票&门票类活动',
        desc: '飞猪景点特价门票'
      },
      // 外卖类活动
      {
        activityType: 'jd_food_cps',
        activityName: '京东品质外卖活动',
        actId: '23',
        category: '外卖类活动',
        desc: '京东外卖 打工人必备折扣多'
      },
      {
        activityType: 'meituan_waimai_cps',
        activityName: '美团外卖超级券',
        actId: '1',
        category: '外卖类活动',
        desc: '美团外卖 领券不亏'
      },
      {
        activityType: 'group_buy_discount',
        activityName: '团购内部优惠（吃喝玩乐1折起）',
        actId: '82',
        category: '外卖类活动',
        desc: '包含餐饮、娱乐等团购优惠，低至1折'
      },
      // 其他活动
      {
        activityType: 'meituan_free_taste',
        activityName: '美团试吃官、每日0元点外卖',
        actId: '39',
        category: '其他活动（试吃/团购/景点）',
        desc: '零元试吃活动'
      },
      {
        activityType: 'jd_group_buy_cps',
        activityName: '京东团购、购票游玩有折扣',
        actId: '72',
        category: '其他活动（试吃/团购/景点）',
        desc: '京东团购有优惠'
      },
      {
        activityType: 'scenic_ticket_summer',
        activityName: '景点游玩暑期水乐园门票',
        actId: '130',
        category: '其他活动（试吃/团购/景点）',
        desc: '暑期景点及水乐园门票优惠'
      }
    ]
  }
};

const app = express();

// --- Middleware ---
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// --- API Routes ---

// Public promotion list endpoint
app.get('/api/mcp/jutuike/public_promo_list', async (req, res) => {
  try {
    const activitiesWithLinks = await Promise.all(
      config.jutuike.allActivities.map(async (activity) => {
        try {
          const jtkResponse = await axios.get(config.jutuike.apiUrl, {
            params: {
              apikey: config.jutuike.apiKey,
              sid: 'default', // or any other tracking id
              act_id: activity.actId
            },
            timeout: 10000 // 10s timeout
          });

          const jtkData = jtkResponse.data;
          let link = '';
          let miniAppLink = {};

          if (jtkData.code === 1) {
            link = jtkData.data.h5 || jtkData.data.long_h5 || '';
            miniAppLink = jtkData.data.we_app_info || {};
          } else {
            console.error(`Failed to get link for actId ${activity.actId}: ${jtkData.msg}`);
          }

          return {
            ...activity,
            link: link,
            miniAppLink: miniAppLink
          };
        } catch (error) {
          console.error(`Error fetching link for actId ${activity.actId}: ${error.message}`);
          return {
            ...activity,
            link: '',
            miniAppLink: {}
          };
        }
      })
    );

    res.json({ code: 200, data: activitiesWithLinks });
  } catch (error) {
    res.status(500).json({ code: 500, msg: `Server Error: ${error.message}` });
  }
});


// --- Start Server ---
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`MCP Public Promo Server is running on http://localhost:${PORT}`);
});
