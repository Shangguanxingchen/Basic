var API_URL_PREFIX = 'http://192.168.11.122:1080/api/';
var T = '12345678'

var API_URL = [];
API_URL['PRODUCT_LIST'] = 'nt.eshop.web.product/query_special_product.api';
API_URL['ADD_TO_CART'] = 'nt.eshop.web.cart/add_to_cart.api';
API_URL['FAST_ORDER'] = 'nt.eshop.web.cart/fast_order_to_product.api';
API_URL['CART_TO_ORDER'] = 'nt.eshop.web.cart/set_selected_cart_line.api';
API_URL['CONFIRM_ORDER'] = 'nt.eshop.web.cart/confirm_order.api';
