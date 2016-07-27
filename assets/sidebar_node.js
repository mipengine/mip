var config = {
    docPath:'./docs',
    nameMap:{
      '1_getstarted':'简介',
      '2_guides':'教程',
      '3_reference':'参考规范',
      '3_API':'接口文档',
      '4_support':'技术支持',
      '1_join_guied':'接入指南',
      '2_dev_guied':'开发指南',
      '3_frame_guied':'框架基础',
      '6_online':'上线'
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
      preStr = '<ul class="nav nav-' + (level + 1) + '-level" >';
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



