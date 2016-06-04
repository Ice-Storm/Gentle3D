var React = require('react');
var Ajax  = require('@fdaciuk/ajax');

module.exports = React.createClass({
  propTypes: {
    source: React.PropTypes.string,
    changeParent: React.PropTypes.fun,
    uploadModalConfig: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      uploadModalConfig: this.props.uploadModalConfig,
      selectData: '',
      selected: '',
      isDisplay: 0,
      isRefresh: 0
    };
  },
  componentWillReceiveProps: function(){
    this.setState({ isDisplay: 1 });
  },
  componentWillMount: function(){
    this.fresh();
  },
  fresh: function(){
    var url = '/admin/selectConfig?entity=3d_show_content';
    Ajax().get(url).then(function(data){
      this.setState({ 
        selectData: data,
        selected: data[0].sort,
        isRefresh: 0
      })
    }.bind(this));

    Ajax().get(this.props.source).then(function(data){
      this.setState({ 
        uploadModalConfig: data,
        isRefresh: 0,
        isDisplay: 1
      })
    }.bind(this));
  },
  createTextarea: function(isHaveTextarea){
    if(isHaveTextarea){
      return <textarea 
        className = 'upload-textarea'
        ref = { 'upload-textarea' }
        id = 'upload-textarea'></textarea>
    }
  },
  setSelect: function(event){
    this.setState({ selected: event.target.value });
  },
  createSelect: function(isHaveSelect){
    var optionArr = [];

    if(!isHaveSelect){ return; }
    
    for(var i = 0; i < this.state.selectData.length; i++){
      optionArr.push(
        <option value = {this.state.selectData[i].sort}>{this.state.selectData[i].sort}</option>
      )
    }
    return (
      <div className = 'upload-selectPos'>
        <span className = 'upload-selectFont'>选择分类</span>
        <select id = 'upload-select' className = 'upload-select' onChange = { this.setSelect }>
          {optionArr}
        </select>
      </div>
    );
  },
  handeClickUpload: function(){
    this.refs['uploadModal-uploadBtn'].getDOMNode().click();
  },
  handeChlickSubmit: function(event){
    event.preventDefault();
    
    var ajaxUrl = this.state.uploadModalConfig.url;
    var FormObj = new FormData();
    var selfParm = this.state.uploadModalConfig;
    var textValue = this.refs['upload-textarea'] ? this.refs['upload-textarea'].getDOMNode().value : '';
    var isNew = selfParm.isNew ? selfParm.isNew : 'null';
    var selectSort = this.state.selected;
    var flag = selfParm.flag ? selfParm.flag : 'null';
    var id = selfParm.id ? selfParm.id : 'null';
    var content = textValue ? textValue : 'null';
    var entity = selfParm.entity ? selfParm.entity : 'null';
    var special = selfParm.special ? selfParm.special: 'null';

    var url = '/admin/' + selfParm.url + '?id=' + id + '&entity=' + entity + '&isNew=' + isNew + '&content=' + content + '&value=' + selectSort + '&flag=' + flag + '&special=' + special;

    FormObj.append('userImg', this.refs['uploadModal-uploadBtn'].getDOMNode().files[0]);

    var oReq = new XMLHttpRequest();  
    oReq.open("POST", url, true);  
    oReq.onload = function(oEvent){  
      if(oReq.status == 200){  
         this.handeChickCancle();
      } else {  
         alert('上传失败');
         this.handeChickCancle();  
      }  
    }.bind(this);  
    oReq.send(FormObj); 
  },
  handeChickCancle: function() {
    this.setState({ isDisplay: 0 });
    if(this.props.changeParent){
      this.props.changeParent();  
    }
  },
  render: function() {
    return (
      <div>
        { this.state.isDisplay == 1 ?
          <div>
            <div className = 'uploadModal'></div> 
              <div className = 'uploadModal-position' name = 'upload' id = 'upload'>
                <div>
                  <span className = 'uploadModal-title'>
                    { this.state.uploadModalConfig.title }
                    <i className = 'fa fa-times' onClick = { this.handeChickCancle }></i>
                  </span>
                  { this.createSelect(this.state.uploadModalConfig.isHaveSelect) } 
                </div>
                { this.createTextarea( this.state.uploadModalConfig.isHaveTextarea ) }
                <div className = 'uploadModal-button'>
                  <span onClick = { this.handeClickUpload }>选择上传图片</span>
                  <form name = 'form1'
                    id = 'frmUploadFile' 
                    method = 'POST'
                    action = { this.state.uploadModalConfig.url }
                    enctype = 'multipart/form-data'>
                    <input type = 'file' style = {{display: 'none'}}
                      id = 'uploadModal-uploadBtn'
                      ref = { 'uploadModal-uploadBtn' }
                      name = { this.state.uploadModalConfig.name }/>
                    <input type = 'button' value = '上传' className = 'uploadModal-sub' onClick = { this.handeChlickSubmit } />
                  </form>
                </div>
              </div>
            </div>
          : ''}
      </div>
    );
  }
})