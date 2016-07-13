var check = (function() {

	
	var MANDATORY_TAG_NUM = 1;
	var response_data = {
		status: 0,
		errors: {}
	};

	var htmlMip = document.getElementsByTagName('html')[0].outerHTML.substring(0,10).indexOf('mip');
	var doctype = document.doctype;
	var headTag = document.getElementsByTagName('head');
	var bodyTag = document.getElementsByTagName('body');
	var scriptTag = document.getElementsByTagName('script');
	var linkTag = document.getElementsByTagName('link');
	var metaTag = document.getElementsByTagName('meta');
	var styleMipCustom = document.getElementsByTagName('style mip-custom');
	var viewport = document.getElementsByTagName('meta').viewport;

	var tagMipImg = document.getElementsByTagName('mip-img');
	var tagMipPix = document.getElementsByTagName('mip-pix');
	var tagMipAd = document.getElementsByTagName('mip-ad');
	var tagMipBaiduTj = document.getElementsByTagName('mip-baidu-stats');

	// status号待定


	function getErrorInfo(_status, tag) {
		switch(_status) {
			case '06200101': 
				return "The mandatory tag <" + tag + "> is missing or incorrect";
				break;
			case '06200201':
				return "The tag " + tag + " is disallowed.";
				break;
			case '06200701':
				return "The tag " + tag + " appears more than once in the document.";
				break;
			case '06200801':
				return "The page " + tag + " is used to forbid mip cache"
		}
		
	}
	
	function getMoreParamsErrorInfo(_status, attr, tag, value) {
		switch(_status) {
			case '06200301': 
				return "The attribute " + attr + " in tag " + tag + " is set to the invalid value " + value + ".";
				break;
			case '06200601': 
				return "The parent tag of tag "+attr+" is "+tag+", but it can only be "+value+".";
				break;
			
		}
	}

	function getErrorInfowithTwoParams(_status, tag, attr) {
		switch(_status) {
			case '06200501': 
				return "The tag " + tag + " is missing a mandatory attribute - pick one of " + attr + "."
				break;
			
		}
	}


	function hasDoctype() {
		return doctype ? true : false;
	}

	function hasMandatoryTag(tag) {
		return tag && tag.length ? true : false;
	}

	function errorScript() {
		var miphtml_main;
		var v0;
		var error_info = [];

		for(var index = 0; index < scriptTag.length; index ++) {
			var src = scriptTag[index].src;
			miphtml_main = src.indexOf('//m.baidu.com/static/ala/sf/static/js/miphtml_main_');
			// v0 = (src === 'https://m.baidu.com/miphtml/v0.js');
		}

		if(miphtml_main < -1) { 
			error_info.push('The js file "https://m.baidu.com/static/ala/sf/static/js/miphtml_main_xxxxxx.js" is missing or incorrect');
		}

		// if(!v0) {
		// 	error_info.push('The js file "https://m.baidu.com/miphtml/v0.js" is missing or incorrect');	
		// }

		return error_info || null;
	}

	function errorLink() {
		var miphtml_main;
		var error_info = [];

		for(var index = 0; index < linkTag.length; index ++) {
			var href = linkTag[index].href;
			miphtml_main = href.indexOf('//m.baidu.com/static/ala/sf/static/js/miphtml_main_');
		}

		if(miphtml_main > -1) {
			error_info.push('The js file "//m.baidu.com/static/ala/sf/static/js/miphtml_main_.css" is missing or incorrect');
		}

		return error_info || null;
	}

	/**
	 * [mandatory_tag_missing 缺少强制性标签]
	 * 
	 * @return {[type]} [description]
	 */
	function mandatory_tag_missing() {
		var tags = [headTag, bodyTag, scriptTag, linkTag];
		var tagNames = [ 'head', 'body', 'script', 'link'];
		var _STATUS = '06200101';
		var error_info = [];

		var errorScriptInfo = errorScript();
		var errorLinkInfo = errorLink();

		var index = 0;
		var flag = false;

		if(htmlMip < 0) {
			error_info.push(getErrorInfo(_STATUS, 'html mip'));
		}

		if(!hasDoctype()) {
			error_info.push(getErrorInfo(_STATUS, '!doctype'));
		}

		for(index = 0; index < metaTag.length; index ++) {
			var contentstr = metaTag[index].content || '';
			var charsetstr = metaTag[index].getAttribute('charset') || '';
			if(contentstr.toLowerCase().indexOf('utf-8')) {
				flag = true;
			} else if(charsetstr.toLowerCase().indexOf('utf-8')){
				flag = true;
			}
			
		}

		if(!flag) {
			error_info.push(getErrorInfo(_STATUS , 'utf-8'));
		}

		for(index = 0; index < tags.length; index ++) {
			if(!hasMandatoryTag(tags[index])) {
				error_info.push(getErrorInfo(_STATUS ,tagNames[index]));
			}
		}

		if(errorScriptInfo) {
			for(index = 0; index < errorScriptInfo.length; index ++) {
				error_info.push(errorScriptInfo[index]);
			}
		}

		if(errorLinkInfo) {
			for(index = 0; index < errorLinkInfo.length; index ++) {
				error_info.push(errorLinkInfo[index]);
			}
		}

		if(error_info.length) {
			response_data.status = _STATUS;
			response_data.errors.mandatory_tag_missing = {};
			response_data.errors.mandatory_tag_missing.tips = "MANDATORY_TAG_MISSING";
			response_data.errors.mandatory_tag_missing.error_info = error_info;
		}
	}

	/********************************************************************/


	/**
	 * [disallowed_tag 禁用标签]
	 * 
	 * @return 
	 */
	function disallowed_tag() {
		var _STATUS = '06200201'
		var _TIPS = 'DISALLOWED_TAG';
		var error_info = [];
		var index = 0;

		/* 禁用标签 */ 
		var disallowTagNames = [
		    'frame', 
		    'frameset', 
		    'object',
		    'param',
		    'applet',
		    'embed',
		    'form',
		    'input',
		    'textarea',
		    'select',
		    'option'
		];

		var parentErrorTagNames = [
			'img',
			'video',
			'audio'
			// 'iframe'
		];

		for(index = 0; index < disallowTagNames.length; index ++) {
			var tag = document.getElementsByTagName(disallowTagNames[index]);
			if(tag.length) {
				error_info.push(getErrorInfo(_STATUS, disallowTagNames[index]));
			}
		}
		
		for(index = 0; index < parentErrorTagNames.length; index ++) {
			var tagName = parentErrorTagNames[index];
			var tag = document.getElementsByTagName(tagName);
			if(tag.length) {
				var parent = tag[0].parentNode.tagName.toLowerCase();
				if(!((parent.indexOf('mip') > -1) || parent.indexOf('noscript') > -1)) {
					error_info.push(getErrorInfo(_STATUS, parentErrorTagNames[index]));
				}
			}
		}

		if(error_info.length) {
			response_data.status = _STATUS;
			response_data.errors.disallowed_tag = {};
			response_data.errors.disallowed_tag.tips = _TIPS;
			response_data.errors.disallowed_tag.error_info = error_info;
		}
	}
	/********************************************************************/

	
	/**
	 * [invalid_attr_value 无效属性值]
	 * 
	 * @return 
	 */
	function invalid_attr_value() {
		var _STATUS = '06200301';
		var _TIPS = 'INVALID_ATTR_VALUE';
		var error_info = [];

		var index = 0;
		var ordinal = 0;

		var tagA = document.getElementsByTagName('a');

		for(index = 0; index < tagA.length; index ++) {
			var href = tagA[index].getAttribute('href');
			var target = tagA[index].getAttribute('target');
			if(href.indexOf('javascript') > -1) {
				error_info.push(getMoreParamsErrorInfo(_STATUS, 'href', 'a', href));
			}

			if(target != '_blank') {
				error_info.push(getMoreParamsErrorInfo(_STATUS, 'target', 'a', href));
			}
		}
		
		
		for(index = 0; index < tagMipImg.length; index ++) {
			var dataCarousel = tagMipImg[index].getAttribute('data-carousel');
			if(dataCarousel && dataCarousel != 'carousel') {
				error_info.push(getMoreParamsErrorInfo(_STATUS, 'data-carousel', 'mip-img', dataCarousel));
			}
		}


		for(index = 0; index < tagMipAd.length; index ++) {
			var tplName = tagMipAd[index].getAttribute('tpl');
			var dataSize = tagMipAd[index].getAttribute('data-size');

			if(tplName && !(tplName == 'oneImg' || tplName == 'noneImg' || tplName == 'moreImg' || tplName == 'onlyImg')) {
				error_info.push(getMoreParamsErrorInfo(_STATUS, 'tpl', 'mip-ad', tplName));
			}

			var reg = /^[1-9][\d]*[\s][1-9][\d]*$/;
			if(dataSize && !reg.test(dataSize)) {
				error_info.push(getMoreParamsErrorInfo(_STATUS, 'data-size', 'mip-ad', dataSize));
			}
		}


		if(error_info.length) {
			response_data.status = _STATUS;
			response_data.errors.invalid_attr_value = {};
			response_data.errors.invalid_attr_value.tips = _TIPS;
			response_data.errors.invalid_attr_value.error_info = error_info;
		}
	}
	/********************************************************************/

	

	function getErrorInfohasFourParam(prop, attr, tag, value) {
		return [
			"The property " + prop,
			"in attribute " + attr,
			"in tag " + tag,
			"is set to " + value ,
			", which is invalid."
		].join(',');
	}

	function invalid_property_value_in_attr_value() {
		var _STATUS = '06200401';
		var _TIPS ='INVALID_PROPERTY_VALUE_IN_ATTR_VALUE';
		var error_info = [];
		var index = 0;

		
		var content = viewport ? viewport.content.split(',') : [];
		var check = new Array();
		
		for(index = 0; index < content.length; index ++) {
			var tmp = content[index].split('=');
			check[tmp[0]] = tmp[1];
		}

		if(check['width'] && check['width'] != 'device-width') {
			error_info.push(getErrorInfohasFourParam('width', 'content', 'meta', check['width']));
		}
		if(check['minimum-scale'] && check['minimum-scale'] != 1) {
			error_info.push(getErrorInfohasFourParam('minimum-scale', 'content', 'meta', check['minimum-scale']));
		}
		if(check['initial-scale'] && check['initial-scale'] != 1) {
			error_info.push(getErrorInfohasFourParam('initial-scale', 'content', 'meta', check['initial-scale']));
		}

		if(error_info.length) {
			response_data.status = _STATUS;
			response_data.errors.invalid_property_value_in_attr_value = {};
			response_data.errors.invalid_property_value_in_attr_value.tips = _TIPS;
			response_data.errors.invalid_property_value_in_attr_value.error_info = error_info;
		}
	}
	/********************************************************************/


	function mandatory_oneof_attr_missing() {
		var _STATUS = '06200501';
		var _TIPS ='INVALID_PROPERTY_VALUE_IN_ATTR_VALUE';
		var error_info = [];
		var index = 0;

		for(index = 0; index < tagMipImg.length; index ++) {
			if(!tagMipImg[index].getAttribute('src')) {
				error_info.push(getErrorInfowithTwoParams('mip-img', 'src'));
			}
		}

		for(index = 0; index < tagMipPix.length; index ++) {
			if(!tagMipPix[index][0].getAttribute('src')) {
				error_info.push(getErrorInfowithTwoParams('mip-pix', 'src'));
			}
		}
		
		for(index = 0; index < tagMipBaiduTj.length; index ++) {
			if(!tagMipBaiduTj[index][0].getAttribute('src')) {
				error_info.push(getErrorInfowithTwoParams('mip-baidu-tj', 'src'));
			}
		}

		for(index = 0; index < tagMipAd.length; index ++) {
			if(!tagMipAd[index].getAttribute('src')) {
				error_info.push(getErrorInfowithTwoParams('mip-ad', 'src'));
			}
			if(!tagMipAd[index].getAttribute('tpl')) {
				error_info.push(getErrorInfowithTwoParams('mip-ad', 'tpl'));
			}
			// if(!tagMipAd[index].getAttribute('data-size')) {
			// 	error_info.push(getErrorInfowithTwoParams('mip-ad', 'data-size'));
			// }
			if(!tagMipAd[index].getAttribute('data-img')) {
				error_info.push(getErrorInfowithTwoParams('mip-ad', 'data-img'));
			}
		}

		if(error_info.length) {
			response_data.status = _STATUS;
			response_data.errors.mandatory_oneof_attr_missing = {};
			response_data.errors.mandatory_oneof_attr_missing.tips = _TIPS;
			response_data.errors.mandatory_oneof_attr_missing.error_info = error_info;
		}
	}

	function wrong_parent_tag() {

		var _STATUS = '06200601';
		var _TIPS ='WRONG_PARENT_TAG';
		var error_info = [];
		var index = 0;

		var doctypeParent = doctype ? doctype.parentNode.tagName : null;
		var headParent = headTag[0] ? headTag[0].parentNode.tagName : null;
		var bodyParent = bodyTag[0] ? bodyTag[0].parentNode.tagName : null;
		var linkParent = linkTag.length && linkTag[0] ? linkTag[0].parentNode.tagName : null;
		var scriptParent = scriptTag[0] ? scriptTag[0].parentNode.tagName : null;
		var metaParent = metaTag[0] ? metaTag[0].parentNode.tagName : null;
		var styleMipParent = styleMipCustom[0] ? styleMipCustom[0].parentNode.tagName : null;

		if(doctypeParent) {
			error_info.push(getMoreParamsErrorInfo(_STATUS, '!doctype', headParent, 'root'));
		}
		if(headParent.indexOf('HTML') <= -1) {
			error_info.push(getMoreParamsErrorInfo(_STATUS, 'head', headParent, 'html'));
		}
		if(bodyParent.indexOf('HTML') <= -1) {
			error_info.push(getMoreParamsErrorInfo(_STATUS, 'body', bodyParent, 'html'));
		}
		if(linkParent && linkParent.indexOf('HEAD') <= -1) {
			error_info.push(getMoreParamsErrorInfo(_STATUS, 'link', linkParent, 'head'));
		}
		if(scriptParent.indexOf('BODY') <= -1) {
			error_info.push(getMoreParamsErrorInfo(_STATUS, 'script', scriptParent, 'body'));
		}
		if(metaParent.indexOf('HEAD') <= -1) {
			error_info.push(getMoreParamsErrorInfo(_STATUS, 'meta', metaParent, 'head'));
		}
		if(styleMipParent && styleMipParent.indexOf('HEAD') <= -1) {
			error_info.push(getMoreParamsErrorInfo(_STATUS, 'style mip-custom', styleMipParent, 'head'));
		}

		if(error_info.length) {
			response_data.status = _STATUS;
			response_data.errors.wrong_parent_tag = {};
			response_data.errors.wrong_parent_tag.tips = _TIPS;
			response_data.errors.wrong_parent_tag.error_info = error_info;
		}
	}


	function duplicate_unique_tag() {

		var _STATUS = '06200701';
		var _TIPS ='DUPLICATE_UNIQUE_TAG';
		var error_info = [];
		var index = 0;
		var cnt = 0;

		var tags = [doctype, htmlMip, headTag, bodyTag, viewport, styleMipCustom];
		var tagNames = ['!docutype', 'html mip', 'head', 'body', '<meta viewport>', '<style mip-custom>'];

		for(index = 0; index < tags.length; index ++) {
			if(tags[index] && tags[index].length > 1) {
				error_info.push(getErrorInfo(_STATUS, tagNames[index]));
			}
		}

		for(index = 0; index < metaTag.length; index ++) {
			var contentstr = metaTag[index].content || '';
			var charsetstr = metaTag[index].getAttribute('charset') || '';
			if(contentstr.toLowerCase().indexOf('utf-8')) {
				cnt ++;
			} else if(charsetstr.toLowerCase().indexOf('utf-8')){
				cnt ++;
			}
		}

		if(cnt > 1) {
			error_info.push(getErrorInfo(_STATUS, '<meta charset="utf-8">'));
		}

		cnt = 0;
		var viewportname = document.getElementsByTagName('meta');
		for(index = 0; index < viewportname.length; index ++) {
			var name = viewportname.name || '';
			if(name.toLowerCase().indexOf('viewport')) {
				cnt ++;
			} 
		}
		if(cnt > 1) {
			error_info.push(getErrorInfo(_STATUS, '<meta name="viewport">'));
		}

		cnt = 0;
		var stan = document.getElementsByTagName('link');
		for(index = 0; index < stan.length; index ++) {
			var rel = stan.rel || '';
			if(rel.toLowerCase().indexOf('standardhtml')) {
				cnt ++;
			} 
		}
		if(cnt > 1) {
			error_info.push(getErrorInfo(_STATUS, '<link rel="miphtml" >'));
		}

		if(error_info.length) {
			response_data.status = _STATUS;
			response_data.errors.duplicate_unique_tag = {};
			response_data.errors.duplicate_unique_tag.tips = _TIPS;
			response_data.errors.duplicate_unique_tag.error_info = error_info;
		}
	}

	function cache_forbiden() {

		var _STATUS = '06200801';
		var _TIPS ='CACHE_FORBIDEN';
		var error_info = [];
		var index = 0;
		var selector = 'meta[property="mip:use_cache"]';
		var cache_meta = document.querySelector(selector);

		if(cache_meta && cache_meta.getAttribute('content') === 'no') {
			error_info.push(getErrorInfo(_STATUS, selector));
		}

		if(error_info.length) {
			response_data.status = _STATUS;
			response_data.errors.cache_forbiden.error_info = error_info;
		}
	}

	function init() {
		mandatory_tag_missing();
		disallowed_tag();
		invalid_attr_value();
		invalid_property_value_in_attr_value();
		mandatory_oneof_attr_missing();
		wrong_parent_tag();
		duplicate_unique_tag();
		cache_forbiden();
		console.error(response_data);	
	}
	init()
})();  

