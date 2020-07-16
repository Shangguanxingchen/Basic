module.exports = {
    get_lang: function(reg){
        var search = location.search.substr(1);
        var obj = {};
        var arr = search.split('&');
        for(var i in arr){
            var tmp = arr[i].split('=');
            obj[tmp[0]] = tmp[1];
        }
        var language;
        if( (typeof obj[reg] == 'undefined') || (obj[reg] != 'en' && obj[reg] != 'zh-Hant') ){
            language = 'cn'
        }else{
            language = obj[reg]
        }
        
        return language;
    },

    en: {
        sale_analysis: 'Sales Statistics',
        search: 'Search',
        day: 'Day',
        week: 'Week',
        month: 'Month',
        customize: 'Customize',
        sales_volume: 'Sales Amount',
        sales_volume_short: 'Amt.',
        chain_store_sales: 'Target',
        target: 'Target',
        finish: 'Completion',
        finish_short: 'Ach.',
        district_rank: 'Office Ranking',
        district_rank_1: 'No.',
        district_rank_2: ' in Agency',
        complate_rate: 'Completion Rate',
        complate_rate_short: 'Ach%',
        cir_growth_rate: 'MoM',
        same_growth_rate: 'YoY',
        sale_order: 'Orders',
        sale_quantity: 'Sales Qty.',
        sale_order_short: 'Ords.',
        sale_quantity_short: 'Qty.',
        pattern_rate: 'IPC',
        new_vip: 'New Members',
        vip_sale: 'Member\'s Order',
        people: 'Person',
        sheet: 'Odrs.',
        piece: 'Pkgs.',
        price_k: 'VPC',
        price_j: 'ASP',
        staff_sale_analysis: 'Sales By Staff',
        sale_trend: 'Sales Trends',
        big_category_sale_rank: 'Category Sales Top 10',
        big_category: 'Main Category',
        average_sale_day: 'Avg.Sales Amt.',
        money_sale_day: 'Sales Amount',
        money_y: 'Amount',
        sales_quantity: 'Quantity',
        store_sale_target: 'Sales Target',
        today: 'Today',
        index_quantity: 'Target',
        base: '',
        week1:"Week",
        week2:'',
        now_month: 'This Month',
        more_detail: 'View More',
        day_target_search: 'Target By Day',
        week_target_search: 'Target By Week',
        month_target_search: 'Target By Month',
        sale_target_k_pic: 'Candlestick Charts of Sales Target',
        year: 'Year',
        staff_sale_target: 'Staff Sales Target',
        average_money_person: 'Value Per Cart',
        rank: 'Ranking',
        name: 'Name',
        contribute_rate: 'Contribution',
        more_staff_target: 'More Staff Target',
        operational_indicator: 'Business Index',
        sale_money_y: 'Sales',
        month_target_progress: 'Monthly Index',
        month_complete_progress: 'Monthly Completion',
        average_complete_progress: 'Ava. Completion',
        month_contribute_progress: 'Monthly Contribute',
        total: 'Total',
        direct_invist: 'Visit Directly',
        email_sale: 'Email Marketing',
        lm_adv: 'Adv. League',
        vedio_adv: 'Video Adv.',
        search_engine: 'Search Engine',
        monday: 'Mon',
        tuesday: 'Tue',
        wed: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        sunday: 'Sun',



        store_sale_rank: 'Ranking List',
        store_code: 'Store Code',
        this_stage_sale: 'Current Sales',
        cir_sale: 'MoM Sales',
        same_sale: 'YoY Sales',
        choose_store_to_pk: 'Select A Store For Comparison',
        cancel: 'Cancel',
        pk: 'PK',
        other_pk: 'Store  Comparision',
        store_a: 'Store A',
        store_b: 'Store B',
        sale_money_j: 'Sales Amount',
        cir_compare: 'MoM',
        same_compare: 'YoY',
        cash_analysis: 'Basket Analysis',
        activity_analysis: 'Activity Analysis',
        this_week: 'This Week',
        to: 'To',
        last_stage: 'Previous',
        product_sale_rank: 'Top Products By Units Sold',
        positive_product: 'Full-price',
        activity_product: 'Promotion',
        big_category_rank: 'Category TOP5',
        single_rank: 'Product TOP5',
        day_piece_quantity: 'Daily Receipt Qty.',
        yuan: '',
        occupancy: 'Ratio',
        employed: 'Occur',



        tmp_no_data: 'Empty',
        kucun_big_category_spread: 'Inventory Distribution',
        season_spread: 'Season Distribution',
        sale_top10_product_and_product_analysis: 'Sales Top10 and Inventory Analysis',
        store_day_sale_and_day_kucun_analysis: 'Daily Sales and Inventory Analysis',
        kucun_quantity: 'Inv.Qty.',
        kucun_quantity_j: 'Inv. Qty.（Pkgs.)',
        sale_quantity_j: 'Sales Qty. (Pkgs.)',
        store_sale_quantity: 'Sales Volume',
        store_kucun: 'Inv.Qty.',
        average_sale_quantity_money: 'Ava. Sales Volume',
        average_kucun_quantity: 'Ava. Stock (Piece)',

        current_shop: 'Store A',
        than_shop: 'Store B',
        _rank:'Rank',
        champion: 'Superior',
        exchange: 'Switch',
        brand: 'Brand',
        cycle: 'Date',
        confirm: 'Confirm',
        please_select_brand:'Please Select The Statistical Brand',
        male: 'Male',
        female: 'Female',
        male_M: 'M',
        female_F: 'F'
    },

    cn: {
        sale_analysis: '销售统计',
        search: '查询',
        day: '日',
        week: '周',
        month: '月',
        customize: '自定义',
        sales_volume: '销售额',
        sales_volume_short: '销售额',
        chain_store_sales: '指标额',
        target: '指标',
        finish: '完成',
        finish_short: '完成',
        district_rank: '办事处排名',
        district_rank_1: '办事处第 ',
        district_rank_2: '名',
        complate_rate: '完成率',
        complate_rate_short: '完成率',
        cir_growth_rate: '环比增长',
        same_growth_rate: '同比增长',
        sale_order: '销售订单',
        sale_quantity: '销售数量',
        sale_order_short: '销售订单',
        sale_quantity_short: '销售数量',
        pattern_rate: '搭配率',
        new_vip: '新增会员',
        vip_sale: '会员销售',
        people: '人',
        sheet: '笔',
        piece: '件',
        price_k: '客单价',
        price_j: '件单价',
        staff_sale_analysis: '员工销售统计',
        sale_trend: '销售走势',
        big_category_sale_rank: '大类销售排行TOP10',
        big_category: '大类销售排行',
        average_sale_day: '日平均销售',
        money_sale_day: '日销售金额',
        money_y: '金额 (元) ',
        sales_quantity: '销售量(件)',
        

        store_sale_target: '门店销售指标',
        today: '今日',
        index_quantity: '指标量',
        base: '第',
        week1: '',
        week2:"周",
        now_month: '本月',
        more_detail: '查看更多详情',
        day_target_search: '日指标查询',
        week_target_search: '周指标查询',
        month_target_search: '月指标查询',
        sale_target_k_pic: '销售指标K线图',
        year: '年',
        staff_sale_target: '店员销售指标',
        average_money_person: '人均销售额',
        rank: '排名',
        name: '姓名',
        contribute_rate: '贡献率',
        more_staff_target: '查看更多店员指标',
        operational_indicator: '业务指标',
        sale_money_y: '销售额 (元)',
        month_target_progress: '月指标量',
        month_complete_progress: '月完成量',
        average_complete_progress: '人均完成量',
        month_contribute_progress: '月贡献',
        total: '总量',
        direct_invist: '直接访问',
        email_sale: '邮件营销',
        lm_adv: '联盟广告',
        vedio_adv: '视频广告',
        search_engine: '搜索引擎',
        monday: '周一',
        tuesday: '周二',
        wed: '周三',
        thursday: '周四',
        friday: '周五',
        saturday: '周六',
        sunday: '周日',



        store_sale_rank: '店铺销售排行',
        store_code: '店铺编码',
        this_stage_sale: '本期销量',
        cir_sale: '环比销量',
        same_sale: '同比销量',
        choose_store_to_pk: '选择门店 PK 一下',
        cancel: '取消',
        pk: 'PK一下',
        other_pk: '跨店对比',
        store_a: '店仓A',
        store_b: '店仓B',
        sale_money_j: '销售金额',
        cir_compare: '环比',
        same_compare: '同比',
        cash_analysis: '购物篮分析',
        activity_analysis: '活动分析',
        this_week: '本周',
        to: '至',
        last_stage: '上期',
        product_sale_rank: '商品销售排行',
        positive_product: '正价商品',
        activity_product: '活动商品',
        big_category_rank: '大类排行 TOP5',
        single_rank: '单品排行 TOP5',
        day_piece_quantity: '日小票数量',
        yuan: '元',
        occupancy: '占有率',
        employed: '占位',


        tmp_no_data: '暂无数据',
        kucun_big_category_spread: '库存大类分布',
        season_spread: '季节分布',
        sale_top10_product_and_product_analysis: '销售Top10商品与商品库存分析',
        store_day_sale_and_day_kucun_analysis: '本店日销量与日库存分析',
        kucun_quantity: '库存数量',
        kucun_quantity_j: '库存数量（件）',
        sale_quantity_j: '销售数量（件）',
        store_sale_quantity: '门店销量',
        store_kucun: '门店库存',
        average_sale_quantity_money: '平均销量（元）',
        average_kucun_quantity: '平均库存数（件）',

        current_shop: '本店',
        than_shop: '对比店',
        _rank:'排名',
        champion: '优胜',
        exchange: '切换',
        brand: '品牌',
        cycle: '周期',
        confirm: '确定',
        please_select_brand:'请选择统计的品牌',
        male: '男装',
        female: '女装',

        male_M: '男装',
        female_F: '女裝'
    },
    'zh-Hant': {
        sale_analysis: '銷售統計',
        search: '查詢',
        day: '日',
        week: '周',
        month: '月',
        customize: '自定義',
        sales_volume: '銷售額',
        sales_volume_short: '銷售額',
        chain_store_sales: '指標額',
        target: '指標',
        finish: '完成',
        finish_short: '完成',
        district_rank: '辦事處排名',
        district_rank_1: '辦事處第 ',
        district_rank_2: '名',
        complate_rate: '完成率',
        complate_rate_short: '完成率',
        cir_growth_rate: '環比增長',
        same_growth_rate: '同比增長',
        sale_order: '銷售訂單',
        sale_quantity: '銷售數量',
        sale_order_short: '銷售訂單',
        sale_quantity_short: '銷售數量',
        pattern_rate: '搭配率',
        new_vip: '新增會員',
        vip_sale: '會員銷售',
        people: '人',
        sheet: '筆',
        piece: '件',
        price_k: '客單價',
        price_j: '件單價',
        staff_sale_analysis: '員工銷售統計',
        sale_trend: '銷售走勢',
        big_category_sale_rank: '大類銷售排行TOP10',
        big_category: '大類銷售排行',
        average_sale_day: '日平均銷售',
        money_sale_day: '日銷售金額',
        money_y: '金額',
        sales_quantity: '銷售量(件)',
        

        store_sale_target: '門店銷售指標',
        today: '今日',
        index_quantity: '指標量',
        base: '第',
        week1: '',
        week2:"周",
        now_month: '本月',
        more_detail: '查看更多詳情',
        day_target_search: '日指標查詢',
        week_target_search: '周指標查詢',
        month_target_search: '月指標查詢',
        sale_target_k_pic: '銷售指標K線圖',
        year: '年',
        staff_sale_target: '店員銷售指標',
        average_money_person: '人均銷售額',
        rank: '排名',
        name: '姓名',
        contribute_rate: '貢獻率',
        more_staff_target: '查看更多店員指標',
        operational_indicator: '業務指標',
        sale_money_y: '銷售額',
        month_target_progress: '月指標量',
        month_complete_progress: '月完成量',
        average_complete_progress: '人均完成量',
        month_contribute_progress: '月貢獻',
        total: '總量',
        direct_invist: '直接訪問',
        email_sale: '郵件營銷',
        lm_adv: '聯盟廣告',
        vedio_adv: '視頻廣告',
        search_engine: '搜索引擎',
        monday: '周壹',
        tuesday: '周二',
        wed: '周三',
        thursday: '周四',
        friday: '周五',
        saturday: '周六',
        sunday: '周日',



        store_sale_rank: '店鋪銷售排行',
        store_code: '店鋪編碼',
        this_stage_sale: '本期銷量',
        cir_sale: '環比銷量',
        same_sale: '同比銷量',
        choose_store_to_pk: '選擇門店 PK 壹下',
        cancel: '取消',
        pk: 'PK壹下',
        other_pk: '跨店對比',
        store_a: '店倉A',
        store_b: '店倉B',
        sale_money_j: '銷售金額',
        cir_compare: '環比',
        same_compare: '同比',
        cash_analysis: '購物籃分析',
        activity_analysis: '活動分析',
        this_week: '本周',
        to: '至',
        last_stage: '上期',
        product_sale_rank: '商品銷售排行',
        positive_product: '正價商品',
        activity_product: '活動商品',
        big_category_rank: '大類排行 TOP5',
        single_rank: '單品排行 TOP5',
        day_piece_quantity: '日小票數量',
        yuan: '',
        occupancy: '占有率',
        employed: '占位',


        tmp_no_data: '暫無數據',
        kucun_big_category_spread: '庫存大類分布',
        season_spread: '季節分布',
        sale_top10_product_and_product_analysis: '銷售Top10商品與商品庫存分析',
        store_day_sale_and_day_kucun_analysis: '本店日銷量與日庫存分析',
        kucun_quantity: '庫存數量',
        kucun_quantity_j: '庫存數量（件）',
        sale_quantity_j: '銷售數量（件）',
        store_sale_quantity: '門店銷量',
        store_kucun: '門店庫存',
        average_sale_quantity_money: '平均銷量',
        average_kucun_quantity: '平均庫存數（件）',

        current_shop: '本店',
        than_shop: '對比店',
        _rank:'排名',
        champion: '優勝',
        exchange: '切換',
        brand: '品牌',
        cycle: '周期',
        confirm: '確定',
        please_select_brand:'請選擇統計的品牌',
        male: '男裝',
        female: '女裝',

        male_M: '男裝',
        female_F: '女裝'
    }
}