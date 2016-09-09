var config = {
    docPath:'./docs',
    nameMap:{
      '1-overview':'项目介绍',
      '2-guide':'开发指南',
      '3-tech':'技术规范',
      '4-widget':'组件说明',
      '5-support':'技术支持',
      '6-changelog':'上线日志',
      '2-inner-widget': '内置组件',
      '3-extend-widget': '扩展通用组件',
      '4-customize-widget': '个性化组件',
      '5-ad-widget': '广告组件',
      '5_demos': '示例',
      'ads': '广告类型',
      '999-help': '开发api'
    }
};
var fs = require('fs'),
  fileList = [];
 //文档目录遍历函数
function walkDoc(path){
  if(fs.statSync(path).isDirectory == false){
       return false; 
    }
  var pathArray = path.split("/");
  var pathName = pathArray[pathArray.length -1];
  var dirList = fs.readdirSync(path);
  var fileList = [];
  dirList.sort();
  dirList.forEach(function(item){
    if(fs.statSync(path + '/' + item).isDirectory()){
      var list = walkDoc(path + '/' + item);
      fileList.push({
            'path':path+'/'+item,
            'name':item,
            'type':'dir',
            subFile:list
        });
    }else{
        if(item.indexOf('.md') != -1){
            var fileInfo = {};
            fileInfo.path = path + '/' + item;
            fileInfo.name = item.replace('.md','');
            fileInfo.title = item;
            fileInfo.type = 'md';
            var fileContent = fs.readFileSync(fileInfo.path,'utf8');
            var mdTitleReg = /# +([^\n]+)/;
            var contentList = mdTitleReg.exec(fileContent);
            if(mdTitleReg){
                fileInfo.title = contentList[1];
            }
            //fileInfo.content = fileContent;
            fileList.push(fileInfo);
        } 
    }
  });
  return fileList;
}

/*
 * 左侧菜单栏渲染
 * 输入：文档目录结构
 * 输出：菜单栏的
 */
function renderSideMenu(fileList,level){
  //console.log(level)
    var preStr = '';
    if(level == 0){
      preStr = '<ul class="nav" id="side-menu">';
    } else {
      preStr = '<ul class="nav nav-' + (level + 1) + '-level" data-level = "'+(level + 1)+'">';
    }
    var contStr = '';
    var menuStr = '';
    for(var i = 0, l = fileList.length; i < l; i++){
        var nexLevel = level + 1;
        var item = fileList[i];
        if(item.type == 'md'){
            var tmp = '<li><a href= "#'+item.path+'">'
                +item.title+'</a></li>'; 
            contStr = contStr + tmp;
        }else if(item.type == 'dir'){
            var tmp = renderSideMenu(item.subFile, nexLevel);
            if(tmp.length > 0){
              var name = config.nameMap[item.name]||item.name;
              contStr = contStr + '<li><a href="#">' + name + ' <span class="fa arrow"></span></a>' + tmp + '</li>'
            }
            
        }
    }
   if(contStr.length > 0){
        menuStr = preStr + contStr + '</ul>';
    }
    return menuStr;
} 

fileList = walkDoc(config.docPath);
var renderStr  = renderSideMenu(fileList,0);
fs.writeFileSync(config.docPath + '/sidebar', renderStr);



